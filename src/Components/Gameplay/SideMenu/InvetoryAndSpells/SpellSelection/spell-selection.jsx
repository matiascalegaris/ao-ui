
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropTypes } from '../../../../../constants';
import { selectSelectedSpellSlotIndex, selectSpellList, selectSpellSlot } from '../../../../../redux/GameplaySlices/InventorySlice';
import AoButton from '../../../../Common/ao-button/ao-button'
import InventoryFrame from '../InventoryFrame/inventory-frame'
import './spell-selection.scss'
import SpellEntry from './SpellEntry/spell-entry';
import { DropArea } from '../../../../Common/DropArea';

export default function SpellSelection () {
  const { t } = useTranslation();
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
  const onDrop = dragInfo => {
    onDropAction(dragInfo.item, dropId)
  }
  return (
    <div className='spell-selection'>
      <InventoryFrame styles='spell-list' contentStyles='spell-content'>
      <DropArea id={{...dropId, onDrop:onDrop}} acceptTypes={[DragDropTypes.SPELL]}>
        {
          spellList.map( (spell, index) => (
            <SpellEntry key={index} spell={spell} 
                        selected={selectedSpellIndex === index} 
                        onClick={() => selectNewSpell(spell)}/>
          ))
        }
      </DropArea>
      </InventoryFrame>
      <div className='button-area'>
        <AoButton styles='throw-button' isRed={true} onClick={useSpell}>{t('spell-use')}</AoButton>
      </div>
    </div>
  )
}