import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Order from '../components/order/Order'
import * as uiActions from '../actions/ui'
import * as ordersActions from '../actions/orders'
import LoginModal from '../components/order/LoginModal'
import ConfirmModal from '../components/order/ConfirmModal'

class OrderContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.actions.fetchPublicDishes()
  }
  render() {
    return (
      <div>
        <Order
          dishes={this.props.dishes}
          loading={this.props.loading}
          lang={this.props.lang}
        />
        {this.props.isLoggedIn ? (
          <ConfirmModal
            onOrder={() => {
              const dishId = localStorage.getItem('orderItem')
              this.props.actions.createOrder(dishId, this.props.token)
            }}
          />
        ) : (
          <LoginModal
            login={googleUser => {
              $('#order').modal('hide')
              this.props.login(googleUser)
              $('#order').modal('show')
            }}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dishes: state.ui.dishes || [],
  loading: state.ui.isProcessingRequest,
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...uiActions, ...ordersActions }, dispatch)
})

OrderContainer = connect(mapStateToProps, mapDispatchToProps)(OrderContainer)

export default OrderContainer
