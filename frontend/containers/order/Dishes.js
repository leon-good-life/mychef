import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import translateComponent from '../../utils/translateComponent'
import * as uiActions from '../../actions/ui'
import Loading from '../../components/Loading'

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

class Dishes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      dishes: []
    }
    this.dishCards = this.dishCards.bind(this)
  }
  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <div>
        <div className="card-columns">{this.dishCards()}</div>
      </div>
    )
  }
  componentWillMount() {
    this.props.actions.fetchPublicDishes()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ dishes: nextProps.dishes, loading: nextProps.loading })
  }
  dishCards() {
    return this.state.dishes.map(dish => (
      <div className="card" key={dish.id}>
        <img className="card-img-top" src={dish.image} alt={dish.name} />
        <div className="card-body">
          <h4 className="card-title">{dish.name}</h4>
          <p className="card-text">{dish.description}</p>
          <p className="card-text">
            {this.props.translated.price} {dish.price}
          </p>
          <a
            href="#"
            className="btn btn-sm btn-primary"
            data-toggle="modal"
            data-target="#confirmDelete"
          >
            {this.props.translated.order}
          </a>
        </div>
      </div>
    ))
  }
}

Dishes = translateComponent(Dishes, translations)

const mapStateToProps = state => {
  console.log(state)
  return {
    dishes: state.ui.dishes || [],
    loading: state.ui.isProcessingRequest
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(uiActions, dispatch)
})

Dishes = connect(mapStateToProps, mapDispatchToProps)(Dishes)

export default Dishes
