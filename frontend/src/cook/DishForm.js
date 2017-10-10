import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class DishForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      show: false
    };
  }
  render(){
    const localization = {
      en: {
        addNew: 'Add a new dish',
        underDevelopment: 'This feature is under development',
        dishName: 'Dish name',
        dishDescription: 'Dish description',
        save: 'Save'
      },
      he: {
        addNew: 'הוסף מאכל חדש',
        underDevelopment: 'הפיצ׳ר הזה נמצא בפיתוח',
        dishName: 'שם המאכל',
        dishDescription: 'תיאור המאכל',
        save: 'שמור'
      }
    };
    const values = localization[this.props.lang];
    if (this.state.show === false) {
      return (
        <div onClick={()=>{this.setState({show: true})}} className="add-new-dish-action">+ {values.addNew}</div>
      );
    }
    const style = {
      color: 'black'
    };
    const underlineStyle = {
      borderColor: 'black'
    };
    return (
      <div style={{padding: '5px'}}>
        <FlatButton label={'X'} onClick={()=>{this.setState({show: false})}} style={{float: 'right'}} />
        <TextField hintText={values.dishName} 
                   floatingLabelText={values.dishName}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   fullWidth={true}
                   required />
        <TextField hintText={values.dishDescription} 
                   floatingLabelText={values.dishDescription}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   fullWidth={true}
                   required />
        <FlatButton label={values.save} fullWidth={true}  onClick={()=>{alert(values.underDevelopment)}} />
      </div>
    );
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
}

DishForm.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default DishForm;  