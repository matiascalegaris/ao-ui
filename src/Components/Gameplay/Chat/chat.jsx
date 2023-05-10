import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMessageList } from '../../../redux/GameplaySlices/ChatSlice';
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
  const chatEnties = useSelector(selectMessageList)
  return (
    <div className='game-chat'>
      <div className='message-list'>
      {
          chatEnties.map( (item,index) => (
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