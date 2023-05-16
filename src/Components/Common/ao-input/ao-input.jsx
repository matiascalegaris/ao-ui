import React from 'react';
import { SanitazeInput } from '../../../Tools/Utils';
import './ao-input.scss';


const AoInput = ({handleChange, IsValid, styles, inputStyles, innerRef, ...otherProps}) => {
  let errStyle = ''
  if (!IsValid) {
    errStyle = 'error '
  }
  const HandleChange = input => {
    handleChange(SanitazeInput(input))
  }
  return (  
  <div className={'group ' + errStyle + styles }>
    <input className={'form-input ' + inputStyles} onChange={HandleChange} ref={innerRef} {...otherProps} />
  </div>
)}

export default AoInput;