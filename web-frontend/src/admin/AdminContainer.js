import React from 'react';
import { connect } from 'react-redux';
import { adminFetchUsers, adminVerifyUser } from '../store/action-creators/admin';
import Loading from './Loading';
import Admin from './Admin';
import Login from './Login';
import './admin.css';

class AdminContainer extends React.Component {
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
      return <Login handleGoogleLogin={this.props.handleGoogleLogin} />
    }
    if (this.state.loading) {
      return <Loading />;
    }
    return <Admin users={this.state.users} handleToggle={this.handleToggle} />;
  }
  componentDidMount(){
    if(this.props.isLoggedIn) {
      this.props.dispatch(adminFetchUsers(this.props.idToken))
        .then((users) => {
          this.setState({
            users: users.users,
            loading: false
          });
      });
    }
  }
  handleToggle(userId, isInputChecked){
    if(isInputChecked){
      this.props.dispatch(adminVerifyUser(userId, this.props.idToken)).then(()=>{
        this.props.dispatch(adminFetchUsers(this.props.idToken)).then((users) => {
          this.setState({
            users: users.users,
            loading: false
          });
        });
      });
    }
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    loading: state.admin.isProcessingRequest,
    users: state.admin.adminUsers
  };
};

AdminContainer = connect(mapStateToProps)(AdminContainer);

export default AdminContainer;