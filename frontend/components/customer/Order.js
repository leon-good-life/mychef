import React from 'react'
import Img from './order.svg'
import Dishes from './Dishes'
import Loading from '../Loading'

const Order = ({ lang, dishes, loading }) => {
  const localization = {
    en: {
      h1: 'Order directly from the chef',
      soon: 'The service will be available soon'
    },
    he: {
      h1: 'הזמן ישירות מהשף',
      soon: 'השירות יהיה זמין בקרוב'
    }
  }
  const values = localization[lang]
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="d-flex">
            <div
              className="d-flex flex-column justify-content-md-center"
              style={{ textAlign: 'center' }}
            >
              <h1 className="display-3">{values.h1}</h1>
              <p className="lead">{values.soon}</p>
            </div>
            <img
              className="img-fluid"
              alt="food box"
              src={location.origin + '/public/' + Img}
              style={{ width: '50%' }}
            />
          </div>
        </div>
      </div>
      <div className="container">
        {loading ? <Loading /> : <Dishes lang={lang} dishes={dishes} />}
      </div>
    </div>
  )
}

export default Order
