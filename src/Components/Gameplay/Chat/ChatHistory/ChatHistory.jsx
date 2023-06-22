import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { selectMessageList } from "../../../../redux/GameplaySlices/ChatSlice"
import ChatEntry from "./ChatEntry/chat-entry"

export const ChatHistory = ({selectUser}) => {
  const chatEntries = useSelector(selectMessageList)
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current && messagesEndRef.current.scrollIntoView(true)
  }
  const onScroll = evt => {
    //console.log('scroll evt')
    //console.log(evt.currentTarget)
  }
  const [chatState, setChatState] = useState({
    lastMessage:0, scrollTarget:0, 
  });
  if (chatState.lastMessage < chatEntries.length) {
    setChatState({ ...chatState, lastMessage: chatEntries.length})
    if (chatState.scrollTarget === 100.0) {
      scrollToBottom()
    }
  }
  return (
    <div className='message-list' onScroll={onScroll}>
      {
        chatEntries.map( (item,index) => (
          <ChatEntry key={index} chat={item} onUserSelect={selectUser}/>
        ))
      }
      <div className='scrollEnd' ref={messagesEndRef}></div>
    </div>
  )
}