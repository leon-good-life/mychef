import React from 'react';
import './Order.css';
import img from './order.svg';

class Order extends React.Component {
  render() {
    const localization = {
      en: {
        h1: 'Order food directly from the chef',
        comingSoon: 'The service will be available soon'
      },
      he: {
        h1: 'הזמן אוכל ישירות מהשף',
        comingSoon: 'השירות יהיה זמין בקרוב'
      }
    };
    const values = localization[this.props.lang];
    window.document.querySelector('title').innerText = values.h1;
    return (
      <div dir={this.props.lang === 'he' ? 'rtl' : 'ltr'}>
        <article className="header">
          <div style={{textAlign: 'center'}}>
            <h1>{values.h1}</h1>
            <h3>{values.comingSoon}</h3>
          </div>
          <img src={img} alt="food package" />
        </article>
      </div>
    );
  }
}

export default Order;