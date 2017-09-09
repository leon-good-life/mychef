import React, { Component } from 'react';
import Order from './order/Order';
import Cook from './cook/Cook';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainNav from './nav/MainNav';

class App extends Component {
  constructor(props){
    super(props);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleGoogleLogout = this.handleGoogleLogout.bind(this);
    this.state = {
      isLoggedIn: false,
      profile: null
    };
  }
  render() {
    const orderComponet = ({ match }) => <Order lang={match.params.lang} />;
    const cookComponentTemplate = lang => <Cook lang={lang} handleGoogleLogin={this.handleGoogleLogin} handleGoogleLogout={this.handleGoogleLogout} isLoggedIn={this.state.isLoggedIn} profile={this.state.profile} idToken={this.state.id_token} />;
    const cookComponent = ({ match }) => cookComponentTemplate(match.params.lang);
    const defaultComponent = () => <div><MainNav lang="en" />{cookComponentTemplate('en')}</div>;
    const navComponent = ({ match }) => <MainNav lang={match.params.lang} />;

    return (
      <BrowserRouter>
        <div>
          <Route path="/:lang/" component={navComponent} />
          <Switch>
            <Route path="/:lang/order/" component={orderComponet} />
            <Route path="/:lang/cook/" component={cookComponent} />
            <Route path="/" component={defaultComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  handleGoogleLogin(googleUser) {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', window.location.origin + '/tokensignin');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('idtoken=' + id_token);
    this.setState({
      isLoggedIn: true,
      profile: {
        id: profile.getId(),
        name:  profile.getName(),
        email: profile.getEmail(),
        imgUrl: profile.getImageUrl()
      },
      id_token
    });
  }
  handleGoogleLogout(){
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    this.setState({
      isLoggedIn: false,
      profile: null
    });
  }
}

export default App;
