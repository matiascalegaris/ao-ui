import './stat-value.scss'

export default function StatValue ({icon, children, styles, iconStyle}) {
  return (
    <div className={'stat-area ' + styles}>
      <span className={'stat-icon ' + iconStyle}>
        <img src={icon} />
      </span>
      <div className='content'><span className='centered-content'>{children}</span></div>
    </div>
  )
}