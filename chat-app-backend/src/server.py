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
        'timestamp': timestamp,
        'id': id, 
    }
    #retrieve new message and append the message ID to chat list
    chat.append(id)
    return jsonify(messages)

# get query params -> last_id which is the id of the last message
# once client invokes a query to get with the last index, we look for 
# the position in chat, if it exists we set it to index otherwise index remains as default (0)
@app.route("/get/<last_id>", methods=["GET"])
def get(last_id):
    if chat is None or len(chat) == 0:
        return []

    index = 0
    if last_id: #not an empty id
        try:
            index = chat.index(last_id)
        except ValueError as e:
            abort(400)
    ids_to_return = chat[index: ]
    # map a function that gets our messages from get, map x to messages[x], take in ids_to_return (a list of index to end in chat)
    results = map(lambda x : messages[x, ids_to_return])
    return jsonify(list(results))


if __name__ == '__main__':
    app.run(debug=True)