let Hex = (function(hex) {
    return {
        hexPosition : hex.position,
        robber : false,
        resourceType : hex.resourceType,
        diceNumber : hex.diceNumber,
        settlements : [],
        cities : [],
    }
});

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

    return ar
}

function setupHexes() {
    let dicePositions = {};
    dicePositions['0'] = 5;
    dicePositions['1'] = 2;
    dicePositions['2'] = 6;
    dicePositions['3'] = 3;
    dicePositions['4'] = 8;
    dicePositions['5'] = 10;
    dicePositions['6'] = 9;
    dicePositions['7'] = 12;
    dicePositions['8'] = 11;
    dicePositions['9'] = 4;
    dicePositions['10'] = 8;
    dicePositions['11'] = 10;
    dicePositions['12'] = 9;
    dicePositions['13'] = 4;
    dicePositions['14'] = 5;
    dicePositions['15'] = 6;
    dicePositions['16'] = 3;
    dicePositions['17'] = 11;
    let index = 1;
    index= index.toString()
    let randomResources = generateRandomOrderResources();
    let hexes = [];
    let desertPosition = Math.floor(Math.random() * 19) + 1;
    let hex;

    let i=0;
    let desertSet = false;
    for (i; i < 19; i++) {
        if (i == desertPosition) {
            hex = new Hex({position: i, resourceType:'Desert', diceNumer: null});
            hex.robber = true;
            desertSet = true;
        } else {
            if (desertSet) {
                hex = new Hex({position: i+1, resourceType: randomResources.pop(), diceNumber: dicePositions[(i-1).toString()]});
            } else {
                hex = new Hex({position: i+1, resourceType: randomResources.pop(), diceNumber: dicePositions[i.toString()]});
            }
        }
        hexes.push(hex);   
    }

    return hexes;
}

function addResource(resource, currentPlayer) {
    console.log(resource)
    if (resource == 'Brick') currentPlayer.resources.Brick++
    if (resource == 'Wood') currentPlayer.resources.Wood++
    if (resource == 'Wheat') currentPlayer.resources.Wheat++
    if (resource == 'Ore') currentPlayer.resources.Ore++
    if (resource == 'Sheep') currentPlayer.resources.Sheep++
    console.log(currentPlayer.resources)
}

function addSettlementToHex(settlement, gameState) {
    let hexesToUpdate = getHexesAtLocation(settlement.location, gameState);
    hexesToUpdate.forEach(hex => {
        hex.settlements.push(settlement);
    });
}

function addCityToHex(city, gameState) {
    let hexesToUpdate = getHexesAtLocation(city.location, gameState);
    for (let hex in hexesToUpdate) {
        hex.cities.push(city);
    }
}

function getHexesAtLocation(location, gameState) {
    let hexes = [];
    if (location == 1 || location == 5 || location == 9 || 
        location == 13 || location == 8 || location == 4) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 1;
            });
            hexes.push(targetHex);
        }
    if (location == 2 || location == 6 || location == 10 ||
        location == 14 || location == 9 || location == 5) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 12;
            });
            hexes.push(targetHex);
        }
    if (location == 3 || location == 7 || location == 11 ||
        location == 15 || location == 10 || location == 6) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 11;
            });
            hexes.push(targetHex);
        }
    if (location == 8 || location == 13 || location == 18 ||
        location == 23 || location == 17 || location == 12) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 2;
            });
            hexes.push(targetHex);
        }
    if (location == 9 || location == 14 || location == 19 ||
        location == 24 || location == 18 || location == 13) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 13;
            });
            hexes.push(targetHex);
        }
    if (location == 10 || location == 15 || location == 20 ||
        location == 25 || location == 19 || location == 14) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 18;
            });
            hexes.push(targetHex);
        }
    if (location == 11 || location == 16 || location == 21 ||
        location == 26 || location == 20 || location == 15) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 10;
            });
            hexes.push(targetHex);
        }
    if (location == 17 || location == 23 || location == 29 ||
        location == 34 || location == 28 || location == 22) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 3;
            });
            hexes.push(targetHex);
        }
    if (location == 18 || location == 24 || location == 30 ||
        location == 35 || location == 29 || location == 23) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 14;
            });
            hexes.push(targetHex);
        }
    if (location == 19 || location == 25 || location == 31 ||
        location == 36 || location == 30 || location == 24) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 19;
            });
            hexes.push(targetHex);
        }
    if (location == 20 || location == 26 || location == 32 ||
        location == 37 || location == 31 || location == 25) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 17;
            });
            hexes.push(targetHex);
        }
    if (location == 21 || location == 27 || location == 33 ||
        location == 38 || location == 32 || location == 26) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 9;
            });
            hexes.push(targetHex);
        }
    if (location == 29 || location == 35 || location == 40 ||
        location == 44 || location == 39 || location == 34) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 4;
            });
            hexes.push(targetHex);
        }
    if (location == 30 || location == 36 || location == 41 ||
        location == 45 || location == 40 || location == 35) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 15;
            });
            hexes.push(targetHex);
        }
    if (location == 31 || location == 37 || location == 42 ||
        location == 46 || location == 41 || location == 36) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 16;
            });
            hexes.push(targetHex);
        }
    if (location == 32 || location == 38 || location == 43 ||
        location == 47 || location == 42 || location == 37) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 8;
            });
            hexes.push(targetHex);
        }
    if (location == 40 || location == 45 || location == 49 ||
        location == 52 || location == 48 || location == 44) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 5;
            });
            hexes.push(targetHex);
        }
    if (location == 41 || location == 46 || location == 50 ||
        location == 53 || location == 49 || location == 45) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 6;
            });
            hexes.push(targetHex);
        }
    if (location == 42 || location == 47 || location == 51 ||
        location == 54 || location == 50 || location == 46) {
            let targetHex = gameState.hexes.find(hex => {
                return hex.hexPosition == 7;
            });
            hexes.push(targetHex);
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
    let isValid = true;
    gameState.roads.forEach(road => {
        if (road.startPoint == startPoint && road.endPoint == endPoint) {
            isValid = false;
        }
        if (road.startPoint == endPoint && road.endPoint == startPoint) {
            isValid = false;
        }
    });
    return isValid;
}


