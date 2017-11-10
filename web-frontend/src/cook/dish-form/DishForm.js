import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { uploadDishImage } from '../../ajax';

class DishForm extends React.Component {
  constructor(props){
    super(props);
    this.handleImgSelect = this.handleImgSelect.bind(this);
    this.state = {
      dishName: this.props.dishName || '',
      dishDescription: this.props.dishDescription || '',
      dishImage: this.props.dishImage || '',
      dishPrice: this.props.dishPrice || '',
      isUploading: false,
      progress: 0
    };
  }
  render(){
    const localization = {
      en: {
        img: 'Upload an image...',
        dishName: 'Dish name',
        dishDescription: 'Dish description',
        price: 'Price',
        save: 'Save',
        cancel: 'Cancel',
        saving: 'Saving...'
      },
      he: {
        img: 'העלה תמונה...',
        dishName: 'שם המאכל',
        dishDescription: 'תיאור המאכל',
        price: 'מחיר',
        save: 'שמור',
        cancel: 'בטל',
        saving: 'שומר נתונים...'
      }
    };
    const values = localization[this.props.lang];
    const dishesPath = `/${this.props.lang}/cook/dishes/`;
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
    
    return (
      <form 
        style={{flexGrow:1, maxWidth:500, background: 'white',padding: '20px',borderRadius: '5px'}} 
        onSubmit={(e)=>this.props.handleSubmit(e, this.state.dishName, this.state.dishDescription, this.state.dishImage, this.state.dishPrice)}>
          <h1>{this.props.h1}</h1>
          {this.state.dishImage!=='' ? <img src={this.state.dishImage} alt={this.state.dishName} style={{width: '100px', float: 'left'}} /> : ''}
          <RaisedButton
                    label={values.img}
                    labelPosition="before"
                    style={{verticalAlign: 'middle'}}
                    containerElement="label"
                    labelStyle={{textTransform: 'none'}}>
              <input type="file" style={uploadInputStyle} onChange={this.handleImgSelect} />
          </RaisedButton>
          <br />
          {this.state.isUploading ? <progress min="0" max="100" value={this.state.progress}></progress> : ''}
          <TextField hintText={values.dishName} 
                    floatingLabelText={values.dishName}
                    floatingLabelFocusStyle={{color: 'black'}}
                    underlineFocusStyle={{borderColor: 'black'}}
                    fullWidth={true}
                    defaultValue={this.state.dishName}
                    onChange={(e)=>{this.setState({dishName: e.target.value})}}
                    required />
          <TextField hintText={values.dishDescription} 
                    floatingLabelText={values.dishDescription}
                    floatingLabelFocusStyle={{color: 'black'}}
                    underlineFocusStyle={{borderColor: 'black'}}
                    fullWidth={true}
                    defaultValue={this.state.dishDescription}
                    onChange={(e)=>{this.setState({dishDescription: e.target.value})}}
                    required />
          <TextField hintText={values.price} 
                    floatingLabelText={values.price}
                    floatingLabelFocusStyle={{color: 'black'}}
                    underlineFocusStyle={{borderColor: 'black'}}
                    fullWidth={true}
                    defaultValue={this.state.dishPrice}
                    onChange={(e)=>{this.setState({dishPrice: e.target.value})}}
                    required />
          <RaisedButton label={values.save} 
                        type="submit" 
                        labelStyle={{textTransform: 'none'}}
                        style={{margin: '0 5px'}} />
          <RaisedButton label={values.cancel} 
                        onClick={()=>{this.setState({show: false})}} 
                        style={{margin: '0 5px'}}
                        labelStyle={{textTransform: 'none'}}
                        containerElement={<Link to={dishesPath} />} />
        </form>);
  }
  handleImgSelect(e){
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('file', file);
    uploadDishImage(
      formData,
      this.props.idToken,
      (progress)=>{
        this.setState({
          isUploading: true,
          progress
        });
      }, 
      (imgUrl)=>{
        this.setState({dishImage: imgUrl});
      }, 
      (err)=>{
        console.log(err);
      }
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