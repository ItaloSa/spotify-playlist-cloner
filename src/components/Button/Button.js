import React from 'react';
import './Button.css';

const ButtonSmall = props => {
  return (
    <button
      className="button-small"
    >
      { props.title }
    </button>
  );
};

export default ButtonSmall;
