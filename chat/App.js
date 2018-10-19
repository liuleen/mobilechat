import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

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

  render() {
    return (
      <View style={styles.container}>
        <Text>What it do, {this.state.input}</Text>
        <TextInput 
          onChangeText={(val) => this.setState({input: val})}
        />
        <Button title='What is Bracking' onPress={() => {}} />
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
