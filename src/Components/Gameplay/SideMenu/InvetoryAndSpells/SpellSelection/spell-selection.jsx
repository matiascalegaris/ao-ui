
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Actions, DragDropTypes } from '../../../../../constants';
import { selectSelectedSpellSlotIndex, selectSpellList, selectSpellSlot } from '../../../../../redux/GameplaySlices/InventorySlice';
import AoButton from '../../../../Common/ao-button/ao-button'
import InventoryFrame from '../InventoryFrame/inventory-frame'
import './spell-selection.scss'
import SpellEntry from './SpellEntry/spell-entry';
import { DropArea } from '../../../../Common/DropArea';
import { useEffect, useRef, useState } from 'react';
import { updateSpellListScroll } from '../../../../../redux/GameplaySlices/GameStateSlice';


const getSpellOrderIconForState = state => {
  if (state) {
    return require('../../../../../assets/Icons/reorder-spell/open.png')
  } else {
    return require('../../../../../assets/Icons/reorder-spell/closed.png')
  }
}

const scrollToPos = ( parent, percent ) => {
  const targetPos = (parent.current.scrollHeight - parent.current.clientHeight) * percent
  parent.current && parent.current.scrollTo(0, targetPos)
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
  const scrollContiner = useRef(null)
  const store = useStore(); 
  useEffect(() =>{
    const scrollValue = store.getState().gameState.spellListScroll;
    scrollToPos(scrollContiner, scrollValue)
 },[])
  
  const onScroll = evt => {
    if (!scrollContiner.current) return
    const percent = scrollContiner.current.scrollTop / (scrollContiner.current.scrollHeight - scrollContiner.current.clientHeight)
    dispatch(updateSpellListScroll(percent))
    for (let i = 0; i < scrollContiner.current.children.length; i++) {
      if (scrollContiner.current.scrollTop <= scrollContiner.current.children[i].offsetTop + (scrollContiner.current.children[i].offsetHeight / 2)) {
        console.log("first element in view = " + i)
        break;
      }
    }
    window.parent.BabelUI.InformSpellListScroll(percent)
  }
  const img = getSpellOrderIconForState(enableSpellOrder)
  return (
    <div className='spell-selection'>
      <InventoryFrame styles='spell-list' contentStyles='spell-content' innerRef={scrollContiner} onScroll={onScroll}>
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