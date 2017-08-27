import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class JoinForm extends React.Component {
  render() {
    const style = {
      color: 'black'
    };
    const underlineStyle = {
      borderColor: 'black'
    };
    return (
      <form style={{flexGrow:1, maxWidth:500}}>
        <TextField hintText={this.props.values.fullName} 
                   floatingLabelText={this.props.values.fullName}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   fullWidth={true} />
        <br />
        <TextField hintText={this.props.values.email} 
                   floatingLabelText={this.props.values.email}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   fullWidth={true} />
        <br />
        <TextField hintText={this.props.values.telephone} 
                   floatingLabelText={this.props.values.telephone}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   fullWidth={true} />
        <br />
        <TextField hintText={this.props.values.address} 
                   floatingLabelText={this.props.values.address}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   fullWidth={true} />
        <br />
        <div className="g-recaptcha" data-sitekey="6LeKUi4UAAAAAIcu0YwyHHd4ZEI9TIz5pAduEyGL"></div>
        <FlatButton label={this.props.values.join} fullWidth={true} />
        <br />
      </form>
    );
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
}

JoinForm.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
    
export default JoinForm;