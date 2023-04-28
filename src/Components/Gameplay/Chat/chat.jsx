import { useState } from 'react';
import AoInput from '../../Common/ao-input/ao-input'
import './chat.scss'
import ChatEntry from './ChatEntry/chat-entry';

export default function Chat() {
  const [chatState, setChatState] = useState({
    chatInput:'',
  });
  const {chatInput} = chatState;
  const handleChange = event => {
    const { value, name } = event.target;
    setChatState({ ...chatState, [name]: value});
  }
  const chatEnties = Array(100).fill({style:'chaos-color', senderStyle:'chaos-color', sender:'Some Guy', text:'some test text so i might need to generate a really long text line to test word wrapping in this chat fuck my life and that still not enought, how much can anyone write?'})
  return (
    <div className='game-chat'>
      <div className='message-list'>
      {
          chatEnties.slice(0,24).map( (item,index) => (
            <ChatEntry key={index} chat={item}/>
          ))
        }
      </div>
      <div className='input-line'>
        <img src={require('../../../assets/Icons/gameplay/ico_dialog.png')} className='chat-input-selection'/>
        <AoInput styles='chat-input' inputStyles='chat-input-area' name="chatInput" value={chatInput} IsValid={chatInput} required handleChange={handleChange} />
        <div className='chat-display-options'>
          <p className='option'>INFO</p>
          <p className='option'>GLOBAL</p>
        </div>
      </div>
    </div>
  )
}