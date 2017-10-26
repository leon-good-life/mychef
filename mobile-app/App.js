import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Platform } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      address: ''
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Contact Info</Text>
        <View style={styles.inputContainer}>
          <Text>Name: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            placeholder="Name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Email: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Phone number: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
            value={this.state.phoneNumber}
            placeholder="Phone number"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Address: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(address) => this.setState({address})}
            value={this.state.address}
            placeholder="Address"
          />
        </View>
        <Button
          onPress={this.handleSave}
          title="Save"
          color="#841584"
          accessibilityLabel="Save"
        />
      </View>
    );
  }
  handleSave(){

  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: 40
      }
    })
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    flex: 1
  }
});
