import React from 'react'
import { Link } from 'react-router-dom'
import ConfirmDelete from './ConfirmDelete'
import AvailabilityToggle from './AvailabilityToggle'
import AvailabilityDetails from './AvailabilityDetails'
import translateComponent from '../../utils/translateComponent'
//import Loading from '../Loading'

const translations = {
  en: {
    edit: 'Edit',
    delete: 'Delete',
    add: '+ Add new dish'
  },
  he: {
    edit: 'ערוך',
    delete: 'מחק',
    add: '+ הוסף מנה חדשה'
  }
}

let Dishes = ({
  dishes,
  loading,
  translated,
  lang,
  onDelete,
  onDeleteConfirm,
  onToggleAvailability,
  onAvailable
}) => {
  //if(loading) return <Loading />
  const DishesCards = dishes =>
    dishes.map(dish => (
      <div className="card" key={dish.id}>
        <img className="card-img-top" src={dish.image} alt={dish.name} />
        <div className="card-body">
          <h4 className="card-title">{dish.name}</h4>
          <p className="card-text">{dish.description}</p>
          <AvailabilityToggle
            isToggled={dish.quantity > 0}
            lang={lang}
            onToggle={() => onToggleAvailability(dish.id, dish.quantity > 0)}
          />
          <Link
            to={`/cook/edit/${dish.id}`}
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
    ))
  return (
    <div>
      <div className="card-columns">
        <div className="card">
          <Link to="/cook/add" className="btn btn-success w-100">
            {translated.add}
          </Link>
        </div>
        {DishesCards(dishes)}
      </div>
      <ConfirmDelete lang={lang} onConfirm={onDeleteConfirm} />
      <AvailabilityDetails lang={lang} onStart={onAvailable} />
    </div>
  )
}

export default translateComponent(Dishes, translations)
