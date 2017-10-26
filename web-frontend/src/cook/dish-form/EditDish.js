import React from 'react';
import { withRouter } from 'react-router-dom';
import { updateDish, getDish } from '../../ajax';
import DishForm from './DishForm';

class EditDish extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isLoading: true
    };
  }
  render(){
    const localization = {
      en: {
        loading: 'Loading...',
        update: 'Update dish'
      },
      he: {
        loading: 'טוען...',
        update: 'עדכן מאכל'
      }
    };
    const values = localization[this.props.lang];
    if (this.state.isLoading) {
      return <h1>{values.loading}</h1>;
    }
    return (
      <DishForm lang={this.props.lang} 
                idToken={this.props.idToken}
                handleSubmit={this.handleSubmit} 
                h1={values.update} 
                dishName={this.state.dishName} 
                dishDescription={this.state.dishDescription} 
                dishImage={this.state.dishImage} 
                dishPrice={this.state.dishPrice} />
    );
  }
  componentDidMount(){
    getDish(
      this.props.match.params.dishId,
      this.props.idToken
    ).then(dish => {
      const [dishName, dishDescription, dishImage, dishPrice] = [dish.name, dish.description, dish.image, dish.price];
      this.setState({dishName, dishDescription, dishImage, dishPrice, isLoading: false});
    });
  }
  handleSubmit(e, name, description, image, price){
    e.preventDefault();
    updateDish(
      this.props.match.params.dishId,
      name, description, image, price,
      this.props.idToken,
      () => { 
        const dishesPath = `/${this.props.lang}/cook/dishes/`;
        this.props.history.push(dishesPath);
      }
    );
  }
}

export default withRouter(EditDish);