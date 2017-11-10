import React from 'react'
import { Link } from 'react-router-dom'
import translateComponent from '../../utils/translateComponent'

const translations = {
  en: {
    name: 'Name',
    description: 'Description',
    image: 'Image',
    price: 'Price',
    h1Add: 'Add new dish',
    h1Edit: 'Edit dish',
    update: 'Update',
    add: 'Add',
    cancel: 'Cancel'
  },
  he: {
    name: 'שם המנה',
    description: 'תיאור',
    image: 'העלה תמונה',
    price: 'מחיר',
    h1Add: 'הוסף מנה חדשה',
    h1Edit: 'עדכן מנה',
    update: 'עדכן',
    add: 'הוסף',
    cancel: 'בטל'
  }
}

class DishForm extends React.Component {
  render() {
    return (
      <div className="card">
        <form className="card-body">
          <h1>
            {this.props.type === 'add'
              ? this.props.translated.h1Add
              : this.props.translated.h1Edit}
          </h1>
          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <label>{this.props.translated.name}</label>
                <input
                  className="form-control"
                  placeholder={this.props.translated.name}
                />
              </div>
              <div className="form-group" dir="ltr" lang="en">
                <label>{this.props.translated.image}</label>
                <label className="custom-file form-control">
                  <input type="file" id="file2" className="custom-file-input" />
                  <span className="custom-file-control" />
                </label>
                <div className="progress mt-2">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '25%' }}
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>{this.props.translated.description}</label>
                <textarea
                  className="form-control"
                  placeholder={this.props.translated.description}
                />
              </div>
              <div className="form-group">
                <label>{this.props.translated.price}</label>
                <input
                  className="form-control"
                  placeholder={this.props.translated.price}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary m-1" type="submit">
            {this.props.type === 'add'
              ? this.props.translated.add
              : this.props.translated.update}
          </button>
          <Link to="/cook/dishes" className="btn btn-secondary m-1">
            {this.props.translated.cancel}
          </Link>
        </form>
      </div>
    )
  }
}

export default translateComponent(DishForm, translations)
