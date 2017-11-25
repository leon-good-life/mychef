import React from 'react'
import { Link } from 'react-router-dom'
import ConfirmDelete from './ConfirmDelete'
import AvailabilityDetails from './AvailabilityDetails'
import translateComponent from '../../../utils/translateComponent'
import * as path from '../../../path'
import Dish from './Dish'

const translations = {
  en: {
    add: '+ Add new dish'
  },
  he: {
    add: '+ הוסף מנה חדשה'
  }
}

let Dishes = ({
  dishes,
  translated,
  lang,
  onDelete,
  onDeleteConfirm,
  onToggleAvailability,
  onAvailable
}) => {
  return (
    <div>
      <div className="card-columns">
        <div className="card">
          <Link
            to={path.cook_dishes_add(lang)}
            className="btn btn-success w-100"
          >
            {translated.add}
          </Link>
        </div>
        {dishes.map(dish => (
          <Dish
            dish={dish}
            key={dish.id}
            lang={lang}
            onDelete={onDelete}
            onToggleAvailability={onToggleAvailability}
          />
        ))}
      </div>
      <ConfirmDelete lang={lang} onConfirm={onDeleteConfirm} />
      <AvailabilityDetails lang={lang} onStart={onAvailable} />
    </div>
  )
}

export default translateComponent(Dishes, translations)
