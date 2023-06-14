
const selectColor = color => {
  switch (color)
  {
    case 1:
      return 'rgb(0, 198, 254)'
    default:
      return 'rgb(255, 201, 14)'
  }
}
export const InterestPoint = ({pos, color, ...otherProps}) => {
  const style = {
    position: 'absolute',
    left: `${pos.tileX-2}px`,
    top: `${pos.tileY-2}px`
  }
  const innerStyle = {
    fill: selectColor(color),
    strokeWidth: "1",
    stroke: 'rgba(255, 255, 255, 0.38)'
  }
  const outerColorStyle = {
    stopColor: 'rgb(255, 255, 255)',
    stopOpacity: '0.3'
  }
  const svgID = "ipointGrad-" + color;
  return ( 
  <svg height="5px" width="5px" style={style} {...otherProps}>
    <circle cx="2.5" cy="2.5" r="1.5"   style={innerStyle} />
  </svg>
  )
}