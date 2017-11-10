import React from 'react';
import { withRouter } from 'react-router-dom';
import { createDish } from '../../store/action-creators/dishes';
import DishForm from './DishForm';

const AddNewDish = ({lang, idToken, history, handleSubmit}) => {
  handleSubmit = (e, name, description, image, price) => {
    e.preventDefault();
    dispatch(
      createDish(
        name, 
        description, 
        image, 
        price, 
        idToken)
    ).then(() => {
      const dishesPath = `/${lang}/cook/dishes/`;
      history.push(dishesPath);
    });
  };
  localization = {
    en: {
      addNew: 'Add a new dish'
    },
    he: {
      addNew: 'הוסף מאכל חדש'
    }
  };
  values = localization[lang];
  return <DishForm lang={lang} 
                    idToken={idToken} 
                    handleSubmit={handleSubmit} 
                    h1={values.addNew} />;
};

AddNewDish = connect()(AddNewDish);

export default withRouter(AddNewDish);