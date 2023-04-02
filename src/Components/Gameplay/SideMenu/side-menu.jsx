import StatsAndMenu from './StatsAndMenu/stats-and-menu'
import './side-menu.scss'

export default function SideMenu({styles}) {
  return (
    <div className={'side-menu ' + styles}>
      <div className='exp-area'></div>
      <div className='inventory-spells-area'></div>
      <StatsAndMenu styles='stats-and-menu-area'/>
    </div>
  )
}