import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMessageList } from '../../../redux/GameplaySlices/ChatSlice';
import AoInput from '../../Common/ao-input/ao-input'
import './chat.scss'
import ChatEntry from './ChatEntry/chat-entry';
import { RegisterApiCallback } from '../../../Api/Api';

export default function Chat() {
  const [chatState, setChatState] = useState({
    chatInput:'', scrollTarget:100.0,
    chatMode:0, lastMessage: 0
  });
  const messagesEndRef = useRef(null)
  const {chatInput} = chatState;
  const handleChange = event => {
    const { value, name } = event.target;
    setChatState({ ...chatState, [name]: value});
  }
  const chatEntries = useSelector(selectMessageList)
  const chatInputElement = useRef(null);
  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      window.parent.BabelUI.SendChat(chatInput)
      setChatState({ ...chatState, chatInput: ''});
      chatInputElement.current.blur();
    }
  };
  const selectUser = user => {
    setChatState({ ...chatState, chatInput: `\\${user}`});
    if (document.activeElement !== chatInputElement.current) {
      chatInputElement.current && chatInputElement.current.focus()
    }
  }
  const handleGlobalKeyPress = evt => {
    if (evt.key === 'Enter' &&
        document.activeElement !== chatInputElement.current) {
          chatInputElement.current &&  chatInputElement.current.focus()
    }
  }
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener("keyup", handleGlobalKeyPress);
    }
    scrollToBottom()
    RegisterApiCallback('OpenChat', (chatMode) => {
      setChatState({ ...chatState, chatMode:chatMode});
      chatInputElement.current &&  chatInputElement.current.focus()
    })
  },[]);
  useEffect( () => () => {
    if (process.env.NODE_ENV === 'development') {
      window.removeEventListener("keyup", handleGlobalKeyPress);
    }
    RegisterApiCallback('OpenChat', (chatMode) => {})
  }, [] );
  const scrollToBottom = () => {
    console.log('scroll to bottom')
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start'  })
  }
  const onScroll = evt => {
    //console.log('scroll evt')
    //console.log(evt.currentTarget)
  }
  const onFocus = evt => {
    window.parent.BabelUI.UpdateInputFocus(true)
  }
  const onBlur = evt => {
    window.parent.BabelUI.UpdateInputFocus(false)
  }
  if (chatState.lastMessage < chatEntries.length) {
    setChatState({ ...chatState, lastMessage: chatEntries.length})
    if (chatState.scrollTarget === 100.0) {
      scrollToBottom()
    }
  }
  return (
    <div className='game-chat'>
      <div className='message-list' onScroll={onScroll}>
      {
          chatEntries.map( (item,index) => (
            <ChatEntry key={index} chat={item} onUserSelect={selectUser}/>
          ))
        }
        <div className='scrollEnd' ref={messagesEndRef}></div>
      </div>
      <div className='input-line'>
        <img src={require('../../../assets/Icons/gameplay/ico_dialog.png')} className='chat-input-selection'/>
        <AoInput styles='chat-input' inputStyles='chat-input-area' 
                  name="chatInput" value={chatInput} IsValid={chatInput} 
                  required handleChange={handleChange} 
                  innerRef={chatInputElement}
                  onKeyUp={handleKeyUp}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  />
        <div className='chat-display-options'>
          <p className='option'>INFO</p>
          <p className='option'>GLOBAL</p>
        </div>
      </div>
    </div>
  )
}