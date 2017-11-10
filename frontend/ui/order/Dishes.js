import React from 'react'
import { Link } from 'react-router-dom'
import translateComponent from '../../utils/translateComponent'

const translations = {
  en: {
    order: 'Order'
  },
  he: {
    order: 'הזמן'
  }
}

const Dishes = ({ dishes, translated }) => {
  const DishesCards = dishes =>
    dishes.map(dish => (
      <div className="card" key={dish.id}>
        <img className="card-img-top" src={dish.picture} alt={dish.name} />
        <div className="card-body">
          <h4 className="card-title">{dish.name}</h4>
          <p className="card-text">{dish.description}</p>
          <a
            href="#"
            className="btn btn-sm btn-primary"
            data-toggle="modal"
            data-target="#confirmDelete"
          >
            {translated.order}
          </a>
        </div>
      </div>
    ))
  return (
    <div>
      <div className="card-columns">{DishesCards(dishes)}</div>
    </div>
  )
}

export default translateComponent(Dishes, translations)
