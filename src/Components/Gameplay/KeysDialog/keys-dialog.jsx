import { useTranslation } from 'react-i18next';
import Frame from '../../Common/Frame/frame'
import './keys-dialog.scss'
import { useSelector } from 'react-redux';
import { selectKeys } from '../../../redux/GameplaySlices/InventorySlice';
import InventorySlot from '../../Common/InventorySlot/inventory-slot';

export const KeysDialog = ({styles}) => {
  const { t } = useTranslation();
  const keyList = useSelector(selectKeys)

  const onSelecKey = evt => {

  }
  const onUseKey = evt => {

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
                            selected={index === 1}
                            dropId={{type:'inventory', id:item.index}}
                            onDropAction={onDrop}/>
          ))
        }
      </div>
    </Frame>
  )
}