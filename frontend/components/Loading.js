import React from 'react'
import img from './loading.gif'

const Loading = () => (
  <img src={location.origin + '/public/' + img} alt="Loading..." />
)

export default Loading
