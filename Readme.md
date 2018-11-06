Download/Create:
1. npm install -g create-react-native-app
2. 

TODO:

1. Creating and Launching a simple chat app (React Native)
2. Creating and Launching a simple flask app (Flask)
3. Storing and Reading chats from memory (Flask)
4. Connecting React Native to our Flask backend
5. Swapping our in memory store for MySql

Requirements: 
1. Support 2 users to chat with eachother
2. Send messages between user A and user B
3. User registration

maybe:
1. Support more than 2 users
2. Lazy loading of older messages
3. Group chats

Step 1: Creating and launching a simple chat app (React Native)
1. Start a react native project
    a. Create frontend: 'create-react-native-app name_of_app'
2. Launch project on emulator
    a. npm start inside frontend directory
3. Create a simple interface for reading messages
    a. App.js
    b. add import {TextInput and Button}
    c. Create a state for text input changes
    d. Create a variable string to store input
    e. Create a variable list/array to save old messages in a list
    f. Create a function to pass input into messages state
4. Be able to send messages to yourself
    a. Render messages using List view
    b. Create a variable to get messages from state

Step 2: Creating and launching a simple Flask app
1. Start Flask project
    a. Virtualenv chat-app-backend
        i. seperates packages, independent of project
    b. Pip install flask
    c. Activate the virtual environment
        i. source bin/activate
    d. mkdir src, cd src, touch server.py
2. Create a route for User Registration
    a. Import flask
    b. Create app
        i. app.run (debug for dev mode)
    c. Create first route (can place methods as second parameter)
    d. Test on Localhost:5000
    e. Use postman to check routes
        i. Post request "localhost:5000/login"
        ii. Pass raw Json data 
            ex: {
	                "username": "rliu"
                }
        iii. Click send to test


Step 3: Storing and Reading chats from memory (Flask)
1. Create a route for incoming chats
    a. Create get route
    b. Create a new list -> chat to hold all message Id's in order
    c. Test on postman new get route
    d. Create a chat list, to store all the message ids so that we can display messages in chat in order from chat id invoked to the last one
    e. Check if ID exists, if chat is None or if there is anything stored in chat
    f. Map the ID given after /get/<las_id>, to the messages and return those messages in variable "result"
    g. Jsonify using list function to list out results
2. Create a second route for outgoing chats
    a. Create a send route
    b. Create variables username, messages, timestamp
    c. Generate an id for each message
    d. Create a message variable dict to store messages
    e. Store variables and display variables in messages and jsonify it to render
    f. Create error checks (if username or message is empty and if username or message does not exist)
3. Create a third route for chat updates
    a. Small lightweight route, that client can ping often to check if their are new messages to return TRUE if new messages exist and FALSE if no new messages
    b. Can also use for "user 1 is typing now..." or real time updates
    c. Check for last id's index and check if same length of chat, if so it means nothing new has appeared in chat, else something new has been sent
    d. Create a result dict, put default values, default is false if meets condtions == true.

Step 4: Connection React Native to our Flask backend
    a. using an HTTP client called axios
1. Indroduce and add axios - our http client
    a. npm install --save axios (axios is an HTTP client, manages request to our backend, use two callback functions, 1 for success 1 for error) (run this in react native directory)
    b. npm start
2. Setup calls for:
    a. Login
        i. App.js:
            aa. import axios
            bb. Create a view for Login button, Text Input, changes username state
            cc. Create onLogin function for Login button
            dd. onLogin - check if logged in yet
            ee. pass const isLoggedIn into state to show status of message
            ff. call to backend if not logged in: create a serverUrl variable with port 5000 and another variable to create axios object
            gg. Fix android device local host connection by going to server.py and bind host address to any address with 0.0.0.0
    b. Send Messages
    c. Read Messages
    d. Check for new messages
