import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import queryString from 'query-string';

class ContactInfo extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loading: true,
      error: false,
      data: null
    };
  }
  render() {
    const localization = {
      en: {
        fullName: 'Full Name',
        email: 'Email',
        telephone: 'Telephone',
        address: 'Address',
        update: 'Update',
        underDevelopment: 'This feature is under development',
        loading: 'Loading...'
      },
      he: {
        fullName: 'שם מלא',
        email: 'דואר אלקטרוני',
        telephone: 'טלפון',
        address: 'כתובת',
        update: 'עדכן',
        underDevelopment: 'הפיצ׳ר הזה נמצא בפיתוח',
        loading: 'טוען...'
      }
    };
    const values = localization[this.props.lang];
    if(this.state.loading === true) {
      return <div className="loading">{values.loading}</div>;
    }
    const style = {
      color: 'black'
    };
    const underlineStyle = {
      borderColor: 'black'
    };
    return (
      <form style={{flexGrow:1, maxWidth:500}} onSubmit={this.handleSubmit}>
        <TextField hintText={values.fullName} 
                   floatingLabelText={values.fullName}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   defaultValue={this.state.data.user_filled_name || this.state.data.google_user_name}
                   onChange={(e)=>{this.state.data.user_filled_name = e.target.value}}
                   fullWidth={true}
                   required />
        <br />
        <TextField hintText={values.email} 
                   floatingLabelText={values.email}
                   type="email"
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   defaultValue={this.state.data.user_filled_email || this.state.data.google_user_email}
                   onChange={(e)=>{this.state.data.user_filled_email = e.target.value}}
                   fullWidth={true}
                   required />
        <br />
        <TextField hintText={values.telephone} 
                   floatingLabelText={values.telephone}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   defaultValue={this.state.data.user_filled_telephone}
                   onChange={(e)=>{this.state.data.user_filled_telephone = e.target.value}}
                   fullWidth={true}
                   required />
        <br />
        <TextField hintText={values.address} 
                   floatingLabelText={values.address}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   defaultValue={this.state.data.user_filled_address}
                   onChange={(e)=>{this.state.data.user_filled_address = e.target.value}}
                   fullWidth={true}
                   required />
        <br />
        <FlatButton label={values.update} fullWidth={true} type="submit" />
        <br />
      </form>
    );
  }
  componentDidMount(){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', window.location.origin + '/contact-info/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      this.setState({
        data, // TODO
        loading: false
      });
    };
    xhr.send('idtoken=' + this.props.idToken);
  }
  handleSubmit(e){
    e.preventDefault();
    const data = {
      name: this.state.user_filled_name,
      email: this.state.user_filled_email,
      telephone: this.state.user_filled_telephone,
      address: this.state.user_filled_address,
      idtoken: this.props.idToken
    };
    const dataToSend = queryString.stringify(data);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', window.location.origin + '/update-user/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      console.log(xhr.responseText);
      alert('Contact details updated successfully.');
    };
    xhr.send(dataToSend);
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
}

ContactInfo.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
    
export default ContactInfo;