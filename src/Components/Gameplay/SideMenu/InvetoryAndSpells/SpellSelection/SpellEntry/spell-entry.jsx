import { useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
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
  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: DragDropTypes.SPELL,
    item: spell,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  // useEffect(() => {
  //   preview(getEmptyImage(), { captureDraggingState: true })
  // }, [])
  const [, dropRef] = useDrop(
    () => ({
      accept: DragDropTypes.SPELL,
      drop: (item, monitor) => dropSpell(item, spell),
      hover: (item, monitor) => {
        const dragIndex = item.index
        const hoverIndex = spell.index
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

        // if dragging down, continue only when hover is smaller than middle Y
        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
        // if dragging up, continue only when hover is bigger than middle Y
        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

        moveSpell(item, spell)
    },
    }),
    []
  )
  const ref = useRef(null)
  const dragDropRef = dragRef(dropRef(ref))
  return (
    <p className={'spell-entry ' + (selected ? 'selected-spell' : '')} ref={dragDropRef} {...otherProps}>{spell.name}</p>
  )
}