/*jshint esversion: 6*/
const express = require('express');
const app = express();

const totalHexes = 19;
const totalWoodWheatSheepHexes = 4;
const totalOreBrickHexes = 3;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

let gameState = (function() {
    return function item(state) {
        players = state.players;
        hexes = state.hexes;
        roads = [];
        settlements = [];
        cities = [];
        currentLargestArmy = 0;
        currentLongestRoad = 0;
        currentPlayerNum = 0;
        maxPlayerNum = state.maxPlayers;
        currentTurn = player[currentPlayerNum];
    }
})

let Player = (function() {
    return function item(player) {
        this.username = player.username,
        resources = {
            Wood: 0,
            Sheep: 0,
            Ore: 0,
            Brick: 0,
            Wheat: 0
        },
        devCards = {
            Knight: 0,
            VictoryPointCard: 0,
            RoadBuilding: 0,
            Monopoly: 0,
            YearOfPlenty: 0
        },
        knightsPlayed = 0,
        VictoryPoints = 0,
        LongestRoadLength = 0
        OwnsLargestArmy = false,
        OwnsLongestRoad = false,
        OwnsSheepPort = false,
        OwnsWoodPort = false,
        OwnsOrePort = false,
        OwnsBrickPort = false,
        OwnsWheatPort = false,
        Owns3For1Port = false
    }
}());

let Hex = (function() {
    return function item(hex) {
        hexPositon = hex.position;
        robber = false;
        resourceType = hex.resourceType;
        diceNumber = hex.diceNumber;
        settlements = [];
        cities = [];
    }
}());

let Road = (function() {
    return function item(road) {
        player = road.player;
        startPoint = road.start;
        endPoint = road.end;
    }
}());

let Settlement = (function() {
    return function item(settlement) {
        player = settlement.player;
        location = settlement.location;
    }
}());

let City = (function() {
    return function item(city) {
        player = city.player;
        location = city.location;
    }
}());

// initialize game state
// req.body:
//      numPlayers: total number of players in game
//      player1, player2, ... : just requires player.username attribute
app.post('/initialize', function(req, res, next) {
    let numPlayers = req.body.numPlayers;
    let players = [];
    let i=0;
    // initialize players
    for (i; i < numPlayers; i++) {
        let player = new Player(req.body.player + toString(i));
        players.add(player);
    }
    // set up board
    let hexes = setupHexes();

    // return gameState
    let gameState = new gameState({players: players, hexes: hexes, maxPlayers: numPlayers});
    return res.json(gameState);
})

function setupHexes() {
    let dicePositions = {};
    dicePositions['1'] = 5;
    dicePositions['2'] = 2;
    dicePositions['3'] = 6;
    dicePositions['4'] = 3;
    dicePositions['5'] = 8;
    dicePositions['6'] = 10;
    dicePositions['7'] = 9;
    dicePositions['8'] = 12;
    dicePositions['9'] = 11;
    dicePositions['10'] = 4;
    dicePositions['11'] = 8;
    dicePositions['12'] = 10;
    dicePositions['13'] = 9;
    dicePositions['14'] = 4;
    dicePositions['15'] = 5;
    dicePositions['16'] = 6;
    dicePositions['17'] = 3;
    dicePositions['18'] = 11;
    let randomResources = generateRandomOrderResources();
    let hexes = [];
    let i=1;
    let desertPosition = Math.floor(Math.random() * 19) + 1;
    let hex;
    for (i; i < 20; i++) {
        if (i == desertPosition) {
            hex = new Hex({position: i, resourceType:'Desert', diceNumber: 0});
            hex.robber = true;
        } else {
            hex = new Hex({position: i, resourceType: randomResources.pop(), diceNumber: dicePositions[toString(i)]});
        }
        hexes.add(hex);   
    }

    return hexes;
}

function generateRandomOrderResources() {
    ar = ["Wheat", "Wheat", "Wheat", "Wheat",
            "Wood", "Wood", "Wood", "Wood",
            "Sheep", "Sheep", "Sheep", "Sheep",
            "Ore", "Ore", "Ore",
            "Brick", "Brick", "Brick"];
    // randomize the array
    ar.sort(function () {
        return Math.random() - 0.5;
    });
}

