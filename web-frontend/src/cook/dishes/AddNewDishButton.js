import React from 'react';
import { Link } from 'react-router-dom';

const AddNewDishButton = ({lang}) => {
  const localization = {
    en: {
      addNew: 'Add a new dish'
    },
    he: {
      addNew: 'הוסף מאכל חדש'
    }
  };
  const values = localization[lang];
  const addNewDishPath = `/${lang}/cook/add-new-dish/`;
  return (
    <div className="add-new-dish">
      <Link to={addNewDishPath} >
        <div className="add-new-dish-action">+ {values.addNew}</div>
      </Link>
    </div>
  );
};

export default AddNewDishButton;