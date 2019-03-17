# WebSockets Documentation


# Login/Signup

TO BE IMPLEMENTED IN THE FUTURE

# Game Phases

setup_placement: each player places a single road and settlement on their turn (happens twice per player)
roll_phase: current player can only roll the dice
move_robber (only if the roll_phase caused a 7 to be rolled): current player picks where to move the robber
build/trade/devcard_phase: current player can choose to build roads/settlements/cities, trade with other players or the bank, or buy/play dev cards

# Game Logic
**'room_setup':**
 - data:
	 - gameName: (string) name of the room
	 - username: (string) username of the host player

**'player_join':**
 - data:
	 - gameName: (string) name of the room
	 -  username: (string) username of the player

**'start_game', 'end_turn', 'seven_roll'**
 - data:
	 - gameName: (string) name of the room


**'move_robber'**
 - data:
	 - gameName: (string) name of the room
	 - robberPosition: (int) hex position of where the player chose to place the robber

**'regular_roll'**
- data: 
	- gameName: (string) name of the room
	- roll: (int) int from 2-6, 8-12 showing the dice total rolled

**'build_starting_road', 'build_road'**
- data:
	- gameName: (string) name of the room
	- start: (int) start location of road
	- end: (int) end location of road

**'build_starting_settlement', 'build_settlement', 'build_city'**
- data:
	- gameName: (string) name of the room
	- location: (int) location of the settlement/city