// ends current player's turn and goes to the next player
app.post('/turn/next/', function (req, res, next) {
    let gameState = req.body.gameState;
    let currentPlayerNum = gameState.currentPlayerNum;
    if (currentPlayerNum == gameState.maxPlayerNum) {
        // go to player 1
        currentPlayerNum = 1;
    } else {
        currentPlayerNum++;
    }
    gameState.currentTurn = gameState.players[currentPlayerNum];
    return res.json(gameState);
})

// Dice roll (7): current player moves robber to target hex
app.post('/turn/robber/', function (req, res, next) {
    let gameState = req.body.gameState;
    let newRobberHex = req.body.robberPosition;
    // remove robber from previous location
    let previousHex = gameState.hexes.find(hex => {
        return hex.robber == true;
    });
    previousHex.robber = false;

    let newHex = gameState.hexes.find(hex => {
        return hex.hexPosition == newRobberHex;
    })
    newHex.robber = true;
    return res.json(gameState);
})

// Dice roll (2-6, 8-12): give out resources to players
app.post('/turn/resources/', function (req, res, next) {
    let gameState = req.body.gameState;
    let roll = req.body.roll;

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
    return res.json(gameState);
})


function addResource(resource, currentPlayer) {
    switch(resource) {
        case 'Wood':
            currentPlayer.Wood++;
            break;
        case 'Wheat':
            currentPlayer.Wheat++;
            break;
        case 'Ore':
            currentPlayer.Ore++;
            break;
        case 'Brick':
            currentPlayer.Brick++;
            break;
        case 'Sheep':
            currentPlayer.Sheep++;
            break;
    }
}

// build road (setup): no resource costs, can be placed anywhere
app.post('/build/setup/road/', function(req, res, next) {
    let gameState = req.body.gameState;
    let currentPlayer = gameState.currentTurn;
    let road = new Road({player: currentPlayer, start: req.body.start, end: req.body.end});
    gameState.roads.add(road);
})

// build road
app.post('/build/road/', function(req, res, next) {
    let gameState = req.body.gameState;
    let currentPlayer = gameState.currentTurn;
    if (currentPlayer.resources.Wood > 0 && currentPlayer.resource.Brick > 0) {
        let road = new Road({player: currentPlayer, start: req.body.start, end: req.body.end});
        gameState.roads.add(road);
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
            checkWinCondition(currentPlayer);
        }
    } else {
        return res.status(400).end("Lacking resources");
    }
})

// build settlement (setup): no resource costs
app.post('/build/setup/settlement/', function(req, res, next) {
    let gameState = req.body.gameState;
    if (isValidSettlement(req.body.location, gameState)) {
        let currentPlayer = gameState.currentTurn;
        let settlement = new Settlement({player: currentPlayer, location: req.body.location});
        addSettlementToHex(settlement, gameState);
        currentPlayer.VictoryPoint++;
    } else {
        return res.status(400).end("Not a valid position");
    }
})

// build settlement
app.post('/build/settlement/', function(req, res, next) {
    let gameState = req.body.gameState;
    if (isValidSettlement(req.body.location, gameState)) {
        let currentPlayer = gameState.currentTurn;
        if (currentPlayer.resources.Wood > 0 && currentPlayer.resource.Brick > 0 && currentPlayer.resources.Wheat > 0 && currentPlayer.resources.Sheep > 0) {
            let settlement = new Settlement({player: currentPlayer, location: req.body.location});
            addSettlementToHex(settlement, gameState);
            currentPlayer.resources.Wood--;
            currentPlayer.resources.Brick--;
            currentPlayer.resources.Wheat--;
            currentPlayer.resources.Sheep--;
            currentPlayer.VictoryPoint++;
            checkWinCondition(currentPlayer);
        } else {
            return res.status(400).end("Lacking resources");
        }
    } else {
        return res.status(400).end("Not a valid position");
    }
})

function addSettlementToHex(settlement, gameState) {
    let hexesToUpdate = getHexesAtLocation(settlement.location, gameState);
    for (let hex in hexesToUpdate) {
        hex.settlements.add(settlement);
    }
}

function addCityToHex(city, gameState) {
    let hexesToUpdate = getHexesAtLocation(city.location, gameState);
    for (let hex in hexesToUpdate) {
        hex.cities.add(city);
    }
}

