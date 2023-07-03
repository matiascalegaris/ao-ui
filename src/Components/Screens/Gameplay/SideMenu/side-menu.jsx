import InventoryAndSpells from './InvetoryAndSpells/inventory-and-spells'
import StatsAndMenu from './StatsAndMenu/stats-and-menu'
import './side-menu.scss'
import ExpArea from './ExpArea/exp-area'
import { ErrorBoundary } from '../../../ErrorBoundary/error-boundary'

export default function SideMenu({styles}) {
  return (
    <div className={'side-menu ' + styles}>
      <ErrorBoundary compName='sidemenu'>
        <ErrorBoundary compName="exp area">
          <ExpArea/>
        </ErrorBoundary>
        <ErrorBoundary compName="inventory and spell area">
          <InventoryAndSpells />
        </ErrorBoundary>
        <ErrorBoundary compName="stats area">
          <StatsAndMenu />
        </ErrorBoundary>
      </ErrorBoundary>
    </div>
  )
}