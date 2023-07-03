import { useTranslation } from 'react-i18next';
import Frame from '../../../Common/Frame/frame'
import RibbonTittle from '../../../Common/RibbonTittle/ribbon-tittle'
import SelectOption from '../../../Common/SelectOption/select-option'
import './selection-frame.scss'

export default function SelectionFrame({optionList, title, selectedOptionId, styles, showDetails, onChange}) {
  const { t } = useTranslation();
  return (
    <Frame styles={styles} contentStyles='sub-panel'>
      <div className='gradient-bg'></div>
      <RibbonTittle text={title} />
      <div className='option-area'>
        {
          optionList.map( (option, index) => (
            <SelectOption key={index} selected={selectedOptionId===index} styles='option-button' onClick={() =>onChange(index)}>
              <img className='option-icon' src={option.icon}></img>
            </SelectOption>
          )
          )
        }
      </div>
      <p className='selected-option'>{t(optionList[selectedOptionId].name).toUpperCase()}</p>
      {
        showDetails && <p className='description-area'>{t(optionList[selectedOptionId].description)}</p>
      }
    </Frame>
  )
}