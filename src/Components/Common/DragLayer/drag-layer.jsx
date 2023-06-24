
import { useContext, useEffect, useState } from 'react'
import { DragDropTypes } from '../../../constants'
import { DragDropContext } from '../DragDropProvider'
import Sprite from '../Sprite/sprite'
import './drag-layer.scss'
import { Spell } from '../../Gameplay/SideMenu/InvetoryAndSpells/SpellSelection/SpellEntry/Spell/spell'

function getItemStyles(x, y, context) {
  if (context.item === null) {
    return {
      display: 'none',
    }
  }
  const transform = `translate(-50%, -50%)`
  return {
    position: 'absolute',
    top: `${y}px`,
    left: `${x}px`,
    transform,
    WebkitTransform: transform,
  }
}

export const DragLayer = () => {
  const dragDropContext = useContext(DragDropContext);
  const [mouseCallbacks, setMouseCallbacks] = useState({onMouseUp: null, onMouseMove: null})
  const [mousePos, setMousePos] = useState({x:0, y:0})
  const clearCurrentCallbacks = () => {
    if (mouseCallbacks.onMouseUp !== null) {
      window.removeEventListener('mouseup', mouseCallbacks.onMouseUp, false);
    }
    if (mouseCallbacks.onMouseMove !== null) {
      window.removeEventListener('mousemove', mouseCallbacks.onMouseMove, false);
    }
    setMouseCallbacks({...mouseCallbacks, onMouseUp: null, onMouseMove: null})
  }
  const registerCurrentCallbacks = () => {
    const onMouseMove = evt => {
      if (dragDropContext.item !== null) {
        setMousePos({x: evt.pageX, y: evt.pageY})
      }
    }
    const onMouseUp = evt => {
      if (dragDropContext.item !== null) {
        dragDropContext.DragEnd(evt,dragDropContext)   
      }
      setMousePos({x:0, y: 0})
    }
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mouseup', onMouseUp, false);
    setMouseCallbacks({...mouseCallbacks, onMouseUp: onMouseUp, onMouseMove: onMouseMove})
  }
  useEffect(() => {
    clearCurrentCallbacks()
    if (dragDropContext.item !== null) {
      registerCurrentCallbacks()
    }

  },[dragDropContext]);

  const renderItem = (context) => {
      switch (context.itemType) {
        case DragDropTypes.ITEM:
          const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(context.item.grh)
          return <Sprite imageName={grhInfo.imageNumber}
                    x={grhInfo.startX}
                    y={grhInfo.startY}
                    width={grhInfo.width}
                    height={grhInfo.height}
                  />
        case DragDropTypes.SPELL:
          return <Spell spellInfo={context.item}/>
        default:
          return null
      }
    }
  return (
    <div className='drag-layer'>
      <div style={getItemStyles(mousePos.x, mousePos.y, dragDropContext)}>
        {renderItem(dragDropContext)}
      </div>
      
    </div>
  )
}