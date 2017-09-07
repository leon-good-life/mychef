import React from 'react';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const localization = {
      en: {
        logout: 'Sign Out'
      },
      he: {
        logout: 'התנתק'
      }
    };
    const values = localization[this.props.lang];
    console.log(this.props.handleGoogleLogout);
    return (
      <div>
        <button onClick={this.props.handleGoogleLogout}>{values.logout}</button>
      </div>
    );
  }
}

export default Dashboard;