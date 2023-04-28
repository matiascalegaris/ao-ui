import './chat-entry.scss'

export default function ChatEntry({chat}) {
  return (
    <p className={'chat-entry ' + chat.style}>
      { chat.sender ? 
        <span className={'sender ' + chat.senderStyle}>[{chat.sender}] </span> 
        : null
      }
      {chat.text}
    </p>
)}