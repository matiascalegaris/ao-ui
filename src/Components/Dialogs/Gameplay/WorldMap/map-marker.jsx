import { useRef } from "react"
import { TooltipTypes, useTooltipHover } from "../../../Common/Tooltip/Tooltip-manager"
import { useTranslation } from "react-i18next";

const selectColor = color => {
  switch (color)
  {
    case 1:
      return 'rgb(0, 198, 254)'
    default:
      return 'rgb(255, 30, 14)'
  }
}

export const MapMarker = ({posX, posY, color, ...otherProps}) => {
  const { t } = useTranslation();
  const style = {
    position: 'absolute',
    left: `${posX * 20 /100}px`,
    top: `${posY * 20 /100}px`
  }
  const innerStyle = {
    fill: selectColor(color),
    strokeWidth: "2",
    stroke: 'rgba(255, 255, 255, 0.38)'
  }
  const containerRef = useRef(null)
  const [eventHandlers] = useTooltipHover(t('clan-signal'), TooltipTypes.Npc, containerRef, 0)

  return (
    <svg height="5px" width="5px" style={style} {...otherProps} ref={containerRef} {...eventHandlers}>
      <circle cx="2.5" cy="2.5" r="2.5"   style={innerStyle} />
    </svg>
  )
}