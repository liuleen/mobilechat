import uuid
from datetime import datetime
from flask import (
    Flask,
    request,
    abort, 
    jsonify
)

app = Flask(__name__)

#global variable users to store usernames
users = []

#holds all message ids in order
chat = []

#create a dict to store messages
messages = dict()

@app.route("/")
def hello():
    return "hello\n"

# check if username is taken or nil

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get('username', None)
    user_taken = username in users
    if username is None or user_taken:
        abort(401)
    else:
        users.append(username)
        return jsonify({
        'status': 'ok',
        'message': 'Successfully Logged in',
        })

# 3 variables -> username, message, timestamp
# generate a unique id for the message
# map each id to a specific id (use id as the key) -> which then gets added to our dictionary above

@app.route("/send", methods=["POST"])
def send():
    username = request.json.get('username', None)
    message = request.json.get('message', None)
    timestamp = datetime.now()
    id = str(uuid.uuid4())

    if username is None or username not in users:
        abort(401)
    if message is None or message == "":
        abort(400)

    messages[id] = {
        'username': username,
        'message': message,
        'timestamp': datetime.now(),
        'id': id, 
    }
    #retrieve new message and append the message ID to chat list
    chat.append(id)
    return jsonify({
        'id' : id, 
    })

@app.route("/get", defaults={'lastId': None})
# get query params -> last_id which is the id of the last message
# once client invokes a query to get with the last index, we look for 
# the position in chat, if it exists we set it to index otherwise index remains as default (0)
# index + 1 ensures that we are getting all the messages after, excluding the one we are currently sending in
# ids_to_return returnes all the chat of that index that we called, to the end of our last chat

@app.route("/get/<last_id>", methods=["GET"])
def get(last_id):
    if chat is None or len(chat) == 0:
        return []

    index = get_next_index(last_id) if last_id else 0

    # above is an easier way to write what's below
    # if last_id: #not an empty id
    #     try:
    #         index = chat.index(last_id) + 1
    #     except ValueError as e:
    #         abort(400)

    ids_to_return = chat[index:]
    # map a function that gets our messages from get, map x to messages[x], take in ids_to_return (a list of index to end in chat)
    results = map(lambda x: messages[x], ids_to_return)
    
    #to test out message dict
    return jsonify(sorted(results, key=lambda x: x['timestamp']))

# small lightweight route, that client can ping often to check if their are new messages to return TRUE if new messages exist and FALSE if no new messages
# check for last id's index and check if same length of chat, if so it means nothing new has appeared in chat, else something new has been sent
# Create a result dict, put default values.
@app.route("/updates/<last_id>", methods=["GET"])
def update(last_id):
    index = get_next_index(last_id) if last_id else 0
    result = {
        'new_messages': False
    }
    if index < len(chat):
        result['new_messages'] = True
    return jsonify(result)

def get_next_index(last_id):
    try:
        return chat.index(last_id) + 1
    except ValueError as e:
        abort(400)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

#host 0.0.0.0 tells flask to bind to any address