import React from 'react';
import './ao-checkbox.scss';


const AoCheckbox = ({label, styles, handleChange, ...otherProps}) => (
  <div className={'checkbox-group ' + styles}>
    <input className='form-input' type="checkbox" onChange={handleChange} {...otherProps} />
    <p className='checkox-label'>{label}</p>
  </div>
)

export default AoCheckbox;