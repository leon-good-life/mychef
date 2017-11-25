import React from 'react'
import GoogleLogin from 'react-google-login'

const LoginModal = ({ login }) => (
  <div className="modal fade" tabIndex="-1" role="dialog" id="order">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Login to order</h5>
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
          <p>Please login to order this dish.</p>
        </div>
        <div className="modal-footer">
          <GoogleLogin
            clientId="377161177382-bqradjn2qablmfso34dcnkrtd31gs25m.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={login}
            onFailure={login}
            className="btn btn-primary"
          />
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

export default LoginModal
