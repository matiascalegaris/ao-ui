import './chat.scss'
import { ChatHistory } from './ChatHistory/ChatHistory';
import { useDispatch } from 'react-redux';
import { setWhisperTarget } from '../../../redux/GameplaySlices/ChatSlice';
import { ChatInput } from './chat-input';

export default function Chat() {
  const dispatch = useDispatch()
  const selectUser = user => {
    dispatch(setWhisperTarget(user))
  }
  
  console.log('chat render')
  return (
    <div className='game-chat'>
      <ChatHistory selectUser={selectUser} />
      <ChatInput />
    </div>
  )
}