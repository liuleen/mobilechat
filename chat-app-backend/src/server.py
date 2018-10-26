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

    return jsonify(messages)

# get query params -> last_id which is the id of the last message
@app.route("/get/<last_id", methods=["GET"])
def get(last_id):
    username = request.json


if __name__ == '__main__':
    app.run(debug=True)