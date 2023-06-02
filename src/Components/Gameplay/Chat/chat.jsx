import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMessageList } from '../../../redux/GameplaySlices/ChatSlice';
import AoInput from '../../Common/ao-input/ao-input'
import './chat.scss'
import ChatEntry from './ChatEntry/chat-entry';

export default function Chat() {
  const [chatState, setChatState] = useState({
    chatInput:'', scrollTarget:100.0
  });
  const messagesEndRef = useRef(null)
  const {chatInput} = chatState;
  const handleChange = event => {
    const { value, name } = event.target;
    setChatState({ ...chatState, [name]: value});
  }
  const chatEnties = useSelector(selectMessageList)
  const chatInputElement = useRef(null);
  const handleKeyDown = (event) => {
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
    window.addEventListener("keydown", handleGlobalKeyPress);
    scrollToBottom()
  },[]);
  useEffect( () => () => {
    window.removeEventListener("keydown", handleGlobalKeyPress);
  }, [] );
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const onScroll = evt => {
    console.log('scroll evt')
    console.log(evt.currentTarget)
  }
  return (
    <div className='game-chat'>
      <div className='message-list' onScroll={onScroll}>
      {
          chatEnties.map( (item,index) => (
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
                  onKeyDown={handleKeyDown}/>
        <div className='chat-display-options'>
          <p className='option'>INFO</p>
          <p className='option'>GLOBAL</p>
        </div>
      </div>
    </div>
  )
}