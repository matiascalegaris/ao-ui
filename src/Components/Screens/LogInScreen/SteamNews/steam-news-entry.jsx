import './steam-news-entry.scss'
export const SteamNewsEntry = ({newsInfo}) => {
  const date = new Date(newsInfo.date * 1000)
  const onTittleClick = e => {
    window.parent.BabelUI.OpenLink(newsInfo.url)
  }
  const day = ("0" +  date.getDate()).slice(-2)
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const dateStr = `${day}/${month}/${date.getFullYear()}`
  return (
    <div className='news-entry'>
      <h1 className="news-title" onClick={onTittleClick}>{dateStr} {newsInfo.title}</h1>
      <p className='news-text'>{newsInfo.contents}</p>
    </div>
  )
}