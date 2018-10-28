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
    d. Create a variable string to store input
    e. Create a variable list/array to save old messages in a list
    f. Create a function to pass input into messages state
4. Be able to send messages to yourself
    a. Render messages using List view
    b. Create a variable to get messages from state

Step 2:
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


Step 3:
1. Create a route for incoming chats
    a. Create get route
    b. Create a new list -> chat to hold all message Id's in order
    c. Test on postman new get route
2. Create a second route for outgoing chats
    a. Create a send route
    b. Create variables username, messages, timestamp
    c. Generate an id for each message
    d. Create a message variable dict to store messages
    e. Store variables and display variables in messages and jsonify it to render
    f. Create error checks (if username or message is empty and if username or message does not exist)
3. Create a third route for chat updates
    a. small lightweight route, that client can ping often to check if their are new messages to return TRUE if new messages exist and FALSE if no new messages



Problem:
- protests are disorganized.
- events are all Facebook is good for.
- Campaigns lack ways to connect with supporters.
- Group fundraising is unreliable for small events.

Idea:
- Create an app to help people organize groups effectively.

Applications:
- I am going to a march I heard about, but I don't know where to go because I am late.
- I am at a protest and can't hear the organizers or do not know the agenda.
- I am at a protest and don't know what to cheer, when or how.
- I am an organizer and do not know how many people came to my event.
- I am an organizer and want to tell everyone to disperse, be quiet or be loud.
- I am an organizer and want to fundraise.
- I went to a protest, loved the cause, but do not know how to help.
- I went to a protest and want to go to more, but do not know when they are.
- I am an organizer and want to reach out to people who came to a previous Rally.
- Small Rallys: Dinner with friends, parties, board game nights. (I want to host a dinner but don't want to venmo everyone a $5 request; Rally collects and sends to you).
- Campaigns: Follow candidates after you went to their Rally. Get news alerts. Donate (bundling). Candidates reach supporters through new, alert-based mediums. (Round-up for Beto month?)

Problems:
- Hate groups (banned)
- Data privacy, what if police wants to know who went to a Rally? Hacks?
- Age restrictions?
- Adoption?
- Large Rallys, people lose internet. How do you get around that?
- Regulatory challenges.

Business plan:
- Pilot app in 2018, maybe offer to Betos campaign as test case?
- Bring to market in 2019, for protests and 2020 campaigns
- Once adopted politically, double down on non political use cases. Business conferences? Small events? Concerts?

Competition:
- eventbrite
- Facebook
- conference apps
- political data software
- other event/concert/campaign apps?



So, I think for Twilio, it would be good to do the back end in Flask. Just because a lot of our stuff is in Python
And by doing the React Native stuff, you’ll already have proved you can do JS just fine
Also, it sounds like you’re building this thing with two users in mind? The protester and the organizer.

So as the protester I can:
- See protests happening near me
- Subscribe to protests/events I’m interested in
- See where to meet up or rally
- Receive messages with updates during the event
- Receive notifications about events I’m subscribed too

As the organizer I can:
- Create an event
- Update the events newfeed with info, leading up to the event
- set a location to rally during the event
- send messages to active protesters with important information


If you can build a service that does these things, I think it'll be a good start:
- Know if a user is an organizer(admin) or protestor(user)
- Allow admins to create events
- Allow admins to post messages to an event
- Allow user to 'join' an event
- Allow user to see messages on an event
The service you build should be an API that can serve these functions. If you have that, you can build a simple React front end around it
