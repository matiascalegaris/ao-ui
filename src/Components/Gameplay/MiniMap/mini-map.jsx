import { useSelector } from 'react-redux'
import { selectCurrentCoordinates, selectGroupMarkers, selectInterestPoints, selectMapNumber } from '../../../redux/GameplaySlices/MapInfoSlice'
import { GetRootDirectory } from '../../../Tools/Utils'
import './mini-map.scss'
import { InterestPoint } from './InterestPoints/interest-points'
import { Actions } from '../../../constants'
import { ErrorBoundary } from '../../ErrorBoundary/error-boundary'

const GetMapUrl = imageName =>  {
  return `${GetRootDirectory()}/Minimapas/mapa${imageName}.bmp`
}

const GetStyleForColor = color => {
  switch (color) {
    case 0:
      return 'user-marker'
    case 1:
      return 'group-marker1'
    case 2:
      return 'group-marker2'
    case 3:
      return 'group-marker3'
    case 4:
      return 'group-marker4'
    case 6:
      return 'group-marker5'
    default:
      return 'group-marker6'
  }
}
const UserMarker = ({marker, color, ...otherProps}) => {
  const posStyle = {
    position: 'absolute',
    left: `${marker.mapPos.x-2}px`,
    top: `${marker.mapPos.y-2}px`
  }
  return (
    <svg height="8px" width="8px" style={posStyle} {...otherProps}>
      <circle cx="2.9" cy="2.9" r="2.3"   className={GetStyleForColor(color)} />
    </svg>
  )
}
const onMapClick = evt => {
  if (evt.shiftKey && evt.target.className === 'mini-map-image') {
    const rootMapObj = evt.target.parentNode
    const localX = evt.clientX - rootMapObj.offsetLeft - 8;
    const localY = evt.clientY - rootMapObj.offsetTop - 8;
    window.parent.BabelUI.ClickMiniMapPos(localX, localY)
  }
  else {
    window.parent.BabelUI.RequestAction(Actions.OpenMinimap)
  }
}

const onMarkerClick = (evt, x, y) => {
  if (evt.shiftKey) {
    evt.preventDefault()
    window.parent.BabelUI.ClickMiniMapPos(x, y)
  }
}
export default function MiniMap() {
  const mapNumber = useSelector(selectMapNumber)
  const interesPoins = useSelector(selectInterestPoints)
  const userPos = useSelector(selectCurrentCoordinates)
  const groupMarkers = useSelector(selectGroupMarkers)
  const mapStyle = {
    backgroundImage: `url(${GetMapUrl(mapNumber)})`
  }

  const userMarker = {
    position: 'absolute',
    left: `${userPos.mapPos.x-2}px`,
    top: `${userPos.mapPos.y-2}px`
  }
  return (
    <div className='mini-map'>
      <ErrorBoundary compName="minmap">
      <span className='mini-map-image' style={mapStyle} onClick={onMapClick}>
      {
        interesPoins.map( (element, index) => (
          <InterestPoint key={index} pos={element.position} 
            color={element.state} 
            onClick={ evt => onMarkerClick(evt, element.position.tileX, element.position.tileY)}/>
        ))
      }
      {
        groupMarkers.map( (element, index) => (
          <UserMarker key={index} marker={element} 
            color={index + 1}
            onClick={ evt => onMarkerClick(evt, element.mapPos.x, element.mapPos.y)}
          />
        ))
      }
      <UserMarker marker={userPos} color={0} 
        onClick={ evt => onMarkerClick(evt, userPos.mapPos.x, userPos.mapPos.y)}/>
      </span>
      </ErrorBoundary>
    </div>
  )
}