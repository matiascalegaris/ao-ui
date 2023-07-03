import { useSelector } from "react-redux"
import { selectFps } from "../../../../../redux/GameplaySlices/GameStateSlice"


export const FpsCounter = () => {
  const fps = useSelector(selectFps)
  return (
    <p className='fps'>FPS: {fps}</p>
  )
}