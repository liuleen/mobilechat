import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';
// import text input -> to send messages to ourselves

// in order to be able to send messages, save messages, recieve messages -> we need to be able to modify the state
// input == whatever is typed into textinput tag in render, starts off as empty string
// messages == store the list of messages that we have

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      messages: [],
      username: '',
    };
  }
  
  //function to take our current input from the state, and pass input into message list
  onMessageSend(){
    const { input, messages } = this.state;
    messages.push(input);
  }

  //function to login
  onLogin() {
    const { isLoggedIn } = this.state;
    if (!isLoggedIn){

    }
  }

  //onChangeText = gets the value when text is inputted, and passes it to input in the state
  //flatlist = pass our data to display the list (messages), renderitem = render messages
  //create a variable const {messages} to get the message in our state to pass into flat list
  render() {
    const { messages, isLoggedIn } = this.state;
    return (
      <View style={styles.container}>
        {/* create a way for users to sign in */}
        <View>
          <Text>Login</Text>
          <TextInput
            onChangeText={(val) => this.setState({username: val})}
          />
          <Button title='Login' onPress={() => this.onLogin()} />
          <Text></Text>
        </View>
        <FlatList
          data={messages}
          renderItem={({item}) => <Text>{item}</Text>}
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
