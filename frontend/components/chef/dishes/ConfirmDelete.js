import React from 'react'
import translateComponent from '../../../utils/translateComponent'

const translations = {
  en: {
    h1: 'Confirm Delete',
    message: 'Are you sure you want to delete?',
    close: 'Close',
    confirm: 'Confirm delete'
  },
  he: {
    h1: 'אשר מחיקה',
    message: 'האם אתה בטוח שאתה רוצה למחוק?',
    close: 'סגור',
    confirm: 'אשר מחיקה'
  }
}

const ConfirmDelete = ({ onConfirm, translated }) => (
  <div
    className="modal fade"
    id="confirmDelete"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="Confirm Delete"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {translated && translated.h1}
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{translated && translated.message}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary m-1"
            data-dismiss="modal"
          >
            {translated && translated.close}
          </button>
          <button
            type="button"
            className="btn btn-danger m-1"
            onClick={onConfirm}
            data-dismiss="modal"
          >
            {translated && translated.confirm}
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default translateComponent(ConfirmDelete, translations)
