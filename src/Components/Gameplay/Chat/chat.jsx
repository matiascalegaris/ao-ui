import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMessageList } from '../../../redux/GameplaySlices/ChatSlice';
import AoInput from '../../Common/ao-input/ao-input'
import './chat.scss'
import ChatEntry from './ChatEntry/chat-entry';

export default function Chat() {
  const [chatState, setChatState] = useState({
    chatInput:'',
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
      console.log('send chat: ' + chatInput)
      window.parent.BabelUI.sendChat(chatInput)
      setChatState({ ...chatState, chatInput: ''});
      chatInputElement.current.blur();
    }
  };
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
  return (
    <div className='game-chat'>
      <div className='message-list'>
      {
          chatEnties.map( (item,index) => (
            <ChatEntry key={index} chat={item}/>
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