import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

// import text input -> to send messages to ourselves

// in order to be able to send messages, save messages, recieve messages -> we need to be able to modify the state
// input == whatever is typed into textinput tag in render, starts off as empty string
// 
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      messages: [],
    };
  }
  
  onMessageSend(){
    const { input, messages } = this.state;
    messages.push(input);
  }

  //onChangeText = gets the value when text is inputted, and passes it to input in the state
  render() {
    const { messages } = this.state;
    return (
      <View style={styles.container}>
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
