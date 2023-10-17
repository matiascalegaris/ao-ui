import './generic-input-dialog.scss'
import { useState } from "react"
import AoDialog from "../../Common/ao-dialog/ao-dialog"
import AoInput from "../../Common/ao-input/ao-input"
import AoButton from "../../Common/ao-button/ao-button"

export const GenericInputDialog = ({styles, settings}) => {
  const { state, setState} = useState('')
  const handleChange = evt => {
    setState(evt.value)
  }
  return (
    <AoDialog styles={'input-dialog ' + styles} ignoreAnimation={true}>
    { settings.title && <h1 className='dialog-header'>{settings.title.toUpperCase()}</h1> }
    <p className='desc-text'>{settings.text}</p>
    <AoInput name="state" styles="input-area" value={state} IsValid={true} required handleChange={handleChange} />
    <div className={'button-line ' + settings.optionStyle}>
      {
        settings.actions.map( (action, index) => (
          <AoButton styles={'button-settings'} key={index} isRed={action.isRed} onClick={() => action.action(state) }>{action.caption}</AoButton>
        ))
      }
    </div>
  </AoDialog>
)}