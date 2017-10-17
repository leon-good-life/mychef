import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createDish } from '../ajax';

class DishForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      show: false,
      dish_name: '',
      dish_description: ''
    };
    this.localization = {
      en: {
        addNew: 'Add a new dish',
        underDevelopment: 'This feature is under development',
        dishName: 'Dish name',
        dishDescription: 'Dish description',
        save: 'Save',
        created: 'Dish created successfully.'
      },
      he: {
        addNew: 'הוסף מאכל חדש',
        underDevelopment: 'הפיצ׳ר הזה נמצא בפיתוח',
        dishName: 'שם המאכל',
        dishDescription: 'תיאור המאכל',
        save: 'שמור',
        created: 'המאכל נוסף בהצלחה'
      }
    };
  }
  render(){
    const values = this.localization[this.props.lang];
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
      <form style={{padding: '5px'}} onSubmit={this.handleSubmit}>
        <FlatButton label={'X'} onClick={()=>{this.setState({show: false})}} style={{float: 'right'}} />
        <TextField hintText={values.dishName} 
                   floatingLabelText={values.dishName}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   fullWidth={true}
                   defaultValue={this.state.dish_name}
                   onChange={(e)=>{this.setState({dish_name: e.target.value})}}
                   required />
        <TextField hintText={values.dishDescription} 
                   floatingLabelText={values.dishDescription}
                   floatingLabelFocusStyle={style}
                   underlineFocusStyle={underlineStyle}
                   fullWidth={true}
                   defaultValue={this.state.dish_description}
                   onChange={(e)=>{this.setState({dish_description: e.target.value})}}
                   required />
        <FlatButton label={values.save} fullWidth={true} type="submit" />
      </form>
    );
  }
  handleSubmit(e){
    e.preventDefault();
    const values = this.localization[this.props.lang];
    createDish(
      this.state.dish_name,
      this.state.dish_description,
      this.props.idToken,
      () => { alert(values.created); }
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