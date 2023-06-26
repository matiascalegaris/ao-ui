
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, DragDropTypes } from '../../../../../constants';
import { selectSelectedSpellSlotIndex, selectSpellList, selectSpellSlot } from '../../../../../redux/GameplaySlices/InventorySlice';
import AoButton from '../../../../Common/ao-button/ao-button'
import InventoryFrame from '../InventoryFrame/inventory-frame'
import './spell-selection.scss'
import SpellEntry from './SpellEntry/spell-entry';
import { DropArea } from '../../../../Common/DropArea';
import { useEffect, useRef, useState } from 'react';

const getSpellOrderIconForState = state => {
  if (state) {
    return require('../../../../../assets/Icons/reorder-spell/open.png')
  } else {
    return require('../../../../../assets/Icons/reorder-spell/closed.png')
  }
}
export default function SpellSelection () {
  const { t } = useTranslation();
  const [enableSpellOrder, setEnableSpellOrder] = useState(false)
  const spellList = useSelector(selectSpellList)
  const dispatch = useDispatch()
  const selectedSpellIndex = useSelector(selectSelectedSpellSlotIndex)
  const selectNewSpell = spellInfo => {
    if (spellInfo.index !== selectedSpellIndex) {
      dispatch(selectSpellSlot(spellInfo.index))
      window.parent.BabelUI.UpdateSelectedSpellSlot(spellInfo.index)
    }
  }
  console.log('spell list render')
  const useSpell = evt => {
    window.parent.BabelUI.UseSpellSlot(selectedSpellIndex)
  }
  const updateSpellOrderState = evt => {
    setEnableSpellOrder(!enableSpellOrder)
  }
  useEffect( ()=> {
    window.parent.BabelUI.RequestAction(Actions.DisplaySpells)
  }, [])
  const img = getSpellOrderIconForState(enableSpellOrder)
  return (
    <div className='spell-selection'>
      <InventoryFrame styles='spell-list' contentStyles='spell-content'>
        {
          spellList.map( (spell, index) => (
            <SpellEntry key={index} spell={spell} 
                        selected={selectedSpellIndex === index} 
                        dragEnabled={enableSpellOrder}
                        onClick={() => selectNewSpell(spell)}/>
          ))
        }
      </InventoryFrame>
      <div className='button-area'>
        <AoButton styles='throw-button' isRed={true} onClick={useSpell}>{t('spell-use')}</AoButton>
        <img className='spell-order-lock' src={img} onClick={updateSpellOrderState}/>
      </div>
    </div>
  )
}