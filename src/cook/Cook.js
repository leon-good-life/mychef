import React, { Component } from 'react';
import Join from './Join';
import Dashboard from './Dashboard';

class Cook extends Component {
  render() {
    if(this.props.isLoggedIn) {
      return <Dashboard lang={this.props.lang} handleGoogleLogout={this.props.handleGoogleLogout} profile={this.props.profile} />
    } else {
      return <Join lang={this.props.lang} handleGoogleLogin={this.props.handleGoogleLogin} />;
    }
  }
}

export default Cook;
