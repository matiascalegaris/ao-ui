import './chat-entry.scss'

export default function ChatEntry({chat, onUserSelect}) {
  const senderStyle = {
    color: `rgb(${chat.senderColor.R},${chat.senderColor.G},${chat.senderColor.B})`
  }
  const textStyle = {
    color: `rgb(${chat.textColor.R},${chat.textColor.G},${chat.textColor.B})`,
    fontWeight: chat.bold ? 600 : 400,
    fontStyle: chat.italic ? 'italic' : 'normal'
  }
  return (
    <p className={'chat-entry'} style={textStyle}>
      { chat.sender ? 
        <span className={'sender'} style={senderStyle} onClick={()=>onUserSelect(chat.sender)}>[{chat.sender}]</span> 
        : null
      }
      {chat.text}
    </p>
)}