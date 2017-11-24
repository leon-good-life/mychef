import React from 'react'
import { Link } from 'react-router-dom'
import translateComponent from '../../utils/translateComponent'

const translations = {
  en: {
    order: 'Order',
    price: 'Price: '
  },
  he: {
    order: 'הזמן',
    price: 'מחיר: '
  }
}

let Dishes = ({ dishes, translated }) => (
  <div>
    <div className="card-columns">
      {dishes.map(dish => (
        <div className="card" key={dish.id}>
          <img className="card-img-top" src={dish.image} alt={dish.name} />
          <div className="card-body">
            <h4 className="card-title">{dish.name}</h4>
            <p className="card-text">{dish.description}</p>
            <p className="card-text">
              {translated.price} {dish.price}
            </p>
            <a
              href="#"
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#order"
              onClick={() => localStorage.setItem('orderItem', dish.id)}
            >
              {translated.order}
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
)

Dishes = translateComponent(Dishes, translations)

export default Dishes
