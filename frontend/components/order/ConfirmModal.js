import React from 'react'
import GoogleLogin from 'react-google-login'

const ConfirmModal = ({ onOrder }) => (
  <div className="modal fade" tabIndex="-1" role="dialog" id="order">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirm order</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>You are about to order.</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            data-dismiss="modal"
            onClick={onOrder}
          >
            Confirm ordering
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default ConfirmModal
