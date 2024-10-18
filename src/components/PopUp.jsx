import React from 'react';
import SchemaBuilder from './SchemaBuilder';

const PopUp = ({ onClose}) => {
  return (
    <div className='popup'>
      <button className="saving-segment-btn" onClick={onClose}>{`< Saving segment`}</button>
      <SchemaBuilder handleCancel={onClose}/>
    </div>
  );
};

export default PopUp;