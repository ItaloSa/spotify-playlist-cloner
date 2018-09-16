import React from 'react';
import './Button.css';

const ButtonSmall = props => {
  return (
    <button
      className="button-small"
      onClick={ props.onClick }
    >
      { props.title }
    </button>
  );
};

export default ButtonSmall;
