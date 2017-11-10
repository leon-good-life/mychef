import React from 'react';
import { withRouter } from 'react-router-dom';
import { updateDish } from '../../store/action-creators';
import DishForm from './DishForm';

const EditDish = ({lang, match, dishes, dispatch, idToken, history}) => {
  const localization = {
    en: {
      update: 'Update dish'
    },
    he: {
      update: 'עדכן מאכל'
    }
  };
  const values = localization[lang];
  const dish = dishes.find(dish=>dish.id===match.params.dishId);
  const handleSubmit = (e, name, description, image, price) => {
    e.preventDefault();
    dispatch(updateDish(
      match.params.dishId,
      name, description, image, price,
      idToken
    )).then(() => { 
      const dishesPath = `/${lang}/cook/dishes/`;
      history.push(dishesPath);
    });
  };
  return (
    <DishForm lang={lang} 
              idToken={idToken}
              handleSubmit={handleSubmit} 
              h1={values.update} 
              dishName={dish.name} 
              dishDescription={dish.description} 
              dishImage={dish.image} 
              dishPrice={dish.price} />
  );
};

const mapStateToProps = state => {
  return {
    dishes: state.dishes.dishes
  };
};

EditDish = connect(mapStateToProps)(EditDish);

export default withRouter(EditDish);