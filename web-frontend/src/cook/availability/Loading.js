import React from 'react'

const Loading = ({lang}) => {
  const localization = {
    en: {
      loading: 'Loading...'
    },
    he: {
      loading: 'טוען...'
    }
  };
  const values = localization[lang];
  return <h1>{values.loading}</h1>;
}

export default Loading