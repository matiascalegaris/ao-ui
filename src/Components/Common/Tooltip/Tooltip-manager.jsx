import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTooltip, setActiveToolTip } from "../../../redux/UIFlowSlice";
import './tooltip.scss'
import Sprite from "../Sprite/sprite";

export const TooltipTypes = {
  ITEM: 'Item',
  SPELL: 'Spell'
}

export const useTooltipHover = (contentInfo, type, targetRef) => {
  const [hoverState, setHoverState] = useState({timer:null})
  const dispatch = useDispatch()
  const isInsideRef = useRef(hoverState);
  isInsideRef.current = hoverState
  const eventHandlers = useMemo(() => ({
    onMouseOver() { 
      if (!contentInfo || !type) return
      setHoverState({
        ...hoverState, timer: setTimeout(() => {
          dispatch(setActiveToolTip({contentInfo, type, targetRef}))
          setHoverState({...hoverState, timer: null})
        }, 500)})
    },
    onMouseOut() { 
      clearTimeout(isInsideRef.current.timer)
      setHoverState({...isInsideRef.current, timer: null})
      //dispatch(setActiveToolTip(null))
    }
  }), [contentInfo, hoverState]);
  
  return [eventHandlers];
}

const drawIemTooltip = (itemInfo, anchor) => {
  const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(itemInfo.grh)
  return (
    <div className="item-tooltip">
      <div className="item-header">
      <Sprite
          styles="icon"
          imageName={grhInfo.imageNumber}
          x={grhInfo.startX}
          y={grhInfo.startY}
          width={grhInfo.width}
          height={grhInfo.height}
        />
        <span className="title">{itemInfo.name}</span>
      </div>
      {
        itemInfo.description ? <div className="description">{itemInfo.description}</div> : null
      }
      <div className="stats-line">
      {
        itemInfo.minDef > 0 || itemInfo.maxDef > 0 ? 
          <div className="stats-line">
            <img className="icon" src={require('../../../assets/Icons/gameplay/ico_stats_shield.png')}/>
            <span className="value">{itemInfo.minDef}/{itemInfo.maxDef}</span>
          </div> : null
      }
      {
        itemInfo.minHit > 0 || itemInfo.maxHit > 0 ? 
          <div className="stats-line">
            <img className="icon" src={require('../../../assets/Icons/gameplay/ico_stats_sword.png')}/>
            <span className="value">{itemInfo.minHit}/{itemInfo.maxHit}</span>
          </div> : null
      }
      {
        itemInfo.cooldown > 0 ? 
          <div className="stats-line">
            <img className="icon" src={require('../../../assets/Icons/gameplay/ico_timer.png')}/>
            <span className="value">{itemInfo.cooldown/1000}s</span>
          </div> : null
      }
      </div>
    </div>
  )
}

export const ActiveToolTip = () => {
  const activeToolTip = useSelector(selectTooltip)
  if (!activeToolTip) {
    return (<></>)
  }
  const anchorPos = activeToolTip.targetRef.current.getBoundingClientRect()
  const toolTipWidth = 200
  let anchorCenter = (anchorPos.left + anchorPos.width / 2) - (toolTipWidth / 2)

  if (anchorCenter + toolTipWidth > document.body.clientWidth) {
    anchorCenter -=  anchorCenter + toolTipWidth - document.body.clientWidth
  }
  const posStyle = {
    width: `${toolTipWidth}px`,
    top: `${anchorPos.bottom}px`,
    left: `${anchorCenter}px`,
    position: 'absolute',
    display: 'flex'
  }
  switch(activeToolTip.type) {
    case TooltipTypes.ITEM:
      break;
    case TooltipTypes.SPELL:
      break;
    default:
      break;
  }
  return (
    <div style={posStyle}>
      {{
          'Item':drawIemTooltip(activeToolTip.contentInfo),
        }
        [activeToolTip.type]
      }
    </div>
  )
}