function getHexesAtLocation(location, gameState) {
    let hexes = [];
    if (location == 1 || location == 5 || location == 9 || 
        location == 13 || location == 8 || location == 4) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 1;
            });
            hexes.add(targetHex);
        }
    if (location == 2 || location == 6 || location == 10 ||
        location == 14 || location == 9 || location == 5) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 12;
            });
            hexes.add(targetHex);
        }
    if (location == 3 || location == 7 || location == 11 ||
        location == 15 || location == 10 || location == 6) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 11;
            });
            hexes.add(targetHex);
        }
    if (location == 8 || location == 13 || location == 18 ||
        location == 23 || location == 17 || location == 12) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 2;
            });
            hexes.add(targetHex);
        }
    if (location == 9 || location == 14 || location == 19 ||
        location == 24 || location == 18 || location == 13) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 13;
            });
            hexes.add(targetHex);
        }
    if (location == 10 || location == 15 || location == 20 ||
        location == 25 || location == 19 || location == 14) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 18;
            });
            hexes.add(targetHex);
        }
    if (location == 11 || location == 16 || location == 21 ||
        location == 26 || location == 20 || location == 15) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 10;
            });
            hexes.add(targetHex);
        }
    if (location == 17 || location == 23 || location == 29 ||
        location == 34 || location == 28 || location == 22) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 3;
            });
            hexes.add(targetHex);
        }
    if (location == 18 || location == 24 || location == 30 ||
        location == 35 || location == 29 || location == 23) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 14;
            });
            hexes.add(targetHex);
        }
    if (location == 19 || location == 25 || location == 31 ||
        location == 36 || location == 30 || location == 24) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 19;
            });
            hexes.add(targetHex);
        }
    if (location == 20 || location == 26 || location == 32 ||
        location == 37 || location == 31 || location == 25) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 17;
            });
            hexes.add(targetHex);
        }
    if (location == 21 || location == 27 || location == 33 ||
        location == 38 || location == 32 || location == 26) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 9;
            });
            hexes.add(targetHex);
        }
    if (location == 29 || location == 35 || location == 40 ||
        location == 44 || location == 39 || location == 34) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 4;
            });
            hexes.add(targetHex);
        }
    if (location == 30 || location == 36 || location == 41 ||
        location == 45 || location == 40 || location == 35) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 15;
            });
            hexes.add(targetHex);
        }
    if (location == 31 || location == 37 || location == 42 ||
        location == 46 || location == 41 || location == 36) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 16;
            });
            hexes.add(targetHex);
        }
    if (location == 32 || location == 38 || location == 43 ||
        location == 47 || location == 42 || location == 37) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 8;
            });
            hexes.add(targetHex);
        }
    if (location == 40 || location == 45 || location == 49 ||
        location == 52 || location == 48 || location == 44) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 5;
            });
            hexes.add(targetHex);
        }
    if (location == 41 || location == 46 || location == 50 ||
        location == 53 || location == 49 || location == 45) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 6;
            });
            hexes.add(targetHex);
        }
    if (location == 42 || location == 47 || location == 51 ||
        location == 54 || location == 50 || location == 46) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 7;
            });
            hexes.add(targetHex);
        }
    return hexes;
}

// upgrade to city
app.post('/build/city/', function(req, res, next) {
    let gameState = req.body.gameState;
    let currentPlayer = gameState.currentTurn;
    if (currentPlayer.resources.Ore > 2 && currentPlayer.resource.Wheat > 1) {
        let city = new City({player: currentPlayer, location: req.body.location});
        addSettlementToHex(city, gameState);
        currentPlayer.resources.Wheat = currentPlayer.resources.Wheat - 2;
        currentPlayer.resources.Ore = currentPlayer.resources.Ore - 3;
        currentPlayer.VictoryPoint++;
        checkWinCondition(currentPlayer);
    } else {
        return res.status(400).end("Lacking resources");
    }
})

// purchase dev card

// play dev card

// check longest road
function hasLongestRoad(currentPlayer, gameState) {
    let maxLength = 0;
    for (let player in gameState.players) {
        if (player !== currentPlayer) {
            if (player.LongestRoadLength > maxLength) maxLength = player.LongestRoadLength;
        }
    }
    if (currentPlayer.LongestRoadLength > maxLength && currentPlayer.LongestRoadLength >= 5) {
        return true;
    } else {
        return false;
    }

}

// check largest army

// check win condition
function checkWinCondition(player) {
    if (player.VictoryPoints + player.devCards.VictoryPointCard > 9) {
        return true;
    } else {
        return false;
    }
}

