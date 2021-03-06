import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';
import tail from 'lodash/tail';
// import text input -> to send messages to ourselves

// in order to be able to send messages, save messages, recieve messages -> we need to be able to modify the state
// input == whatever is typed into textinput tag in render, starts off as empty string
// messages == store the list of messages that we have

const serverUrl = 'http://64.62.224.29:5000';
const http = axios.create({
  baseURL: serverUrl,
});

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      messages: [],
      // username: '',
      // isLoggedIn: false,
    };
    // this.onLogin = this.onLogin.bind(this);
  }

  //function to login
  //if post successful, change state to true, else error
  onLogin() {
    const { isLoggedIn, username } = this.state;
    if (!isLoggedIn) {
      http.post('/login', {username})
      .then(() => this.onLoginSuccess())
      .catch((err) => console.log(err))
    }
  }

  onLoginSuccess() {
    this.setState({isLoggedIn: true});
    this.getMessages();
  }

  addMessage(data){
    const { messages } = this.state;
    const { id, message } = data;
    messages.push(data);
    this.setState({
      lastUpdated: new Date(),
      lastId: id,
    });
  }

  addMessageList(list){
    if (!list || list.length == 0){
      return;
    }
    const { messages } = this.state;
    this.setState({
      messages : [...messages, ...list],
      lastUpdated: new Date(),
      lastId: tail(list).id,
    })
  }

  getMessages() {
    const { lastId } = this.state;
    http.get(lastId) ? (`/get/${lastId}` : '/get')
    .then((respnse) => this.addMessageList(response.data))
    .catch((err) => console.log(err))
  }

  //function to take our current input from the state, and pass input into message list
  onMessageSend(){
    const { input, username } = this.state;
    http.post('/send', {
      username,
      message: input,
    })
    .then((response) => this.addMessage({
      message: input, 
      id: response.data.id,
    }));
  }


  //onChangeText = gets the value when text is inputted, and passes it to input in the state
  //flatlist = pass our data to display the list (messages), renderitem = render messages
  //create a variable const {messages} to get the message in our state to pass into flat list
  render() {
    const { messages, isLoggedIn, lastUpdated } = this.state;
    return (
      <View style={styles.container}>
        {/* create a way for users to sign in */}
        <View>
          <Text>Login</Text>
          <TextInput
            onChangeText={(val) => this.setState({username: val})}
            //setting username and passing it to onLogin
          />
          <Button title='Login' onPress={() => this.onLogin()} />
          <Text>Online Status: {isLoggedIn ? 'Online' : 'Offline'}</Text>
        </View>
        <FlatList
          data={messages}
          renderItem={({item}) => <Text>{item.message}</Text>}
          extraData={lastUpdated}
        />
        <TextInput
          onChangeText={(val) => this.setState({input: val})}
        />
        <Button title='Send it' onPress={() => this.onMessageSend()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
