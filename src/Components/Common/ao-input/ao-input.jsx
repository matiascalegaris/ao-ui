import React from 'react';
import './ao-input.scss';


const AoInput = ({handleChange, styles, ...otherProps}) => (
  <div className={'group ' + styles}>
    <input className='form-input' onChange={handleChange} {...otherProps} />
  </div>
)

export default AoInput;