import InventoryAndSpells from './InvetoryAndSpells/inventory-and-spells'
import StatsAndMenu from './StatsAndMenu/stats-and-menu'
import './side-menu.scss'

export default function SideMenu({styles}) {
  return (
    <div className={'side-menu ' + styles}>
      <div className='exp-area'></div>
      <InventoryAndSpells />
      <StatsAndMenu />
    </div>
  )
}