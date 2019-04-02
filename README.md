# Project Proposal

## URL
https://c09-project-express-backend.herokuapp.com/

## Team Members:
Ziming Liu,
Tony Zeng,
Jonathan Yeung.

## Description
A multiplayer (3-4 players) online board game similar to the Settles of Catan but with our own custom rules. 

## Key Features by Beta
Action Cards made, Resource Cards made, some game mechanics implemented, random board generation implemented.

## Additional Features for Final Version
Game lobby front end made, Database implemented to store game state, keeping track of stats for each player (ie. wins, losses etc.) Game animations.

## Technologies
Firebase Database, ReactJS, BoardGame.io, react-game-kit, WebSockets.io

## Top 5 Technical Challenges
1. Creating turn based actions and preventing others from interfering
2. Saving a game state so that others can rejoin when they disconnect
3. Connecting players to the same game and having their actions/moves on the board be synced across all players. We wish to create a seamless user interface that is properly updated to reflect changes to the game. Whenever the current player takes an action or otherwise makes a change to the game state, the board must reflect the changes to not just the current player but to all the players in the game.
4. Creating private game "rooms" specific to the players in that lobby
5. Ensuring the game logic doesn't break other game rules and that the game flows correctly
