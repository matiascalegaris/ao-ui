import { useEffect, useRef, useState } from 'react';
import AoInput from '../../Common/ao-input/ao-input'
import './chat.scss'
import ChatEntry from './ChatHistory/ChatEntry/chat-entry';
import { RegisterApiCallback } from '../../../Api/Api';
import { ChatHistory } from './ChatHistory/ChatHistory';


export default function Chat() {
  const [chatState, setChatState] = useState({
    chatInput:'', chatMode:0, 
  });
  
  const {chatInput} = chatState;
  const handleChange = event => {
    const { value, name } = event.target;
    setChatState({ ...chatState, [name]: value});
  }
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
    if (evt.key === ' ' &&
        document.activeElement !== chatInputElement.current) {
          window.parent.BabelUI.FakeHitEvent()
    }
  }
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener("keyup", handleGlobalKeyPress);
    }
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
  
  const onFocus = evt => {
    window.parent.BabelUI.UpdateInputFocus(true)
  }
  const onBlur = evt => {
    window.parent.BabelUI.UpdateInputFocus(false)
  }
  
  console.log('chat render')
  return (
    <div className='game-chat'>
      <ChatHistory selectUser={selectUser} />
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