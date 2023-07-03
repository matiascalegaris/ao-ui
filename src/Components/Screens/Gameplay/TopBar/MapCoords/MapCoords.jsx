import { useSelector } from "react-redux"
import { selectCurrentCoordinates } from "../../../../../redux/GameplaySlices/MapInfoSlice"

export const MapCoords = ({isSafe, mapNumber}) => {
  const mapCoords = useSelector(selectCurrentCoordinates)
  return (
    <p className={ 'map-coords ' + (isSafe ? 'safe-area' : '') }>{`${mapNumber}-${mapCoords.x}-${mapCoords.y}`}</p>
  )
}