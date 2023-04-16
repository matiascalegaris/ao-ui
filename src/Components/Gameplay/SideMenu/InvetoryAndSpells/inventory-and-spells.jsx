import AoButton from '../../../Common/ao-button/ao-button'
import Inventory from './Inventory/inventory';
import './inventory-and-spells.scss'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function InventoryAndSpells ({styles}) {
  const [currentState, setCurrentState] = useState({activePannel:'inventory'});
  const {activePannel } = currentState;
  const { t } = useTranslation();
  const onChange = opt => {
    setCurrentState({...currentState, activePannel:opt})
  }
  return (
    <div className='inventory-and-spells'>
      <div className='button-line'>
        <AoButton styles={'stats-opt-button ' + (activePannel === 'inventory' ? 'selected' : 'unselected')} onClick={() => onChange('inventory')}>{t("inventory").toUpperCase()}</AoButton>
        <AoButton styles={'stats-opt-button ' + (activePannel === 'spells' ? 'selected' : 'unselected')} onClick={() => onChange('spells')}>{t("spells").toUpperCase()}</AoButton>
      </div>
      <div className='content-area'>
      {
        {
          'inventory':<Inventory/>,
        }
        [activePannel]
      }
      </div>
    </div>
  )
}