import { useTranslation } from 'react-i18next';
import Frame from '../../Common/Frame/frame'
import './keys-dialog.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectKeys, selectKeySlot, selectSelectedKeyIdex } from '../../../redux/GameplaySlices/InventorySlice';
import InventorySlot from '../../Common/InventorySlot/inventory-slot';
import GameBarButton from '../../Common/ao-button/GameBarButton/game-bar-button';

export const KeysDialog = ({styles, onClose}) => {
  const { t } = useTranslation();
  const keyList = useSelector(selectKeys)
  const selectedKey = useSelector(selectSelectedKeyIdex)
  const dispatch = useDispatch()

  const onSelecKey = item => {
    if (item.index !== selectedKey) {
      dispatch(selectKeySlot(item.index))
      window.parent.BabelUI.UpdateSelectedKeySlot(item.index)
    }
  }
  const onUseKey = item => {
    window.parent.BabelUI.UseKeySlotIndex(item.index)
  }

  const onDrop = (item, container) => {

  }
  return (
    <Frame styles={styles} ignoreAnimation={true} >
      <h1 className='keys-header'>{t('keys').toUpperCase()}</h1>
      <div className='key-area'>
        {
          keyList.map( (item,index) => (
            <InventorySlot key={item.index} content={item} 
                            onSelect={onSelecKey} 
                            onActivate={onUseKey}
                            selected={index === selectedKey}
                            dropId={{type:'inventory', id:item.index}}
                            onDropAction={onDrop}/>
          ))
        }
      </div>
      <GameBarButton styles='close-button' onClick={onClose}>
          <img src={require('../../../assets/Icons/gameplay/ico_close.png')}></img>
        </GameBarButton>
    </Frame>
  )
}