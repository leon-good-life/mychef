import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Order from '../../components/customer/Order'
import * as customerActions from '../../actions/customer'
import LoginModal from '../../components/customer/LoginModal'
import ConfirmModal from '../../components/customer/ConfirmModal'

class OrderContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.actions.fetchDishes()
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
  dishes: state.customer.dishes || [],
  loading: state.customer.isProcessingRequest,
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(customerActions, dispatch)
})

OrderContainer = connect(mapStateToProps, mapDispatchToProps)(OrderContainer)

export default OrderContainer
