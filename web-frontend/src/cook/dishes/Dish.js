import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import { Link } from 'react-router-dom';

const Dish = ({lang, dish}) => {
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
  return (
    <Card key={dish.id}>
      <CardMedia overlay={<CardTitle title={dish.name} subtitle={dish.description} />}>
        <img src={dish.image} alt={dish.name} />
      </CardMedia>
      <CardText>
        {values.price} {dish.price}
        <Toggle label="Avaiable to order" style={{display: 'inline-block', width: 'auto', marginLeft: 30}} labelPosition="right" />
      </CardText>
      
      <CardActions>
        <FlatButton label={values.edit} containerElement={<Link to={editDishPath} />} labelStyle={{textTransform: 'none'}} />
        <FlatButton label={values.delete} containerElement={<Link to={deleteDishPath} />} labelStyle={{textTransform: 'none'}} />
      </CardActions>
    </Card>
  )
};

export default Dish;