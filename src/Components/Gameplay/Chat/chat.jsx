import './chat.scss'
import { ChatHistory } from './ChatHistory/ChatHistory';
import { useDispatch, useSelector } from 'react-redux';
import { selectForceOpenChat, setWhisperTarget } from '../../../redux/GameplaySlices/ChatSlice';
import { ChatInput } from './chat-input';

export default function Chat() {
  const dispatch = useDispatch()
  const selectUser = user => {
    dispatch(setWhisperTarget({target:user, openChat: true}))
  }
  const forceOpenChatId = useSelector(selectForceOpenChat)
  console.log('chat render')
  return (
    <div className='game-chat'>
      <ChatHistory selectUser={selectUser} />
      <ChatInput forceOpenChatId={forceOpenChatId} />
    </div>
  )
}