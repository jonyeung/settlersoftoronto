/*jshint esversion: 6*/
const express = require('express');
const app = express();
const socket = require('socket.io');
const boardFunctions = require('./board.js');

const totalHexes = 19;
const totalWoodWheatSheepHexes = 4;
const totalOreBrickHexes = 3;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(function (req, res, next) {
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

let Datastore = require('nedb'),
    gameStatesDB = new Datastore({ filename: 'db/gameStates.db', autoload: true, timestampData: true });

let GameState = (function (state) {
        return {
            gameName: state.gameName,
            players: state.players,
            hexes: state.hexes,
            roads: [],
            settlements: [],
            cities: [],
            currentLargestArmy: 0,
            currentLongestRoad: 0,
            currentPlayerNum: 0,
            maxPlayerNum: state.maxPlayers,
            currentTurn: null,
            turnPhase: 'game not started',
            gameOver: false,
            winner: null
        }
})

let Player = (function (playerName) {
    return {
        username : playerName,
        resources : {
            Wood: 0,
            Sheep: 0,
            Ore: 0,
            Brick: 0,
            Wheat: 0
        },
        devCards : {
            Knight: 0,
            VictoryPointCard: 0,
            RoadBuilding: 0,
            Monopoly: 0,
            YearOfPlenty: 0
        },
        knightsPlayed : 0,
        VictoryPoints : 0,
        LongestRoadLength : 0,
        OwnsLargestArmy : false,
        OwnsLongestRoad : false,
        OwnsSheepPort : false,
        OwnsWoodPort : false,
        OwnsOrePort : false,
        OwnsBrickPort : false,
        OwnsWheatPort : false,
        Owns3For1Port : false,
    }
});

let Road = (function (road) {
    return {
        player : road.player,
        startPoint : road.start,
        endPoint : road.end,
    }
});

let Settlement = (function (settlement) {
    return {
        player : settlement.player,
        location : settlement.location,
    }
});

let City = (function (city) {
    return {
        player : city.player,
        location : city.location,
    }
});

// get gameState from DB
function findGameState(gameName) {
    gameStatesDB.findOne({ gameName: gameName }, function (err, state) {
        if (err) return err;
        return state;
    })
}

// store gameState into DB
function storeGameState(gameState) {
    let gameName = gameState.gameName;
    gameStatesDB.update({ 'gameName': gameName }, { $set: gameState }, function (err, gameState) {
        if (err) return err;
        return gameState;
    });
}

const http = require('http');
const PORT = 3000;

let server = app.listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});

let io = socket(server);

