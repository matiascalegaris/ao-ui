import React from 'react';
import './ao-checkbox.scss';


const AoCheckbox = ({label, styles, handleChange, state, ...otherProps}) => { 
  return  (
  <div className={'checkbox-group ' + styles}>
    <input className='form-input' type="checkbox" checked={state} onChange={handleChange} {...otherProps} />
    <p className='checkox-label'>{label}</p>
  </div>
)}

export default AoCheckbox;