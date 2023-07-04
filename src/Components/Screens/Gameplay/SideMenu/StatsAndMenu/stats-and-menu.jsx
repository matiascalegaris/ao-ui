import SelectOption from '../../../../Common/SelectOption/select-option'
import AoButton from '../../../../Common/ao-button/ao-button'
import './stats-and-menu.scss'
import StatsPanel from './StatsPanel/stats-panel'
import MenuPanel from './MenuPanel/menu-panel'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorBoundary } from '../../../../ErrorBoundary/error-boundary'

export default function StatsAndMenu ({styles}) {
  const [currentState, setCurrentState] = useState({activePannel:'stats'});
  const {activePannel } = currentState;
  const { t } = useTranslation();
  const onChange = opt => {
    setCurrentState({...currentState, activePannel:opt})
  }
  //console.log('stats&menu render')
  return (
    <div className='stats-menu-area'>
      <div className='button-line'>
        <AoButton styles={'stats-opt-button ' + (activePannel === 'stats' ? 'selected' : 'unselected')} onClick={() => onChange('stats')}>{t("stats").toUpperCase()}</AoButton>
        <AoButton styles={'stats-opt-button ' + (activePannel === 'menu' ? 'selected' : 'unselected')} onClick={() => onChange('menu')}>{t("menu").toUpperCase()}</AoButton>
      </div>
      <ErrorBoundary compName={activePannel}>
      <div className='content-area'>
      {
        {
          'stats':<StatsPanel/>,
          'menu': <MenuPanel/>
        }
        [activePannel]
      }
      </div>
      </ErrorBoundary>
    </div>
  )
}