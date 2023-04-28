import { GetRootDirectory } from '../../../Tools/Utils'
import './mini-map.scss'

const GetMapUrl = imageName =>  {
  return `${GetRootDirectory()}Minimapas/mapa${imageName}.bmp`
}

export default function MiniMap() {
  const mapStyle = {
    backgroundImage: `url(${GetMapUrl(1)})`
  }
  return (
    <div className='mini-map'>
      <span className='mini-map-image' style={mapStyle}></span>
    </div>
  )
}