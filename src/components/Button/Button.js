import React from 'react';
import './Button.css';

const ButtonSmall = props => {
  return (
    <div>
      <button
        className="button-small"
        onClick={ props.onClick }
      >
        { props.title }
      </button>
    </div>
  );
};

export default ButtonSmall;
