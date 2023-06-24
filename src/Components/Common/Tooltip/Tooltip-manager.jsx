import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTooltip, setActiveToolTip } from "../../../redux/UIFlowSlice";
import './tooltip.scss'
import { ItemTooltip } from "./ItemToolTip/item-tooltip";

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
      dispatch(setActiveToolTip(null))
    }
  }), [contentInfo, hoverState]);
  
  return [eventHandlers];
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
          'Item':<ItemTooltip itemInfo={activeToolTip.contentInfo} />,
        }
        [activeToolTip.type]
      }
    </div>
  )
}