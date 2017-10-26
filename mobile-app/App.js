import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import FloatLabelTextInput from 'react-native-floating-label-text-input';

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
        <Text>Name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          placeholder="Name"
        />
        <Text>Email</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({email})}
          value={this.state.email}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Text>Phone number</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({phoneNumber})}
          value={this.state.phoneNumber}
          placeholder="Phone number"
          keyboardType="numeric"
        />
        <Text>Address</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({address})}
          value={this.state.address}
          placeholder="Address"
        />
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 40
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  label: {
    
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    width: '90%'
  }
});
