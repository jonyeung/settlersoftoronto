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

// check if it is a valid city spot
function checkValidCity(location, gameState, currentPlayer) {
    for (let settlement in gameState.settlements) {
        // check that the target location has a settlement owned by the player
        if (settlement.location == location) {
            if (settlement.player.username == currentPlayer.username) {
                return true;
            }
            return false;
        }
    }
    return false;
}

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
function checkWinCondition(player, gameState) {
    if (player.VictoryPoints + player.devCards.VictoryPointCard > 9) {
        gameState.gameOver = true;
        gameState.winner = player;
    } 
}



// check valid road position
function isValidRoad(startPoint, endPoint, gameState) {
    for (let road in gameState.roads) {
        if (road.startPoint == startPoint && road.endPoint == endPoint) {
            return false;
        }
        if (road.startPoint == endPoint && road.endPoint == startPoint) {
            return false;
        }
    }
    return true;
}


// check valid settlement spot
function isValidSettlement(location, currentPlayer, gameState) {
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
        // check there is a player owned road connecting to the location
        for (let road in gameState.roads) {
            if (road.startPoint == location || road.endPoint == location) {
                if (road.player.username == currentPlayer.username) {
                    connectingRoad = true;
                }
            }
        }
    }
    return connectingRoad;
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

module.exports = {
    setupHexes: setupHexes,
    generateRandomOrderResources
}