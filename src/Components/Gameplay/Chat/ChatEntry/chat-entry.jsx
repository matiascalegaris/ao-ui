import Linkify from 'react-linkify/dist/components/Linkify'
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
  const onLinkClick = evt => {
    window.parent.BabelUI.OpenLink(evt)
  }
  const renderLink = ({ attributes, content }) => {
    const { href, ...props } = attributes;
    const onClick = evt => {
      window.parent.BabelUI.OpenLink(href)
    }
    return <p onClick={onClick} {...props}>fuck</p>;
  };
  return (
    <p className={'chat-entry'} style={textStyle}>
      { chat.sender ? 
        <span className={'sender'} style={senderStyle} onClick={()=>onUserSelect(chat.sender)}>[{chat.sender}]</span> 
        : null
      }
      <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
        <span className='link-style' onClick={()=> onLinkClick(decoratedText)} >{decoratedText}</span>
    )}>{chat.text}</Linkify>
    </p>
)}