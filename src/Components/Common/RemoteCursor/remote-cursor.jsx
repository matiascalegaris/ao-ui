import { useSelector } from "react-redux"
import { selectRemoteMousePos, selectTrackUserLastClick } from "../../../redux/GameplaySlices/GameStateSlice"
import { useEffect, useState } from "react"
import './remote-cursor.scss'

export const RemoteCursor = () => {
  const [lastClick, setLastClick] = useState(0)
  const cursorPos = useSelector(selectRemoteMousePos)
  const lastClickSent = useSelector(selectTrackUserLastClick)
  useEffect(()=>{
    if (lastClickSent > lastClick) {
      setLastClick(lastClickSent)
    }
  }, [lastClickSent])
  
  const cursorSize = 10;
  const mouseStyle = {
    position: 'absolute',
    left: `${cursorPos.x - cursorSize/2}px`,
    top: `${cursorPos.y - cursorSize/2}px`,
    borderRadius: '50%',
    backgroundColor: 'red',
    width: `${cursorSize}px`,
    height: `${cursorSize}px`,
  }
  return (    
    <div key={lastClickSent} className={'animate-color-change'} style={mouseStyle}></div>
  )
}