import React, { Component } from 'react';
import Join from './Join';
import Dashboard from './Dashboard';

class Cook extends Component {
  constructor(props){
    super(props);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleGoogleLogout = this.handleGoogleLogout.bind(this);
    this.state = {
      isLoggedIn: false
    };
  }
  render() {
    if(this.state.isLoggedIn) {
      return <Dashboard lang={this.props.lang} handleGoogleLogout={this.handleGoogleLogout} />
    } else {
      return <Join lang={this.props.lang} handleGoogleLogin={this.handleGoogleLogin} />;
    }
  }
  handleGoogleLogin(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', window.location.origin + '/tokensignin');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('idtoken=' + id_token);
    this.setState({isLoggedIn: true});
  }
  handleGoogleLogout(){
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    this.setState({isLoggedIn: false});
  }
}

export default Cook;
