import InventoryAndSpells from './InvetoryAndSpells/inventory-and-spells'
import StatsAndMenu from './StatsAndMenu/stats-and-menu'
import './side-menu.scss'
import ExpArea from './ExpArea/exp-area'

export default function SideMenu({styles}) {
  return (
    <div className={'side-menu ' + styles}>
      <ExpArea/>
      <InventoryAndSpells />
      <StatsAndMenu />
    </div>
  )
}