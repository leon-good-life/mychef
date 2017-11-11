import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import translateComponent from '../../utils/translateComponent'
import * as uiActions from '../../store/action-creators/ui'
import Loading from '../Loading'

const translations = {
  en: {
    order: 'Order'
  },
  he: {
    order: 'הזמן'
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

const mapStateToProps = state => {
  console.log(state)
  return {
    dishes: state.ui.dishes || [],
    loading: state.ui.isProcessingRequest,
    lang: state.ui.language
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(uiActions, dispatch)
})

Dishes = connect(mapStateToProps, mapDispatchToProps)(Dishes)

export default translateComponent(Dishes, translations)
