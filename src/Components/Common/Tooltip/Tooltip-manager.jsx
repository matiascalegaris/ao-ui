import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTooltip, setActiveToolTip } from "../../../redux/UIFlowSlice";
import './tooltip.scss'
import { ItemTooltip } from "./ItemToolTip/item-tooltip";
import { SpellTooltip } from "./SpellToolTip/spell-tooltip";
import { isInside } from "../../../Tools/Utils";

export const TooltipTypes = {
  ITEM: 'Item',
  SPELL: 'Spell'
}
const toolTipWidth = 200

export const useTooltipHover = (contentInfo, type, targetRef) => {
  const [hoverState, setHoverState] = useState({timer:null})
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
        let anchorCenter = (anchorPos.left + anchorPos.width / 2) - (toolTipWidth / 2)
        if (anchorCenter + toolTipWidth > document.body.clientWidth) {
          anchorCenter -=  anchorCenter + toolTipWidth - document.body.clientWidth
        }
        anchor = {
          posX: anchorCenter,
          posY: anchorPos.bottom,
          mouseRect: {
            x: anchorPos.left,
            y: anchorPos.top,
            width: anchorPos.width,
            height: anchorPos.height
          }
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

const lastMousePos = {
  posX: -1,
  posY: -1
}

export const ActiveToolTip = () => {
  const activeToolTip = useSelector(selectTooltip)
  const dispatch = useDispatch()
  const mouseMove = evt => {
    lastMousePos.posX = evt.clientX
    lastMousePos.posY = evt.clientY
  }
  useEffect(() => {
    window.addEventListener('mousemove', mouseMove, false);
    return () => {
      window.removeEventListener('mousemove', mouseMove, false);
    }
  }, []);
  if (!activeToolTip || !activeToolTip.anchor) {
    return (<></>)
  }
  if (!isInside(activeToolTip.anchor.mouseRect, lastMousePos.posX, lastMousePos.posY)) {
    dispatch(setActiveToolTip(null))
    return <></>
  }
  const posStyle = {
    width: `${toolTipWidth}px`,
    top: `${activeToolTip.anchor.posY}px`,
    left: `${activeToolTip.anchor.posX}px`,
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