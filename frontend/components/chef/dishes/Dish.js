import React from 'react'
import { Link } from 'react-router-dom'
import AvailabilityToggle from './AvailabilityToggle'
import translateComponent from '../../../utils/translateComponent'
import * as path from '../../../path'

const translations = {
  en: {
    edit: 'Edit',
    delete: 'Delete',
    price: 'Price: '
  },
  he: {
    edit: 'ערוך',
    delete: 'מחק',
    price: 'מחיר: '
  }
}

const Dish = ({ dish, lang, translated, onToggleAvailability, onDelete }) => (
  <div className="card">
    <img className="card-img-top" src={dish.image} alt={dish.name} />
    <div className="card-body">
      <h4 className="card-title">{dish.name}</h4>
      <p className="card-text">{dish.description}</p>
      <p className="card-text">
        {translated.price} {dish.price}
      </p>
      <AvailabilityToggle
        isToggled={dish.quantity > 0}
        lang={lang}
        onToggle={() => onToggleAvailability(dish.id, dish.quantity > 0)}
      />
      <Link
        to={path.cook_dishes_edit(lang, dish.id)}
        className="btn btn-sm btn-primary m-1"
      >
        {translated.edit}
      </Link>
      <a
        href="#"
        className="btn btn-sm btn-danger"
        data-toggle="modal"
        data-target="#confirmDelete"
        onClick={e => onDelete(dish.id)}
      >
        {translated.delete}
      </a>
    </div>
  </div>
)

export default translateComponent(Dish, translations)
