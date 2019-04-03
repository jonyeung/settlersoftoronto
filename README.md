# Project Proposal

## URL
https://c09-project-express-backend.herokuapp.com/
video link: https://youtu.be/8QEM0uK68K4

## Team Members:
Ziming Liu,
Tony Zeng,
Jonathan Yeung.

## Description
A multiplayer (3-4 players) online board game based on the Settlers of Catan but with our own custom rules. 
Such rules include: 
  - 7 rolls now grant the current player 1 of each resource
  - No dev cards (as of yet)
  - No trading (as of yet)
  - No longest road, longest army conditions
  - You can see other people's resources

## Key Features by Beta
Action Cards made, Resource Cards made, some game mechanics implemented, random board generation implemented.

## Additional Features for Final Version
Game lobby front end made complete with game room browser, Database implemented to store game state, Multiplayer enabled via websocket interaction, signin/up/out implemented, all game mechanics implemented.

## Technologies
Firebase Realtime Database, Firebase Authentication, Firebase Admin SDK, ReactJS, Axios, react-game-kit, WebSockets.io 

## Top 5 Technical Challenges
1. Creating turn based actions and preventing others from interfering. Players are restricted to only be able to perform allowable actions, most of these are limited to when it is their own turn. It was a challenge to sync the current player with each actual user.
2. Storing user info in a cookie. Despite following the method shown in the labs, we were unable to get the browser to store the cookies for stateless authentication. We had to find a workaround to store the username and id on the frontend with some other methods.
3. Connecting players to the same game and having their actions/moves on the board be synced across all players. We wish to create a seamless user interface that is properly updated to reflect changes to the game. Whenever the current player takes an action or otherwise makes a change to the game state, the board must reflect the changes to not just the current player but to all the players in the game.
4. Creating private game "rooms" specific to the players in that lobby. Originally, all game rooms would redirect the user to the same game. Additionally, each time a player joined it would reset the entire game. It was a challenge but eventually with the use of a DB we could get it so a player could join separate games without interfering with the game state itself.
5. Deploying the app. It took us many hours to configure deployment with Heroku. We faced issues with the backend not working, issues with Cross Origin Resource Sharing, and difficulties in reconfiguring our app from localhost to using Heroku's server.
