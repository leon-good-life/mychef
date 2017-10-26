import React from 'react';
import { withRouter } from 'react-router-dom';
import { createDish } from '../../ajax';
import DishForm from './DishForm';

class AddNewDish extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.localization = {
      en: {
        addNew: 'Add a new dish'
      },
      he: {
        addNew: 'הוסף מאכל חדש'
      }
    };
    this.values = this.localization[this.props.lang];
  }
  render(){
    return <DishForm lang={this.props.lang} 
                     idToken={this.props.idToken} 
                     handleSubmit={this.handleSubmit} 
                     h1={this.values.addNew} />;
  }
  handleSubmit(e, name, description, image, price){
    e.preventDefault();
    createDish(name, description, image, price,
      this.props.idToken,
      () => { 
        const dishesPath = `/${this.props.lang}/cook/dishes/`;
        this.props.history.push(dishesPath);
      }
    );
  }
}

export default withRouter(AddNewDish);