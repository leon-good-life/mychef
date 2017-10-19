import React, { Component } from 'react';
import Order from './order/Order';
import Cook from './cook/Cook';
import Admin from './admin/Admin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainNav from './nav/MainNav';
import { createUser } from './ajax';

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
    const cookComponentTemplate = lang => <Cook lang={lang} handleGoogleLogin={this.handleGoogleLogin} handleGoogleLogout={this.handleGoogleLogout} isLoggedIn={this.state.isLoggedIn} profile={this.state.profile} idToken={this.state.idToken} />;
    const cookComponent = ({ match }) => cookComponentTemplate(match.params.lang);
    const defaultComponent = () => <div><MainNav lang="en" />{cookComponentTemplate('en')}</div>;
    const navComponent = ({ match }) => <MainNav lang={match.params.lang} />;
    const adminComponent = () => <Admin handleGoogleLogin={this.handleGoogleLogin} handleGoogleLogout={this.handleGoogleLogout} isLoggedIn={this.state.isLoggedIn} profile={this.state.profile} idToken={this.state.idToken} />;

    return (
      <BrowserRouter>
        <div>
          <Route path="/:lang/" component={navComponent} />
          <Switch>
            <Route path="/:lang/order/" component={orderComponet} />
            <Route path="/:lang/cook/" component={cookComponent} />
            <Route path="/:lang/admin/" component={adminComponent} />
            <Route path="/" component={defaultComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  handleGoogleLogin(googleUser) {
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;
    createUser(idToken);
    this.setState({
      isLoggedIn: true,
      profile: {
        id: profile.getId(),
        name:  profile.getName(),
        email: profile.getEmail(),
        imgUrl: profile.getImageUrl()
      },
      idToken
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