// trade resources between players

// trade resources for other resources

// check valid road position
function isValidRoad(startPoint, endPoint, gameState) {
    for (let road in gameState.roads) {
        if (road.startPoint == startPoint && road.endPoint == endPoint) {
            return false;
        }
    }
    return true;
}


// check valid settlement spot
function isValidSettlement(location, gameState) {
    let adjacentLocations = getAdjacentSettlementPositions(location);
    let connectingRoad = false;

    for (let settlement in gameState.settlements) {
        // check that the location is not occupied
        if (settlement.location == location) {
            return false;
        }
        // check that there are no other settlements within 1 space
        if (adjacentLocations.indexOf(settlement.location) >= 0) {
            return false;
        }
        // check there is a road connecting to the location
        for (let road in gameState.roads) {
            if (road.startPoint == location || road.endPoint == location) {
                connectingRoad = true;
            }
        }
    }
    return existsConnectingRoad;
}

function getAdjacentSettlementPositions(location) {
    let adjacentLocations = [];
    if (location >= 1 && location <= 3) {
        adjacentLocations.add(location + 3);
        adjacentLocations.add(location + 4);
    }
    if (location == 4) {
        adjacentLocations.add(1);
        adjacentLocations.add(8);
    }
    if (location >= 5 && location <= 6) {
        adjacentLocations.add(location - 4);
        adjacentLocations.add(location - 3);
        adjacentLocations.add(location + 4);
    }
    if (location == 7) {
        adjacentLocations.add(3);
        adjacentLocations.add(11);
    }
    if (location >= 8 && location <= 11) {
        adjacentLocations.add(location - 4);
        adjacentLocations.add(location + 4);
        adjacentLocations.add(location + 5);
    }
    if (location == 12) {
        adjacentLocations.add(8);
        adjacentLocations.add(17);
    }
    if (location >= 13 && location <= 15) {
        adjacentLocations.add(location - 5);
        adjacentLocations.add(location - 4);
        adjacentLocations.add(location + 5);
    }
    if (location == 16) {
        adjacentLocations.add(11);
        adjacentLocations.add(21);
    }
    if (location >= 17 && location <= 21) {
        adjacentLocations.add(location - 5);
        adjacentLocations.add(location + 5);
        adjacentLocations.add(location + 6);
    }
    if (location == 22) {
        adjacentLocations.add(17);
        adjacentLocations.add(28);
    }
    if (location >= 23 && location <= 26) {
        adjacentLocations.add(location - 6);
        adjacentLocations.add(location - 5);
        adjacentLocations.add(location + 6);
    }
    if (location >= 27 && location <= 28) {
        adjacentLocations.add(location - 6);
        adjacentLocations.add(location + 6);
    }
    if (location >= 29 && location <= 32) {
        adjacentLocations.add(location - 6);
        adjacentLocations.add(location + 5);
        adjacentLocations.add(location + 6);
    }
    if (location == 33) {
        adjacentLocations.add(27);
        adjacentLocations.add(38);
    }
    if (location >= 34 && location <= 38) {
        adjacentLocations.add(location - 6);
        adjacentLocations.add(location - 5);
        adjacentLocations.add(location + 5);
    }
    if (location == 39) {
        adjacentLocations.add(34);
        adjacentLocations.add(44);
    }
    if (location >= 40 && location <= 42) {
        adjacentLocations.add(location - 5);
        adjacentLocations.add(location + 4);
        adjacentLocations.add(location + 5);
    }
    if (location == 43) {
        adjacentLocations.add(38);
        adjacentLocations.add(47);
    }
    if (location >= 44 && location <= 47) {
        adjacentLocations.add(location - 5);
        adjacentLocations.add(location - 4);
        adjacentLocations.add(location + 4);
    }
    if (location == 48) {
        adjacentLocations.add(44);
        adjacentLocations.add(52);
    }
    if (location >= 49 && location <= 50) {
        adjacentLocations.add(location - 4);
        adjacentLocations.add(location + 3);
        adjacentLocations.add(location + 4);
    }
    if (location == 51) {
        adjacentLocations.add(47);
        adjacentLocations.add(54);
    }
    if (location >= 52 && location <= 54) {
        adjacentLocations.add(location - 4);
        adjacentLocations.add(location - 3);
    }

    return adjacentLocations;
}



const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});