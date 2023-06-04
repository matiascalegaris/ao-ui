import { useSelector } from 'react-redux'
import { selectCurrentCoordinates, selectInterestPoints, selectMapNumber } from '../../../redux/GameplaySlices/MapInfoSlice'
import { GetRootDirectory } from '../../../Tools/Utils'
import './mini-map.scss'

const GetMapUrl = imageName =>  {
  return `${GetRootDirectory()}Minimapas/mapa${imageName}.bmp`
}

export default function MiniMap() {
  const mapNumber = useSelector(selectMapNumber)
  const interesPoins = useSelector(selectInterestPoints)
  const userPos = useSelector(selectCurrentCoordinates)
  const mapStyle = {
    backgroundImage: `url(${GetMapUrl(mapNumber)})`
  }
  return (
    <div className='mini-map'>
      <span className='mini-map-image' style={mapStyle}></span>
    </div>
  )
}