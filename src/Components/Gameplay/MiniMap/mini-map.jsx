import { useSelector } from 'react-redux'
import { selectCurrentCoordinates, selectGroupMarkers, selectInterestPoints, selectMapNumber } from '../../../redux/GameplaySlices/MapInfoSlice'
import { GetRootDirectory } from '../../../Tools/Utils'
import './mini-map.scss'
import { InterestPoint } from './InterestPoints/interest-points'

const GetMapUrl = imageName =>  {
  return `${GetRootDirectory()}Minimapas/mapa${imageName}.bmp`
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
const UserMarker = ({marker, color}) => {
  const posStyle = {
    position: 'absolute',
    left: `${marker.mapPos.x-2}px`,
    top: `${marker.mapPos.y-2}px`
  }
  return (
    <svg height="8px" width="8px" style={posStyle}>
      <circle cx="2.9" cy="2.9" r="2.3"   className={GetStyleForColor(color)} />
    </svg>
  )
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
      <span className='mini-map-image' style={mapStyle}>
      {
        interesPoins.map( (element, index) => (
          <InterestPoint key={index} pos={element.position} color={element.state} />
        ))
      }
      {
        groupMarkers.map( (element, index) => (
          <UserMarker key={index} marker={element} color={index + 1}/>
        ))
      }
      <UserMarker marker={userPos} color={0}/>
      </span>
      
    </div>
  )
}