function getPlayerByID(playerID, gameState) {
    return gameState.players[playerID]
}

// check valid settlement spot
function isValidSettlement(location, currentPlayer, gameState) {
    let adjacentLocations = getAdjacentSettlementPositions(location);
    let validSettlement = true;
    let connectingRoad = false;
    roads = gameState.roads;

    // check there is a player owned road connecting to the location
    roads.forEach(road => {
        console.log(road)
        let roadOwner = getPlayerByID(road.player, gameState);
        if (road.startPoint == road.location || road.endPoint == location) {
            if (roadOwner.username == currentPlayer.username) {
                connectingRoad = true;
            }
        }
    });

    gameState.settlements.forEach(settlement => {
        // check that the location is not occupied
        if (settlement.location == location) {
            validSettlement = false;
        }
        // check that there are no other settlements within 1 space
        if (adjacentLocations.indexOf(settlement.location) >= 0) {
            validSettlement = false;
        }
        
    })
    console.log("valid spot:", validSettlement)
    console.log("connecting road:", connectingRoad)
    return validSettlement && connectingRoad;
}

function getAdjacentSettlementPositions(location) {
    let adjacentLocations = [];
    if (location >= 1 && location <= 3) {
        adjacentLocations.push(location + 3);
        adjacentLocations.push(location + 4);
    }
    if (location == 4) {
        adjacentLocations.push(1);
        adjacentLocations.push(8);
    }
    if (location >= 5 && location <= 6) {
        adjacentLocations.push(location - 4);
        adjacentLocations.push(location - 3);
        adjacentLocations.push(location + 4);
    }
    if (location == 7) {
        adjacentLocations.push(3);
        adjacentLocations.push(11);
    }
    if (location >= 8 && location <= 11) {
        adjacentLocations.push(location - 4);
        adjacentLocations.push(location + 4);
        adjacentLocations.push(location + 5);
    }
    if (location == 12) {
        adjacentLocations.push(8);
        adjacentLocations.push(17);
    }
    if (location >= 13 && location <= 15) {
        adjacentLocations.push(location - 5);
        adjacentLocations.push(location - 4);
        adjacentLocations.push(location + 5);
    }
    if (location == 16) {
        adjacentLocations.push(11);
        adjacentLocations.push(21);
    }
    if (location >= 17 && location <= 21) {
        adjacentLocations.push(location - 5);
        adjacentLocations.push(location + 5);
        adjacentLocations.push(location + 6);
    }
    if (location == 22) {
        adjacentLocations.push(17);
        adjacentLocations.push(28);
    }
    if (location >= 23 && location <= 26) {
        adjacentLocations.push(location - 6);
        adjacentLocations.push(location - 5);
        adjacentLocations.push(location + 6);
    }
    if (location >= 27 && location <= 28) {
        adjacentLocations.push(location - 6);
        adjacentLocations.push(location + 6);
    }
    if (location >= 29 && location <= 32) {
        adjacentLocations.push(location - 6);
        adjacentLocations.push(location + 5);
        adjacentLocations.push(location + 6);
    }
    if (location == 33) {
        adjacentLocations.push(27);
        adjacentLocations.push(38);
    }
    if (location >= 34 && location <= 38) {
        adjacentLocations.push(location - 6);
        adjacentLocations.push(location - 5);
        adjacentLocations.push(location + 5);
    }
    if (location == 39) {
        adjacentLocations.push(34);
        adjacentLocations.push(44);
    }
    if (location >= 40 && location <= 42) {
        adjacentLocations.push(location - 5);
        adjacentLocations.push(location + 4);
        adjacentLocations.push(location + 5);
    }
    if (location == 43) {
        adjacentLocations.push(38);
        adjacentLocations.push(47);
    }
    if (location >= 44 && location <= 47) {
        adjacentLocations.push(location - 5);
        adjacentLocations.push(location - 4);
        adjacentLocations.push(location + 4);
    }
    if (location == 48) {
        adjacentLocations.push(44);
        adjacentLocations.push(52);
    }
    if (location >= 49 && location <= 50) {
        adjacentLocations.push(location - 4);
        adjacentLocations.push(location + 3);
        adjacentLocations.push(location + 4);
    }
    if (location == 51) {
        adjacentLocations.push(47);
        adjacentLocations.push(54);
    }
    if (location >= 52 && location <= 54) {
        adjacentLocations.push(location - 4);
        adjacentLocations.push(location - 3);
    }

    return adjacentLocations;
}

module.exports = {
    setupHexes: setupHexes,
    generateRandomOrderResources,
    isValidRoad,
    isValidSettlement,
    addSettlementToHex,
    addResource
}