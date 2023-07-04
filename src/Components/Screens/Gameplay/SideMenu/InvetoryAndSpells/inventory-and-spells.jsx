import AoButton from '../../../../Common/ao-button/ao-button'
import Inventory from './Inventory/inventory';
import './inventory-and-spells.scss'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SpellSelection from './SpellSelection/spell-selection';
import { ErrorBoundary } from '../../../../ErrorBoundary/error-boundary';
import { selectTrackUserActive, selectTrackUserActiveInvTab } from '../../../../../redux/GameplaySlices/GameStateSlice';
import { useSelector } from 'react-redux';

const TabsId  = {
  Inventory: 1,
  Spells: 2
}

export default function InventoryAndSpells ({styles}) {
  const [currentState, setCurrentState] = useState({activePannel:1});
  const {activePannel } = currentState;
  const { t } = useTranslation();
  const trackUser = useSelector(selectTrackUserActive)
  const trackRemoteTab = useSelector(selectTrackUserActiveInvTab)
  useEffect(()=> {
    if (trackUser && trackRemoteTab > 0) {
      if (trackRemoteTab !== activePannel) {
        setCurrentState({...currentState, activePannel:trackRemoteTab})
      }
    }
  }, [trackUser, trackRemoteTab])
  const onChange = opt => {
    setCurrentState({...currentState, activePannel:opt})
  }
  return (
    <div className='inventory-and-spells'>
      <div className='button-line'>
        <span className='button-line-content'>
        <AoButton styles={'stats-opt-button ' + (activePannel === 'inventory' ? 'selected' : 'unselected')} onClick={() => onChange(TabsId.Inventory)}>{t("inventory").toUpperCase()}</AoButton>
        <AoButton styles={'stats-opt-button ' + (activePannel === 'spells' ? 'selected' : 'unselected')} onClick={() => onChange(TabsId.Spells)}>{t("spells").toUpperCase()}</AoButton>
        </span>
      </div>
      <ErrorBoundary compName={activePannel}>
      <div className='content-area'>
      {
        {
          1:<Inventory/>,
          2:<SpellSelection/>,
        }
        [activePannel]
      }
      </div>
      </ErrorBoundary>
    </div>
  )
}