import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createDish } from '../ajax';

class AddNewDish extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImgSelect = this.handleImgSelect.bind(this);
    this.state = {
      dish_name: '',
      dish_description: '',
      isSaving: false,
      image: ''
    };
    this.localization = {
      en: {
        addNew: 'Add a new dish',
        img: 'Upload an image...',
        dishName: 'Dish name',
        dishDescription: 'Dish description',
        price: 'Price',
        save: 'Save',
        cancel: 'Cancel',
        saving: 'Saving...'
      },
      he: {
        addNew: 'הוסף מאכל חדש',
        img: 'העלה תמונה...',
        dishName: 'שם המאכל',
        dishDescription: 'תיאור המאכל',
        price: 'מחיר',
        save: 'שמור',
        cancel: 'בטל',
        saving: 'שומר נתונים...'
      }
    };
    this.dishesPath = `/${this.props.lang}/cook/dishes/`;
    this.values = this.localization[this.props.lang];
  }
  render(){
    const uploadInputStyle = {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0,
    };
    
    return(<form style={{flexGrow:1, maxWidth:500}} onSubmit={this.handleSubmit}>
        <h1>{this.values.addNew}</h1>
        <RaisedButton
                  label={this.values.img}
                  labelPosition="before"
                  style={{verticalAlign: 'middle'}}
                  containerElement="label"
                  labelStyle={{textTransform: 'none'}}>
            <input type="file" style={uploadInputStyle} onChange={this.handleImgSelect} />
        </RaisedButton>
        <TextField hintText={this.values.dishName} 
                   floatingLabelText={this.values.dishName}
                   floatingLabelFocusStyle={{color: 'black'}}
                   underlineFocusStyle={{borderColor: 'black'}}
                   fullWidth={true}
                   defaultValue={this.state.dish_name}
                   onChange={(e)=>{this.setState({dish_name: e.target.value})}}
                   required />
        <TextField hintText={this.values.dishDescription} 
                   floatingLabelText={this.values.dishDescription}
                   floatingLabelFocusStyle={{color: 'black'}}
                   underlineFocusStyle={{borderColor: 'black'}}
                   fullWidth={true}
                   defaultValue={this.state.dish_description}
                   onChange={(e)=>{this.setState({dish_description: e.target.value})}}
                   required />
        <br />
        <TextField hintText={this.values.price} 
                   floatingLabelText={this.values.price}
                   floatingLabelFocusStyle={{color: 'black'}}
                   underlineFocusStyle={{borderColor: 'black'}}
                   fullWidth={true}
                   required />
        <RaisedButton label={this.values.save} 
                      type="submit" 
                      labelStyle={{textTransform: 'none'}}
                      style={{margin: '0 5px'}} />
        <RaisedButton label={this.values.cancel} 
                      onClick={()=>{this.setState({show: false})}} 
                      style={{margin: '0 5px'}}
                      labelStyle={{textTransform: 'none'}}
                      containerElement={<Link to={this.dishesPath} />} />
        {this.state.isSaving ? '<span>'+this.values.saving+'</span>' : ''}
      </form>);
  }
  handleSubmit(e, history){
    e.preventDefault();
    this.setState({isSaving: true});
    const values = this.localization[this.props.lang];
    createDish(
      this.state.dish_name,
      this.state.dish_description,
      this.state.image,
      this.props.idToken,
      () => { 
        this.setState({isSaving: false});
        this.props.history.push(this.dishesPath);
      }
    );
  }
  handleImgSelect(e){
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
}

AddNewDish.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default withRouter(AddNewDish);