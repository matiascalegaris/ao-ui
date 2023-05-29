import './chat-entry.scss'

const GetStyleForStyleType = (styleId) => {
  switch(styleId) {
    default:
      return ''
  }
}
export default function ChatEntry({chat}) {
  const senderStyle = {
    color: `rgb(${chat.senderColor.R},${chat.senderColor.G},${chat.senderColor.B})`
  }
  const textStyle = {
    color: `rgb(${chat.textColor.R},${chat.textColor.G},${chat.textColor.B})`
  }
  return (
    <p className={'chat-entry ' + GetStyleForStyleType(chat.textStyle)} style={textStyle}>
      { chat.sender ? 
        <span className={'sender'} style={senderStyle}>[{chat.sender}] </span> 
        : null
      }
      {chat.text}
    </p>
)}