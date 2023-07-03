import { useSelector } from "react-redux"
import { selectOnlines } from "../../../../redux/GameplaySlices/GameStateSlice"

export const OnlineCount = () => {
  const onlineCount = useSelector(selectOnlines)
  return (
    <div className="onlines">Online: {onlineCount}</div>
  )
}