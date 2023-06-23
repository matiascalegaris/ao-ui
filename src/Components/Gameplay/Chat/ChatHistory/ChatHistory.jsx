import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { selectMessageList } from "../../../../redux/GameplaySlices/ChatSlice"
import ChatEntry from "./ChatEntry/chat-entry"

const gChatState = {
  isAutoScroll: false
}
const scrollElementIntoView = (targetElement, parent ) => {
  gChatState.isAutoScroll = true
  parent.scrollTo(0, targetElement.offsetTop)
}
export const ChatHistory = ({selectUser}) => {
  const chatEntries = useSelector(selectMessageList)
  const [chatState, setChatState] = useState({
    lastMessage:0, scrollTarget:-1, 
  });
  const messagesEndRef = useRef(null)
  const scrollContiner = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current && scrollContiner.current &&
    scrollElementIntoView(messagesEndRef.current, scrollContiner.current)
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
  
  if (chatState.lastMessage < chatEntries.length) {
    if (chatState.scrollTarget < 0) {
      scrollToBottom()
    }
    setChatState({ ...chatState, lastMessage: chatEntries.length})
  }
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
      <div className='scrollEnd' ref={messagesEndRef}></div>
    </div>
  )
}