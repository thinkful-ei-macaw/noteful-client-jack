import React from 'react';

const ValidationError = props => {
  if (props.message) {
    return <div className="error">{props.message}</div>;
  } else return <></>;
};

export default ValidationError;
