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
        roads = state.roads;
        settlements = state.settlements;
        cities = state.cities;
        currentLargestArmy = 0;
        currentLongestRoad = 0;
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
        player = road.username;
        startPoint = road.start;
        endPoint = road.end;
    }
}());

let Settlement = (function() {
    return function item(settlement) {
        player = settlement.username;
        location = settlement.location;
    }
}());

let City = (function() {
    return function item(city) {
        player = city.username;
        location = city.location;
    }
}());

// initialize game state
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
    let randomPositions = generateRandomIntArray();
    let hexes = [];
    i=0;
    // make forest hexes
    for (i; i < totalWoodWheatSheepHexes; i++) {
        let position = randomPositions.pop();
        let hex = new Hex({position: position, resourceType: 'Wood', diceNumber: dict[toString(position)]});
        hexes.add(hex);
    }
    i=0;
    // make wheat hexes
    for (i; i < totalWoodWheatSheepHexes; i++) {
        let position = randomPositions.pop();
        let hex = new Hex({position: position, resourceType: 'Wheat', diceNumber: dict[toString(position)]});
        hexes.add(hex);
    }
    i=0;
    // make sheep hexes
    for (i; i < totalWoodWheatSheepHexes; i++) {
        let position = randomPositions.pop();
        let hex = new Hex({position: position, resourceType: 'Sheep', diceNumber: dict[toString(position)]});
        hexes.add(hex);
    }
    i=0;
    // make ore hexes
    for (i; i < totalOreBrickHexes; i++) {
        let position = randomPositions.pop();
        let hex = new Hex({position: position, resourceType: 'Ore', diceNumber: dict[toString(position)]});
        hexes.add(hex);
    }
    i=0;
    // make brick hexes
    for (i; i < totalOreBrickHexes; i++) {
        let position = randomPositions.pop();
        let hex = new Hex({position: position, resourceType: 'Brick', diceNumber: dict[toString(position)]});
        hexes.add(hex);
    }
    // set desert hex
    position = randomPositions.pop();
    desertHex = new Hex({position: position, resourceType: 'Desert', diceNumber: 0});
    hexes.add(hex);
    return hexes;
}

function generateRandomIntArray() {
    for (var i = 0, ar = []; i < totalHexes; i++) {
        ar[i] = i;
    }
    // randomize the array
    ar.sort(function () {
        return Math.random() - 0.5;
    });
}

// build road
app.post('/build/road/', function(req, res, next) {
    let gameState = req.body.gameState;
    let currentPlayer = req.body.player;
    if (currentPlayer.resources.Wood > 0 && currentPlayer.resource.Brick > 0) {
        let road = new Road({player: currentPlayer, start: req.body.start, end: req.body.end});
        gameState.roads.add(road);
        currentPlayer.resources.Wood--;
        currentPlayer.resources.Brick--;
        // check if this exceeds longest road
        if (hasLongestRoad(currentPlayer)) {
            for (let player in gameState.players) {
                if (player.OwnsLongestRoad == true) {
                    player.VictoryPoints = player.VictoryPoints - 2;
                }
                player.OwnsLongestRoad = false;
            }
            currentPlayer.OwnsLongestRoad = true;
            currentPlayer.VictoryPoints = currentPlayer.VictoryPoints + 2;
            checkWinCondition(currentPlayer);
        }
    } else {
        return res.status(400).end("Lacking resources");
    }
})

// build settlement
app.post('/build/settlement/', function(req, res, next) {
    let gameState = req.body.gameState;
    let currentPlayer = req.body.player;
    if (currentPlayer.resources.Wood > 0 && currentPlayer.resource.Brick > 0 && currentPlayer.resources.Wheat > 0 && currentPlayer.resources.Sheep > 0) {
        let settlement = new Settlement({player: currentPlayer, location: req.body.location});
        gameState.settlements.add(settlement);
        currentPlayer.resources.Wood--;
        currentPlayer.resources.Brick--;
        currentPlayer.resources.Wheat--;
        currentPlayer.resources.Sheep--;
        currentPlayer.VictoryPoint++;
        checkWinCondition(currentPlayer);
    } else {
        return res.status(400).end("Lacking resources");
    }
})

// upgrade to city
app.post('/build/city/', function(req, res, next) {
    let gameState = req.body.gameState;
    let currentPlayer = req.body.player;
    if (currentPlayer.resources.Ore > 2 && currentPlayer.resource.Wheat > 1) {
        let city = new City({player: currentPlayer, location: req.body.location});
        gameState.cities.add(city);
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

// move robber and if possible take resource card

// check longest road

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





const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});