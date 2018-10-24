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

Step 1:
1. Start a react native project
    a. Create frontend: 'create-react-native-app name_of_app'
2. Launch project on emulator
    a. npm start inside frontend directory
3. Create a simple interface for reading messages
    a. App.js
    b. add import {TextInput and Button}
    c. Create a state for text input changes
4. Be able to send messages to yourself

Step 2:
1. Start Flask project
2. Create a route for User Registration

Step 3:
1. Create a route for incoming chats
2. Create a second route for outgoing chats
3. Create a third route for chat updates
