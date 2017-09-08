import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class ContactInfo extends React.Component {
  render() {
    const localization = {
      en: {
        fullName: 'Full Name',
        email: 'Email',
        telephone: 'Telephone',
        address: 'Address',
        update: 'Update',
        underDevelopment: 'This feature is under development'
      },
      he: {
        fullName: 'שם מלא',
        email: 'דואר אלקטרוני',
        telephone: 'טלפון',
        address: 'כתובת',
        update: 'עדכן',
        underDevelopment: 'הפיצ׳ר הזה נמצא בפיתוח'
      }
    };
    const values = localization[this.props.lang];
    const style = {
      color: 'black'
    };
    const underlineStyle = {
      borderColor: 'black'
    };
    return (
      <form style={{flexGrow:1, maxWidth:500}}>
        <TextField hintText={values.fullName} 
                   floatingLabelText={values.fullName}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   defaultValue={this.props.profile.name}
                   fullWidth={true} />
        <br />
        <TextField hintText={values.email} 
                   floatingLabelText={values.email}
                   type="email"
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   defaultValue={this.props.profile.email}
                   fullWidth={true} />
        <br />
        <TextField hintText={values.telephone} 
                   floatingLabelText={values.telephone}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   fullWidth={true} />
        <br />
        <TextField hintText={values.address} 
                   floatingLabelText={values.address}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   fullWidth={true} />
        <br />
        <FlatButton label={values.update} fullWidth={true} onClick={()=>alert(values.underDevelopment)} />
        <br />
      </form>
    );
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
}

ContactInfo.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
    
export default ContactInfo;