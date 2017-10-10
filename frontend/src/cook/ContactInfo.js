import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { updateUser, getUser } from '../ajax';

class ContactInfo extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      borderColor: 'darkgray'
    };
    return (
      <form style={{flexGrow:1, maxWidth:500}} onSubmit={this.handleSubmit}>
        <TextField hintText={values.fullName} 
                   floatingLabelText={values.fullName}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   defaultValue={this.state.data.user_filled_name || this.state.data.google_user_name}
                   onChange={(e)=>{this.handleChange('user_filled_name', e.target.value)}}
                   fullWidth={true}
                   required />
        <br />
        <TextField hintText={values.email} 
                   floatingLabelText={values.email}
                   type="email"
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   defaultValue={this.state.data.user_filled_email || this.state.data.google_user_email}
                   onChange={(e)=>{this.handleChange('user_filled_email', e.target.value)}}
                   fullWidth={true}
                   required />
        <br />
        <TextField hintText={values.telephone} 
                   floatingLabelText={values.telephone}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   defaultValue={this.state.data.user_filled_telephone}
                   onChange={(e)=>{this.handleChange('user_filled_telephone', e.target.value)}}
                   fullWidth={true}
                   required />
        <br />
        <TextField hintText={values.address} 
                   floatingLabelText={values.address}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   defaultValue={this.state.data.user_filled_address}
                   onChange={(e)=>{this.handleChange('user_filled_address', e.target.value)}}
                   fullWidth={true}
                   required />
        <br />
        <FlatButton label={values.update} fullWidth={true} type="submit" />
        <br />
      </form>
    );
  }
  componentDidMount(){
    getUser(
      (data) => {
        this.setState({
          data,
          loading: false
        });
      },
      this.props.idToken
    );
  }
  handleSubmit(e){
    e.preventDefault();
    updateUser(
      this.state.data.user_filled_name,
      this.state.data.user_filled_email,
      this.state.data.user_filled_telephone,
      this.state.data.user_filled_address,
      this.props.idToken
    );
  }
  handleChange(name, value){
    this.setState((prevState)=>{
      let newData = JSON.parse(JSON.stringify(prevState.data)); // clone
      newData[name] = value;
      return {
        data: newData
      }
    });
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
}

ContactInfo.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
    
export default ContactInfo;