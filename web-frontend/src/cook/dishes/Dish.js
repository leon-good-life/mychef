import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import { Link } from 'react-router-dom';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

const Dish = ({lang, dish, toggleAvailability}) => {
  const localization = {
    en: {
      delete: 'Delete',
      edit: 'Edit',
      price: 'Price:'
    },
    he: {
      delete: 'מחק',
      edit: 'ערוך',
      price: 'מחיר:'
    }
  };
  const values = localization[lang];
  const editDishPath = `/${lang}/cook/edit-dish/${dish.id}/`;
  const deleteDishPath = `/${lang}/cook/confirm-delete/${dish.id}/`;
  const onToggle = (e, isToggled) => {
    toggleAvailability(dish.id, isToggled);
  };
  return (
    <Card key={dish.id}>
      <CardMedia overlay={<CardTitle title={dish.name} subtitle={dish.description} />}>
        <img src={dish.image} alt={dish.name} />
      </CardMedia>
      <CardText>
        {values.price} {dish.price}
        <Toggle label="Avaiable to order" 
                style={{display: 'inline-block', width: 'auto', marginLeft: 30}} 
                labelPosition="right" 
                toggled={dish.quantity > 0}
                onToggle={onToggle} />
      </CardText>
      <CardActions>
        <RaisedButton label={values.edit} containerElement={<Link to={editDishPath} />} labelStyle={{textTransform: 'none'}} icon={<EditIcon />} />
        <RaisedButton label={values.delete} containerElement={<Link to={deleteDishPath} />} labelStyle={{textTransform: 'none'}} icon={<DeleteIcon />} />
      </CardActions>
    </Card>
  )
};

export default Dish;