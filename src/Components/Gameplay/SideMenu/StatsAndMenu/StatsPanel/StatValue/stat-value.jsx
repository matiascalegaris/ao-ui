import './stat-value.scss'

export default function StatValue ({icon, children, styles}) {
  return (
    <div className={'stat-area ' + styles}>
      <img className='stat-icon' src={require('../../../../../../assets/Icons/ico_trash.png')} />
      <span className='content'>{children}</span>
    </div>
  )
}