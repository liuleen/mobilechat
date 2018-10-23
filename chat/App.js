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
