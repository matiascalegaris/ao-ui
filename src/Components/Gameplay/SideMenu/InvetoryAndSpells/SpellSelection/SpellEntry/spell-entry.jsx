import './spell-entry.scss'

export default function SpellEntry({spell, selected, ...otherProps}) {
  return (
    <p className={'spell-entry ' + (selected ? 'selected-spell' : '')} {...otherProps}>{spell.name}</p>
  )
}