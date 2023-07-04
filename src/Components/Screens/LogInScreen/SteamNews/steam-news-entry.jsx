import './steam-news-entry.scss'
export const SteamNewsEntry = ({newsInfo}) => {
  const date = new Date(newsInfo.date * 1000)
  const onTittleClick = e => {
    window.parent.BabelUI.OpenLink(newsInfo.url)
  }
  return (
    <div className='news-entry'>
      <h1 className="news-title" onClick={onTittleClick}>{`${("0" +  date.getMonth()).slice(-2)}/${("0" + date.getDate()).slice(-2)}/${date.getFullYear()}`} {newsInfo.title}</h1>
      <p className='news-text'>{newsInfo.contents}</p>
    </div>
  )
}