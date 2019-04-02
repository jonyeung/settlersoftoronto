# WebSockets Documentation


# Lobby API

**'/signIn':**
 - description: user sign-in request
 - request: POST
 	 - content-type: `application/json`
	 - body:
		- email: (string) email of user
		- password: (string) password of user
 - response: 200
 	- content-type: `application/json`
 	- body:
		- error: null
		- uid: user ID
		- idToken: Firebase ID token for the user
		- idTokenExpiryDate: expiry date for the Firebase token
		- username: name of the user
 - response: 401
 	- content-type: `application/json`
	- body:
		- error: 'INVALID PASSWORD'
 ```
 $ curl -H "Content-Type: application/json" -X POST -d '{"email": "johnsmith@gmail.com", "password":"mypassword"}' https://localhost:3000/signIn
 ```
 
 **'/signUp':**
 - description: user sign-up request
 - request: POST
 	 - content-type: `application/json`
	 - body:
		- email: (string) email of user
		- password: (string) password of user
 - response: 200
 	- content-type: `application/json`
 	- body:
		- error: null
 - response: 401
 	- content-type: `application/json`
	- body:
		- error: 'SIGN_UP_FAILED'
 ```
 $ curl -H "Content-Type: application/json" -X POST -d '{"email": "johnsmith@gmail.com", "password":"mypassword"}' https://localhost:3000/signUp
 ```
 
**'/signOut':**
 - description: signs the user out
 - request: POST
 - response: 200
```
$ curl -X POST https://localhost:3000/signOut
```


**'/getRooms':**
 - description: pulls the list of game rooms from the Firebase Realtime Database
 - request: GET
 - response: 200
 	- content-type: `application/json`
	- body:
		- error: null,
		- rooms: (list of JSON obj) list of gameState objects
 - response: 404
 	- content-type: `application/json`
	- body:
		- error: err code,
		- rooms: empty list
```
$ curl https://localhost:3000/getRooms
```


# Game Phases

setup_placement: each player places a single road and settlement on their turn (happens twice per player)

roll_phase: current player can only roll the dice

move_robber (only if the roll_phase caused a 7 to be rolled, not implemented): current player picks where to move the robber

build/trade/devcard_phase: current player can choose to build roads/settlements/cities, trade with other players or the bank, or buy/play dev cards

# WebSocket Interactions
**'room_setup':**
 - description: creates a new game room
 - data:
	 - gameName: (string) name of the room
	 - uid: (string) user ID of the host player
	 - username: (string) username of the host player

**'player_join':**
 - description: new player joins the game room
 - data:
	 - gameStateId: (string) ID of the game
	 - uid: (string) user ID of the joining player
	 - username: (string) username of the player

**'start_game'**
 - description: initializes the game into the setup_placement phase
 - data:
	 - gameStateId: (string) ID of the game

**'end_turn'**
 - description: ends the current player's turn and goes to the next player
 - data:
 	 - gameStateId: (string) ID of the game
	 - uid: (string) user ID of the player initiating this action

**'seven_roll'**
 - description: original plan was to allow user to move the robber but as a placeholder now just gives 1 of each resource
 - data:
 	 - gameStateId: (string) ID of the game

**'regular_roll'**
 - description: handles the assignment of resources depending on the number of the die roll
 - data: 
 	- gameStateId: (string) ID of the game
	- roll: (int) int from 2-6, 8-12 showing the dice total rolled

**'build_road'**
- description: build a road
- data:
 	- gameStateId: (string) ID of the game
	- uid: (string) user ID of the player initiating this action
	- start: (int) start location of road
	- end: (int) end location of road

**'build_settlement'**
 - description: build a settlement
 - data:
 	- gameStateId: (string) ID of the game
	- uid: (string) user ID of the player initiating this action
	- location: (int) location of the settlement


**'build_city'**
 - description: upgrade a pre-existing settlement to a city
 - data:
 	- gameStateId: (string) ID of the game
	- uid: (string) user ID of the player initiating this action
	- location: (int) location of the city
