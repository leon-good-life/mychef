import React, { Component } from 'react';
import { adminGetUsers, adminVerifyUser } from '../ajax';
import GoogleLogin from 'react-google-login';
import './admin.css';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Toggle from 'material-ui/Toggle';

class Admin extends Component {
  constructor(props){
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      loading: true,
      users: []
    };
  }
  render() {
    if(!this.props.isLoggedIn) {
      return (
        <GoogleLogin
          clientId="377161177382-bqradjn2qablmfso34dcnkrtd31gs25m.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.props.handleGoogleLogin}
          onFailure={this.props.handleGoogleLogin}
          isSignedIn={true}
          className="google-login" />
      );
    }
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    const users = this.state.users.map((user)=>{
      return (
        <tr key={user.id}>
          <td>{user.google_user_email}</td>
          <td><img src={user.google_user_picture} alt="profile picture" /></td>
          <td>{user.google_user_name}</td>
          <td>{user.user_filled_name}</td>
          <td>{user.user_filled_email}</td>
          <td>{user.user_filled_telephone}</td>
          <td>{user.user_filled_address}</td>
          <td><Toggle toggled={user.verified} 
                      onToggle={(e, isInputChecked) => {this.handleToggle(user.id, isInputChecked);}} 
                      label="Verify user" /></td>
        </tr>
      );
    });
    return (
      <table>
        <tr>
          <th>Email<br />(Google Account)</th>
          <th>Profile Picture<br />(Google Account)</th>
          <th>User Name<br />(Google Account)</th>
          <th>Name</th>
          <th>Email</th>
          <th>Telephone</th>
          <th>Address</th>
          <th>Verify user</th>
        </tr>
        {users}
      </table>
    );
  }
  componentDidMount(){
    if(this.props.isLoggedIn) {
      adminGetUsers(this.props.idToken, (users) => {
        this.setState({
          users,
          loading: false
        });
      });
    }
  }
  handleToggle(userId, isInputChecked){
    console.log('userId', userId);
    if(isInputChecked){
      adminVerifyUser(userId, this.props.idToken, ()=>{
        adminGetUsers(this.props.idToken, (users) => {
          this.setState({
            users,
            loading: false
          });
        });
      });
    }
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }
}

Admin.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Admin;