import React from 'react';

const Deleting = ({lang}) => {
  const localization = {
    en: {
      deleting: 'Deleting...'
    },
    he: {
      deleting: 'מוחק...'
    }
  };
  const values = localization[lang];
  return (
    <h1>{values.deleting}</h1>
  );
};

export default Deleting;