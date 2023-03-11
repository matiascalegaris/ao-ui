import { useTranslation } from 'react-i18next';
import Frame from '../../Common/Frame/frame'
import RibbonTittle from '../../Common/RibbonTittle/ribbon-tittle'
import SelectOption from '../../Common/SelectOption/select-option'
import './selection-frame.scss'

export default function SelectionFrame({optionList, title, selectedOptionId, styles, showDetails, onChange}) {
  const { t } = useTranslation();
  const opntions = optionList.map( opt => (
    {
      name: opt,
      description: `${opt}-desc`,
      icon: `../../../assets/icons/${opt}`
    }
  ))
  return (
    <Frame styles={styles} contentStyles='sub-panel'>
      <RibbonTittle text={title} />
      <div className='option-area'>
        {
          opntions.map( (option, index) => (
            <SelectOption key={index} selected={selectedOptionId===index} styles='option-button' onClick={() =>onChange(index)}></SelectOption>
          )
          )
        }
      </div>
      <p className='selected-option'>{t(opntions[selectedOptionId].name).toUpperCase()}</p>
      {
        showDetails && <p className='description-area'>{t(opntions[selectedOptionId].description)}</p>
      }
    </Frame>
  )
}