
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Actions, MouseButtons } from '../../../../../../constants';
import { selectSelectedSpellSlotIndex, selectSpellList, selectSpellSlot } from '../../../../../../redux/GameplaySlices/InventorySlice';
import AoButton from '../../../../../Common/ao-button/ao-button'
import InventoryFrame from '../InventoryFrame/inventory-frame'
import './spell-selection.scss'
import SpellEntry from './SpellEntry/spell-entry';
import { useEffect, useRef, useState } from 'react';
import { selectFirstSpellToDisplay, selectTrackUserActive, updateSpellListScroll } from '../../../../../../redux/GameplaySlices/GameStateSlice';

const MouseEvents = {
  move: null,
  up: null
}
const getSpellOrderIconForState = state => {
  if (state) {
    return require('../../../../../../assets/Icons/reorder-spell/open.png')
  } else {
    return require('../../../../../../assets/Icons/reorder-spell/closed.png')
  }
}

const scrollToPos = ( parent, percent ) => {
  const targetPos = (parent.current.scrollHeight - parent.current.clientHeight) * percent
  parent.current && parent.current.scrollTo(0, targetPos)
}

const scrollToListElement = (parent, element) => {
  if (!parent.current) return
  parent.current && parent.current.scrollTo(0, parent.current.children[element].offsetTop)
}

const getSpellIndexForPos = (scrollList, childRef, height) => {
  var i = 0
  for(; i < childRef.current.length; i++) {
    const rect = childRef.current[i].getBoundingClientRect()
    if (height >= rect.top ) {
      break;
    }
  }
  for(; i < childRef.current.length; i++) {
    const rect = childRef.current[i].getBoundingClientRect()
    if (height < rect.bottom) {
      return i
    }
  }
  return Math.min(i, childRef.current.length - 1)
}
export default function SpellSelection () {
  const { t } = useTranslation();
  const [enableSpellOrder, setEnableSpellOrder] = useState(false)
  const [displayingSpell, setDisplayingSpell] = useState(-1)
  const spellList = useSelector(selectSpellList)
  const dispatch = useDispatch()
  const spellsRef = useRef([]);
  const selectedSpellIndex = useSelector(selectSelectedSpellSlotIndex)
  const selectedRef = useRef(selectedSpellIndex);

  useEffect(() => {
    selectedRef.current = selectedSpellIndex;
  }, [selectedSpellIndex]);
  const selectNewSpell = spellIndex => {
    if (spellIndex !== selectedRef.current) {
      dispatch(selectSpellSlot(spellIndex))
      window.parent.BabelUI.UpdateSelectedSpellSlot(spellIndex)
    }
  }
  //console.log('spell list render')
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
        window.parent.BabelUI.InformSpellListScroll(i)
        break;
      }
    }
  }
  const remoteTracking = useSelector(selectTrackUserActive)
  const remoteFirstslot = useSelector(selectFirstSpellToDisplay)
  useEffect(() =>{
    if (remoteFirstslot >= 0 && remoteFirstslot !== displayingSpell) {
      setDisplayingSpell(remoteFirstslot)
      scrollToListElement(scrollContiner, remoteFirstslot)
    }
 },[remoteTracking,remoteFirstslot])

  const onMouseDown = e => {
    if (e.button === MouseButtons.left) {
      selectNewSpell(getSpellIndexForPos(scrollContiner, spellsRef, e.clientY))
      const anchorPos = scrollContiner.current.getBoundingClientRect()
      if (!MouseEvents.move) {
        MouseEvents.move = evt => {
          var selectSpell = -1
          if (evt.clientY > anchorPos.bottom ) {
            const translation = (evt.clientY - anchorPos.bottom) * 10
            scrollContiner.current && scrollContiner.current.scrollTo(0, scrollContiner.current.scrollTop + translation)
            selectSpell = getSpellIndexForPos(scrollContiner, spellsRef, anchorPos.bottom)
            if (selectSpell === -1) {
              selectSpell = spellList.length - 1
            }
          } 
          else if (evt.clientY < anchorPos.top) {
            const translation = (evt.clientY - anchorPos.top) * 10
            scrollContiner.current && scrollContiner.current.scrollTo(0, scrollContiner.current.scrollTop + translation)
            selectSpell = getSpellIndexForPos(scrollContiner, spellsRef, anchorPos.top )
          }
          else {
            selectSpell = getSpellIndexForPos(scrollContiner, spellsRef, evt.clientY)
          }
          if (selectSpell >= 0 ) selectNewSpell(selectSpell)
        }      
        window.addEventListener('mousemove', MouseEvents.move, false);
      }
      if (!MouseEvents.up) {
        MouseEvents.up = evt => {
          if (MouseEvents.up !== null) {
            window.removeEventListener('mouseup', MouseEvents.up, false);
            MouseEvents.up = null
          }
          if (MouseEvents.move !== null) {
            window.removeEventListener('mousemove', MouseEvents.move, false);
            MouseEvents.move = null
          }
        }     
        window.addEventListener('mouseup', MouseEvents.up, false);
      }
    }
  }

  useEffect(() => {
    spellsRef.current = spellsRef.current.slice(0, spellList.length);
 }, [spellList]);

  
  const img = getSpellOrderIconForState(enableSpellOrder)
  return (
    <div className='spell-selection'>
      <InventoryFrame styles='spell-list' contentStyles='spell-content' 
        innerRef={scrollContiner} 
        onMouseDown={onMouseDown}
        onScroll={onScroll}>
        {
          spellList.map( (spell, index) => (
            <div key={index} ref={el => spellsRef.current[index] = el}>
              <SpellEntry spell={spell} 
                          selected={selectedSpellIndex === index} 
                          dragEnabled={enableSpellOrder}/>
            </div>
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