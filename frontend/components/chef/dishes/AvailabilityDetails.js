import React from 'react'
import translateComponent from '../../../utils/translateComponent'

const translations = {
  en: {
    h1: 'Availability details',
    deliveryType: 'Delivery type:',
    deliveryDuration: 'Preparation and delivery duration:',
    ordersLimit: 'Orders limit:',
    cancel: 'Cancel',
    start: 'Publish and begin receiving orders'
  },
  he: {
    h1: 'פרטי הזמינות',
    deliveryType: 'סוג המשלוח:',
    deliveryDuration: 'זמן ההכנה והמשלוח:',
    ordersLimit: 'הגבל את כמות ההזמנות:',
    cancel: 'בטל',
    start: 'פרסם ואתחל לקבל הזמנות'
  }
}

class AvailabilityDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deliveryType: '',
      limit: 3
    }
  }
  render() {
    return (
      <div
        className="modal fade"
        id="AvailabilityDetails"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="Availability details"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {this.props.translated.h1}
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
            <div className="modal-body">
              <div className="form-group col-md-10">
                <label htmlFor="inputDeliveryType">
                  {this.props.translated.deliveryType}
                </label>
                <select className="custom-select">
                  <option defaultValue="1">
                    Customer will come and pick up
                  </option>
                  <option defaultValue="2">
                    I will deliver to the customer myself
                  </option>
                  <option defaultValue="3">I will send by courier</option>
                </select>
              </div>
              <div className="form-group col-md-10">
                <label htmlFor="inputDeliveryType">
                  {this.props.translated.deliveryDuration}
                </label>
                <select className="custom-select">
                  <option defaultValue="1">3 hours</option>
                  <option defaultValue="2">half day</option>
                  <option defaultValue="3">1 day</option>
                </select>
              </div>
              <div className="form-group col-md-10">
                <label htmlFor="inputDeliveryType">
                  {this.props.translated.ordersLimit}
                </label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    value={this.state.limit}
                    onChange={e => this.setState({ limit: e.target.value })}
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={e =>
                        this.setState(prevState => ({
                          limit: prevState.limit + 1
                        }))
                      }
                    >
                      &#9650;
                    </button>
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={e =>
                        this.setState(prevState => ({
                          limit: prevState.limit > 0 ? prevState.limit - 1 : 0
                        }))
                      }
                    >
                      &#9660;
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary m-1 btn-sm"
                data-dismiss="modal"
              >
                {this.props.translated.cancel}
              </button>
              <button
                type="button"
                className="btn btn-primary m-1 btn-sm"
                onClick={() => this.props.onStart(this.state.limit)}
                data-dismiss="modal"
              >
                {this.props.translated.start}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default translateComponent(AvailabilityDetails, translations)
