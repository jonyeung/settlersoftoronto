/*jshint esversion: 6*/
const express = require('express');
const firebase = require('firebase');
const app = express();
const socket = require('socket.io');
const boardFunctions = require('./board.js');
const serviceAccount = require('./c09-project-firebase-adminsdk-xuxa7-da3b397950.json');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

firebase.initializeApp({
    serviceAccount: "./c09-project-firebase-adminsdk-xuxa7-da3b397950.json",
    databaseURL: 'https://c09-project.firebaseio.com'
})
  

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

let playerId = 0;
let Player = (function (playerName) {
    return {
        _id: playerId++,
        username: playerName,
        resources: {
            Wood: 0,
            Sheep: 0,
            Ore: 0,
            Brick: 0,
            Wheat: 0
        },
        devCards: {
            Knight: 0,
            VictoryPointCard: 0,
            RoadBuilding: 0,
            Monopoly: 0,
            YearOfPlenty: 0
        },
        knightsPlayed: 0,
        VictoryPoints: 0,
        LongestRoadLength: 0,
        OwnsLargestArmy: false,
        OwnsLongestRoad: false,
        OwnsSheepPort: false,
        OwnsWoodPort: false,
        OwnsOrePort: false,
        OwnsBrickPort: false,
        OwnsWheatPort: false,
        Owns3For1Port: false,
    }
});

let Road = (function (road) {
    return {
        player: road.player,
        startPoint: road.start,
        endPoint: road.end,
    }
});

let Settlement = (function (settlement) {
    return {
        player: settlement.player,
        location: settlement.location,
    }
});

let City = (function (city) {
    return {
        player: city.player,
        location: city.location,
    }
});

function getPlayerByID(playerID, gameState) {
    return gameState.players[playerID]
}

// get gameState from DB
function findGameState(gameID) {
    
    return gameState;
}

