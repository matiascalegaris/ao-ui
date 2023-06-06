import { useEffect, useRef } from 'react'
import { DragDropTypes } from '../../../../../../constants'
import './spell-entry.scss'

const dropSpell = (item, dest) => {
  console.log('drop spell!')
  console.log(item)
  console.log(dest)
}
const moveSpell = (item, dest) => {
  console.log('move spell!')
  console.log(item)
  console.log(dest)
}
export default function SpellEntry({spell, selected, ...otherProps}) {
  return (
    <p className={'spell-entry ' + (selected ? 'selected-spell' : '')} {...otherProps}>{spell.name}</p>
  )
}