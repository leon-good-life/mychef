import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DishForm from './DishForm';
import './Dishes.css';
import { getDishes, deleteDish } from '../ajax';

class Dishes extends React.Component {
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateDishes = this.updateDishes.bind(this);
    this.state = {
      loading: true,
      data: null
    };
    this.localization = {
      en: {
        delete: 'Delete',
        loading: 'Loading...'
      },
      he: {
        delete: 'מחק',
        loading: 'טוען...'
      }
    };
    this.values = this.localization[this.props.lang];
  }
  render(){
    let dishes = '';
    if (this.state.loading) {
      dishes = <div>{this.values.loading}</div>;
    } else {
      dishes = this.state.data.map((dish)=>(
        <div key={dish.id}>
          <h1>{dish.name}</h1>
          <div>{dish.description}</div>
          <FlatButton 
            label={this.values.delete} 
            fullWidth={true} 
            labelStyle={{textTransform: 'none'}} 
            onClick={(e)=>{this.handleDelete(dish.id)}} />
        </div>
      ));
    }
    return (
      <div className="dishes">
        {dishes}
        <div className="add-new-dish">
          <DishForm lang={this.props.lang} idToken={this.props.idToken} />
        </div>
      </div>
    );
  }
  componentDidMount(){
    this.updateDishes();
  }
  handleDelete(id){
    this.setState({
      loading: true,
      data: null
    });
    deleteDish(
      id,
      this.props.idToken,
      () => {
        this.updateDishes();
      }
    );
  }
  updateDishes(){
    getDishes(
      this.props.idToken,
      (data) => {
        this.setState({
          loading: false,
          data
        });
      }
    );
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
}

Dishes.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Dishes;