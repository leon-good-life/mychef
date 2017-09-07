import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class ßContactInfo extends React.Component {
  render() {
    const localization = {
      en: {
        fullName: 'Full Name',
        email: 'Email',
        telephone: 'Telephone',
        address: 'Address',
        join: 'Join'
      },
      he: {
        fullName: 'שם מלא',
        email: 'דואר אלקטרוני',
        telephone: 'טלפון',
        address: 'כתובת',
        join: 'הצטרף'
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
                   fullWidth={true} />
        <br />
        <TextField hintText={values.email} 
                   floatingLabelText={values.email}
                   type="email"
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
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
        <FlatButton label={values.join} fullWidth={true} />
        <br />
      </form>
    );
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
}

ContactInfo.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
    
export default ContactInfo;