io.on('connection', function (socket) {
    console.log('socket connection successful');

    socket.on('PLAYER_CONNECT', (req) => {

        // create game room
        if (req.string == 'room_setup') {
            let gameName = req.gameName;

            // add the host
            let players = [];
            let host = new Player(req.username);
            players.push(host);

            // set up board
            let hexes = boardFunctions.setupHexes();

            let gameState = new GameState({ gameName: gameName, players: players, hexes: hexes, maxPlayers: players.length });
            console.log('gameState: ', gameState)
            gameStatesDB.insert(gameState, function (err, state) {
                if (err) io.sockets.emit('room_setup', err);
                io.sockets.emit('room_setup', state);
            });
        }

        // new player joins
        if (req.string == 'player_join') {
            let gameName = req.gameName;
            let newPlayer = new Player(req.username);
            gameStatesDB.findOneAndUpdate({ 'gameName': gameName }, [{ $push: { 'players': newPlayer } }, { $inc: { 'maxPlayerNum': 1 } }], function (err, state) {
                if (err) io.sockets.emit('player_join', err);
                io.sockets.emit('player_join', state);
            });
        }

        // game starts
        if (req.string == 'start_game') {
            let gameState = findGameState(req.gameName);
            gameState.currentTurn = players[gameState.currentPlayerNum];
            gameState.turnPhase = 'setup_placement';
            gameState = storeGameState(gameState);
            io.sockets.emit('start_game', gameState);
        }

        // begin main phase (after all setup done)
        if (req.string == 'begin_main_game') {
            let gameState = findGameState(req.gameName);
            gameState.currentPlayerNum = 0;
            gameState.currentTurn = players[gameState.currentPlayerNum];
            gameState.turnPhase = 'roll_phase';
            gameState = storeGameState(gameState);
            io.sockets.emit('begin_main_game', gameState);
        }

        // ends current player's turn and goes to the next player
        if (req.string == 'end_turn') {
            let gameState = findGameState(req.gameName);
            let currentPlayerNum = gameState.currentPlayerNum;
            if (currentPlayerNum == gameState.maxPlayerNum) {
                // go to player 1
                currentPlayerNum = 1;
            } else {
                currentPlayerNum++;
            }
            gameState.currentTurn = gameState.players[currentPlayerNum];
            gameState.turnPhase = 'roll_phase';
            gameState = storeGameState(gameState);
            io.sockets.emit('end_turn', gameState);
        }

        // Dice roll (7)
        if (req.string == 'seven_roll') {
            let gameState = findGameState(req.gameName);
            gameState.phase = 'move_robber';
            gameState = storeGameState(gameState);
            io.sockets.emit('seven_roll', gameState);
        }

        // move the robber to the new hex
        if (req.string == 'move_robber') {
            let gameState = findGameState(req.gameName);
            let newRobberHex = req.robberPosition;

            // remove robber from previous location
            let previousHex = gameState.hexes.find(hex => {
                return hex.robber == true;
            });
            previousHex.robber = false;
            // set the new robber hex
            let newHex = gameState.hexes.find(hex => {
                return hex.hexPosition == newRobberHex;
            })
            newHex.robber = true;
            gameState.turnPhase = 'build/trade/devcard_phase';
            gameState = storeGameState(gameState);
            io.sockets.emit('move_robber', gameState);
        }

        // Dice roll (2-6, 8-12): give out resources to players
        if (req.string == 'regular_roll') {
            let gameState = findGameState(req.gameName);
            let roll = req.roll;

            for (let hex in gameState.hexes) {
                if (hex.diceNumber == roll && hex.robber == false) {
                    // give resources to all the players that own a settlement on this hex
                    for (let settlement in hex.settlements) {
                        addResource(hex.resourceType, settlement.player);
                    }
                    // give resources to all the players that own a city on this hex
                    for (let city in hex.cities) {
                        addResource(hex.resourceType, city.player);
                    }
                }
            }
            gameState.turnPhase = 'build/trade/devcard_phase';
            gameState = storeGameState(gameState);
            io.sockets.emit('regular_roll', gameState);
        }

        // build road (setup): no resource costs, can be placed anywhere
        if (req.string == 'build_starting_road') {
            let gameState = findGameState(data.gameName);
            let currentPlayer = gameState.currentTurn;
            if (isValidRoad(data.start, data.end, gameState)) {
                let road = new Road({ player: currentPlayer, start: data.start, end: data.end });
                gameState.roads.push(road);
                gameState = storeGameState(gameState);
                io.sockets.emit('build_starting_road', gameState);
            } else {
                io.sockets.emit('build_starting_road', new Error('Invalid road position'));
            }
        }

        // build road
        if (req.string == 'build_road') {
            let gameState = findGameState(req.gameName);
            let currentPlayer = gameState.currentTurn;

            if (isValidRoad(req.start, req.end, gameState)) {
                if (currentPlayer.resources.Wood > 0 && currentPlayer.resource.Brick > 0) {
                    let road = new Road({ player: currentPlayer, start: req.start, end: req.end });
                    gameState.roads.push(road);
                    currentPlayer.resources.Wood--;
                    currentPlayer.resources.Brick--;
                    // TODO: check if this increments longest road
                    // currentPlayer.LongestRoadLength = currentPlayer.LongestRoadLength + 1;
                    // check if this exceeds longest road
                    if (hasLongestRoad(currentPlayer, gameState)) {
                        for (let player in gameState.players) {
                            if (player.OwnsLongestRoad == true) {
                                player.VictoryPoints = player.VictoryPoints - 2;
                            }
                            player.OwnsLongestRoad = false;
                        }
                        currentPlayer.OwnsLongestRoad = true;
                        currentPlayer.VictoryPoints = currentPlayer.VictoryPoints + 2;
                        gameState.currentLongestRoad = currentPlayer.LongestRoadLength;
                        checkWinCondition(currentPlayer, gameState);
                    }
                    gameState = storeGameState(gameState);
                    io.sockets.emit('build_road', gameState);
                } else {
                    io.sockets.emit('build_road', new Error('Insufficient resources'));
                }
            } else {
                io.sockets.emit('build_road', new Error('Invalid road position'));
            }
        }

        // build settlement (setup): no resource costs
        if (req.string == 'build_starting_settlement') {
            let gameState = findGameState(req.gameName);
            if (isValidSettlement(req.location, gameState.currentTurn, gameState)) {
                let currentPlayer = gameState.currentTurn;
                let settlement = new Settlement({ player: currentPlayer, location: req.location });
                gameState.settlements.push(settlement);
                addSettlementToHex(settlement, gameState);
                currentPlayer.VictoryPoint++;
                gameState = storeGameState(gameState);
                io.sockets.emit('build_starting_settlement', gameState);
            } else {
                io.sockets.emit('build_starting_settlement', new Error('Invalid settlement position'));
            }
        }

        // build settlement
        if (req.string == 'build_settlement') {
            let gameState = findGameState(req.gameName);
            if (isValidSettlement(req.location, gameState.currentTurn, gameState)) {
                let currentPlayer = gameState.currentTurn;
                if (currentPlayer.resources.Wood > 0 && currentPlayer.resource.Brick > 0 && currentPlayer.resources.Wheat > 0 && currentPlayer.resources.Sheep > 0) {
                    let settlement = new Settlement({ player: currentPlayer, location: req.location });
                    gameState.settlements.push(settlement);
                    addSettlementToHex(settlement, gameState);
                    currentPlayer.resources.Wood--;
                    currentPlayer.resources.Brick--;
                    currentPlayer.resources.Wheat--;
                    currentPlayer.resources.Sheep--;
                    currentPlayer.VictoryPoint++;
                    checkWinCondition(currentPlayer, gameState);
                    gameState = storeGameState(gameState);
                    io.sockets.emit('build_settlement', gameState);
                } else {
                    io.sockets.emit('build_settlement', new Error('Insufficient resources'));
                }
            } else {
                io.sockets.emit('build_settlement', new Error('Invalid settlement position'));
            }
        }


        if (req.string == 'build_city') {
            let gameState = findGameState(req.gameName);
            let currentPlayer = gameState.currentTurn;
            if (checkValidCity(req.location, gameState, currentPlayer)) {
                if (currentPlayer.resources.Ore > 2 && currentPlayer.resource.Wheat > 1) {
                    let city = new City({ player: currentPlayer, location: req.location });
                    addCityToHex(city, gameState);
                    currentPlayer.resources.Wheat = currentPlayer.resources.Wheat - 2;
                    currentPlayer.resources.Ore = currentPlayer.resources.Ore - 3;
                    currentPlayer.VictoryPoint++;
                    checkWinCondition(currentPlayer, gameState);
                    gameState = storeGameState(gameState);
                    io.sockets.emit('build_city', gameState);
                } else {
                    io.sockets.emit('build_city', new Error('Insufficient resources'));
                }
            } else {
                io.sockets.emit('build_city', new Error('Invalid city position'))
            }
        }

    })

    // trade resources between players

    // trade resources from bank

    // purchase dev card

    // play dev card

});