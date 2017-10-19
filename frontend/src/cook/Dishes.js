import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
        edit: 'Edit',
        addNew: 'Add a new dish',
        loading: 'Loading...',
        price: 'Price:'
      },
      he: {
        delete: 'מחק',
        edit: 'ערוך',
        addNew: 'הוסף מאכל חדש',
        loading: 'טוען...',
        price: 'מחיר:'
      }
    };
    this.values = this.localization[this.props.lang];
  }
  render(){
    const dishComponent = (dish) => {
      const editDishPath = `/${this.props.lang}/cook/edit-dish/${dish.id}/`;
      return (
        <Card key={dish.id}>
          <CardMedia overlay={<CardTitle title={dish.name} subtitle={dish.description} />}>
            <img src={dish.image} alt={dish.name} />
          </CardMedia>
          <CardText>{this.values.price} {dish.price}</CardText>
          <CardActions>
            <FlatButton label={this.values.edit} containerElement={<Link to={editDishPath} />} labelStyle={{textTransform: 'none'}} />
            <FlatButton label={this.values.delete} onClick={(e)=>{this.handleDelete(dish.id)}} labelStyle={{textTransform: 'none', float: 'right'}} />
          </CardActions>
        </Card>
      )
    };

    if (this.state.loading) {
      return <div>{this.values.loading}</div>;
    }
    const addNewDishPath = `/${this.props.lang}/cook/add-new-dish/`;
    return (
      <div className="dishes">
        {this.state.data.map(dishComponent)}
        <div className="add-new-dish">
          <Link to={addNewDishPath} >
            <div className="add-new-dish-action">+ {this.values.addNew}</div>
          </Link>
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