// store gameState into DB
function storeGameState(gameID, gameState) {
    firebase.database().ref('/gameState/' + gameID).set(gameState);
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
            playerId = 0
            // add the host
            let players = [];
            let host = new Player(req.username);
            players.push(host);

            // set up board
            let hexes = boardFunctions.setupHexes();

            let gameState = new GameState({ gameName: gameName, players: players, hexes: hexes, maxPlayers: players.length });
            // firebase.database().ref('/gameState/gameState').set(gameState).then(function(err, state) {
            //     if (err) io.sockets.emit('PLAYER_CONNECT', err);
            //     io.sockets.emit('PLAYER_CONNECT', state);
            // });
        }

        // new player joins
        if (req.string == 'player_join') {
            let newPlayer = new Player(req.username);
            // let gameState = req.gameState;
            // let gameState = firebase.database().ref('/gameState/_id').once("123456").then(function(state) {
            //     console.log(state);
            // })
            gameState.players.push(newPlayer);
            gameState.maxPlayerNum++;
            io.sockets.emit('PLAYER_CONNECT', gameState);
            // gameStatesDB.update({'gameName': gameName }, [{ $push: { 'players': newPlayer } }, { $inc: { 'maxPlayerNum': 1 } }], function (err, state) {
            //     if (err) io.sockets.emit('PLAYER_CONNECT', err);
            //     console.log(state)
            //     io.sockets.emit('PLAYER_CONNECT', state);
            // });
        }

        // game starts
        if (req.string == 'start_game') {
            let gameState = req.gameState;
            gameState.currentTurn = gameState.players[gameState.currentPlayerNum];
            gameState.turnPhase = 'setup_placement';
            // gameState = storeGameState(gameState);
            io.sockets.emit('PLAYER_CONNECT', gameState);
        }

        // begin main phase (after all setup done)
        if (req.string == 'begin_main_game') {
            let gameState = req.gameState;
            gameState.currentPlayerNum = 0;
            gameState.currentTurn = gameState.players[gameState.currentPlayerNum];
            gameState.turnPhase = 'roll_phase';
            // gameState = storeGameState(gameState);
            io.sockets.emit('PLAYER_CONNECT', gameState)
        }

        // ends current player's turn and goes to the next player
        if (req.string == 'end_turn') {
            let gameState = req.gameState;
            gameState.currentPlayerNum++;
            if (gameState.currentPlayerNum == gameState.maxPlayerNum) {
                // go to player 1
                gameState.currentPlayerNum = 0;
            }
            gameState.currentTurn = gameState.players[gameState.currentPlayerNum];
            gameState.turnPhase = 'roll_phase';
            // gameState = storeGameState(gameState);
            io.sockets.emit('PLAYER_CONNECT', gameState);
        }

        // Dice roll (7)
        if (req.string == 'seven_roll') {
            let gameState = req.gameState;
            gameState.turnPhase = 'move_robber';
            // gameState = storeGameState(gameState);
            io.sockets.emit('PLAYER_CONNECT', gameState);
        }

        // move the robber to the new hex
        if (req.string == 'move_robber') {
            let gameState = req.gameState
            let newRobberHex = req.robberPosition;
            // remove robber from previous location
            let previousHex = gameState.hexes.find(hex => {
                return hex.robber === true;
            });
            previousHex.robber = false;
            // set the new robber hex
            let newHex = {
                robber: false
            };
            newHex = gameState.hexes.find(hex => {
                return hex.hexPosition == newRobberHex;
            })
            newHex.robber = true;

            gameState.turnPhase = 'build/trade/devcard_phase';
            // gameState = storeGameState(gameState);
            io.sockets.emit('PLAYER_CONNECT', gameState);
        }

        // Dice roll (2-6, 8-12): give out resources to players
        if (req.string == 'regular_roll') {
            let gameState = req.gameState
            let roll = req.roll;

            gameState.hexes.forEach(hex => {
                if (hex.diceNumber == roll && hex.robber == false) {
                    // give resources to all the players that own a settlement on this hex
                    hex.settlements.forEach(settlement => {
                        boardFunctions.addResource(hex.resourceType, getPlayerByID(settlement.player, gameState));
                    });

                    // give resources to all the players that own a city on this hex
                    hex.cities.forEach(city => {
                        boardFunctions.addResource(hex.resourceType, getPlayerByID(city.player, gameState));
                        boardFunctions.addResource(hex.resourceType, getPlayerByID(city.player, gameState));
                    });
                }
            });
            gameState.turnPhase = 'build/trade/devcard_phase';
            // gameState = storeGameState(gameState);
            io.sockets.emit('PLAYER_CONNECT', gameState);
        }

        // build road (setup): no resource costs, can be placed anywhere
        if (req.string == 'build_starting_road') {
            let gameState = req.gameState;
            // for some reason this does not work (currentTurn no longer references players in gamestate, is only a copy)
            // let currentPlayer = gameState.currentTurn;
            // bandaid fix:
            gameState.currentTurn = gameState.players[gameState.currentPlayerNum];
            let currentPlayer = gameState.currentTurn;

            if (boardFunctions.isValidRoad(req.start, req.end, gameState)) {
                let road = new Road({ player: currentPlayer._id, start: req.start, end: req.end });
                gameState.roads.push(road);
                // gameState = storeGameState(gameState);
                io.sockets.emit('PLAYER_CONNECT', gameState);
            } else {
                io.sockets.emit('PLAYER_CONNECT', new Error('Invalid road position'));
            }
        }

        // build road
        if (req.string == 'build_road') {
            let gameState = req.gameState
            //let currentPlayer = gameState.currentTurn;
            // bandaid fix:
            gameState.currentTurn = gameState.players[gameState.currentPlayerNum];
            let currentPlayer = gameState.currentTurn;

            if (boardFunctions.isValidRoad(req.start, req.end, gameState)) {
                if (currentPlayer.resources.Wood > 0 && currentPlayer.resource.Brick > 0) {
                    let road = new Road({ player: currentPlayer, start: req.start, end: req.end });
                    gameState.roads.push(road);
                    currentPlayer.resources.Wood--;
                    currentPlayer.resources.Brick--;
                    // TODO: check if this increments longest road
                    // currentPlayer.LongestRoadLength = currentPlayer.LongestRoadLength + 1;
                    // check if this exceeds longest road
                    // if (hasLongestRoad(currentPlayer, gameState)) {
                    //     for (let player in gameState.players) {
                    //         if (player.OwnsLongestRoad == true) {
                    //             player.VictoryPoints = player.VictoryPoints - 2;
                    //         }
                    //         player.OwnsLongestRoad = false;
                    //     }
                    //     currentPlayer.OwnsLongestRoad = true;
                    //     currentPlayer.VictoryPoints = currentPlayer.VictoryPoints + 2;
                    //     gameState.currentLongestRoad = currentPlayer.LongestRoadLength;
                    //     checkWinCondition(currentPlayer, gameState);
                    // }
                    // gameState = storeGameState(gameState);
                    io.sockets.emit('PLAYER_CONNECT', gameState);
                } else {
                    io.sockets.emit('PLAYER_CONNECT', new Error('Insufficient resources'));
                }
            } else {
                io.sockets.emit('PLAYER_CONNECT', new Error('Invalid road position'));
            }
        }

        // build settlement (setup): no resource costs
        if (req.string == 'build_starting_settlement') {
            let gameState = req.gameState;
            if (boardFunctions.isValidSettlement(req.location, gameState.currentTurn, gameState)) {
                //let currentPlayer = gameState.currentTurn;
                // bandaid fix:
                gameState.currentTurn = gameState.players[gameState.currentPlayerNum];
                let currentPlayer = gameState.currentTurn

                let settlement = new Settlement({ player: currentPlayer._id, location: req.location });
                console.log(settlement)
                gameState.settlements.push(settlement);
                boardFunctions.addSettlementToHex(settlement, gameState);
                getPlayerByID(currentPlayer._id, gameState).VictoryPoints++;
                // gameState = storeGameState(gameState);
                io.sockets.emit('PLAYER_CONNECT', gameState);
            } else {
                io.sockets.emit('PLAYER_CONNECT', new Error('Invalid settlement position'));
            }
        }

        // build settlement
        if (req.string == 'build_settlement') {
            let gameState = findGameState(req.gameName);
            if (isValidSettlement(req.location, gameState.currentTurn, gameState)) {
                //let currentPlayer = gameState.currentTurn;
                // bandaid fix:
                gameState.currentTurn = gameState.players[gameState.currentPlayerNum];
                let currentPlayer = gameState.currentTurn;

                if (currentPlayer.resources.Wood > 0 && currentPlayer.resource.Brick > 0 && currentPlayer.resources.Wheat > 0 && currentPlayer.resources.Sheep > 0) {
                    let settlement = new Settlement({ player: currentPlayer._id, location: req.location });
                    gameState.settlements.push(settlement);
                    addSettlementToHex(settlement, gameState);
                    currentPlayer.resources.Wood--;
                    currentPlayer.resources.Brick--;
                    currentPlayer.resources.Wheat--;
                    currentPlayer.resources.Sheep--;
                    currentPlayer.VictoryPoints++;
                    boardFunctions.checkWinCondition(currentPlayer, gameState);
                    gameState = storeGameState(gameState);
                    io.sockets.emit('PLAYER_CONNECT', gameState);
                } else {
                    io.sockets.emit('PLAYER_CONNECT', new Error('Insufficient resources'));
                }
            } else {
                io.sockets.emit('PLAYER_CONNECT', new Error('Invalid settlement position'));
            }
        }

        // upgrade settlement to city
        if (req.string == 'build_city') {
            let gameState = req.gameState;
            let currentPlayer = gameState.currentTurn;

            if (boardFunctions.checkValidCity(req.location, gameState, currentPlayer)) {
                if (currentPlayer.resources.Ore > 2 && currentPlayer.resources.Wheat > 1) {
                    boardFunctions.deleteSettlementAtLocation(req.location, gameState);
                    let city = new City({ player: currentPlayer._id, location: req.location });
                    gameState.cities.push(city);
                    boardFunctions.addCityToHex(city, gameState);
                    currentPlayer.resources.Wheat = currentPlayer.resources.Wheat - 2;
                    currentPlayer.resources.Ore = currentPlayer.resources.Ore - 3;
                    currentPlayer.VictoryPoints++;
                    boardFunctions.checkWinCondition(currentPlayer, gameState);
                    // gameState = storeGameState(gameState);
                    io.sockets.emit('PLAYER_CONNECT', gameState);
                } else {
                    io.sockets.emit('PLAYER_CONNECT', new Error('Insufficient resources'));
                }
            } else {
                io.sockets.emit('PLAYER_CONNECT', new Error('Invalid city position'))
            }
        }

    })

    // trade resources between players

    // trade resources from bank

    // purchase dev card

    // play dev card

});
