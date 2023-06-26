import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTooltip, setActiveToolTip } from "../../../redux/UIFlowSlice";
import './tooltip.scss'
import { ItemTooltip } from "./ItemToolTip/item-tooltip";
import { SpellTooltip } from "./SpellToolTip/spell-tooltip";

export const TooltipTypes = {
  ITEM: 'Item',
  SPELL: 'Spell'
}
const toolTipWidth = 200

export const useTooltipHover = (contentInfo, type, targetRef, scrollAreaRef) => {
  const [hoverState, setHoverState] = useState({timer:null, anchor: null})
  const dispatch = useDispatch()
  const isInsideRef = useRef(hoverState);

  useEffect(() => {
    isInsideRef.current = hoverState;
  }, [hoverState]);
 
  const eventHandlers = useMemo(() => ({
    onMouseOver() { 
      if (!contentInfo || !type) return
      let anchor = null
      if (targetRef.current) {
        const anchorPos = targetRef.current.getBoundingClientRect()
        const scrollOffset = scrollAreaRef && scrollAreaRef.current ? scrollAreaRef.current.scrollTop : 0
        let anchorCenter = (anchorPos.left + anchorPos.width / 2) - (toolTipWidth / 2)
        if (anchorCenter + toolTipWidth > document.body.clientWidth) {
          anchorCenter -=  anchorCenter + toolTipWidth - document.body.clientWidth
        }
        anchor = {
          PosX: anchorCenter,
          PosY: anchorPos.bottom - scrollOffset
        }
      }
      setHoverState({ ...isInsideRef.current,
        timer: setTimeout(() => {
          dispatch(setActiveToolTip({contentInfo, type, anchor:anchor}))
          setHoverState({...isInsideRef.current,timer: null})
        }, 500)})
    },
    onMouseOut() { 
      clearTimeout(isInsideRef.current.timer)
      setHoverState({...isInsideRef.current, timer: null})
      dispatch(setActiveToolTip(null))
    }
  }), [contentInfo, dispatch, targetRef]);
  
  return [eventHandlers];
}

export const ActiveToolTip = () => {
  const activeToolTip = useSelector(selectTooltip)
  if (!activeToolTip || !activeToolTip.anchor) {
    return (<></>)
  }
  
  const posStyle = {
    width: `${toolTipWidth}px`,
    top: `${activeToolTip.anchor.PosY}px`,
    left: `${activeToolTip.anchor.PosX}px`,
    position: 'absolute',
    display: 'flex'
  }
  return (
    <div style={posStyle}>
      {{
          'Item':<ItemTooltip itemInfo={activeToolTip.contentInfo} />,
          'Spell':<SpellTooltip spell={activeToolTip.contentInfo}/>
        }
        [activeToolTip.type]
      }
    </div>
  )
}