import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { selectMessageList } from "../../../../../redux/GameplaySlices/ChatSlice"
import ChatEntry from "./ChatEntry/chat-entry"

const gChatState = {
  isAutoScroll: false
}
const scrollToBottomView = ( parent ) => {
  gChatState.isAutoScroll = true
  parent.scrollTo(0, parent.scrollHeight)
}
export const ChatHistory = ({selectUser}) => {
  const chatEntries = useSelector(selectMessageList)
  const [chatState, setChatState] = useState({
    lastMessage:0, scrollTarget:-1, 
  });
  const scrollContiner = useRef(null)
  const scrollToBottom = () => {
    scrollContiner.current &&
    scrollToBottomView(scrollContiner.current)
  }
  const onScroll = evt => {
    if (gChatState.isAutoScroll) {
      gChatState.isAutoScroll = false
      return
    }
    const percent = scrollContiner.current.scrollTop / (scrollContiner.current.scrollHeight - scrollContiner.current.clientHeight)
    if (percent > .98) {
      setChatState({...chatState, scrollTarget: -1})
    } else {
      setChatState({...chatState, scrollTarget: percent})
    }
  }
  useEffect(()=> {
    const goTobottom = chatEntries.length > chatState.lastMessage &&  chatState.scrollTarget < 0
    let scrollTime = null
    if (goTobottom) {
      scrollTime = setTimeout(() => {
        scrollToBottom()
      }, 10)
      setChatState({ ...chatState, lastMessage: chatEntries.length})
    }
    return () => { goTobottom && clearTimeout(scrollTime)}
  }, [chatEntries])
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom()
    }, 100);
  }, [])
  return (
    <div className='message-list' ref={scrollContiner} onScroll={onScroll}>
      {
        chatEntries.map( (item,index) => (
          <ChatEntry key={index} chat={item} onUserSelect={selectUser}/>
        ))
      }
    </div>
  )
}