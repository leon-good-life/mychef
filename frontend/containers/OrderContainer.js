import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Order from '../components/order/Order'
import * as uiActions from '../actions/ui'

class OrderContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.actions.fetchPublicDishes()
  }
  render() {
    return <Order dishes={this.props.dishes} loading={this.props.loading} lang={this.props.lang} />
  }
}

const mapStateToProps = state => ({
  dishes: state.ui.dishes || [],
  loading: state.ui.isProcessingRequest
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(uiActions, dispatch)
})

OrderContainer = connect(mapStateToProps, mapDispatchToProps)(OrderContainer)

export default OrderContainer
