import './gender-selector.scss'
import Frame from '../../Common/Frame/frame'
import RibbonTittle from '../../Common/RibbonTittle/ribbon-tittle'
import SelectOption from '../../Common/SelectOption/select-option'
import { useTranslation } from 'react-i18next'

const getMaleImage = selected => {
  if (selected) {
    return require('../../../assets/Buttons/button_gender_man_over.png')
  }
  else {
    return require('../../../assets/Buttons/button_gender_man_off.png')
  }
}
const getFemaleImage = selected => {
  if (selected) {
    return require('../../../assets/Buttons/button_gender_woman_over.png')
  }
  else {
    return require('../../../assets/Buttons/button_gender_woman_off.png')
  }
}

export default function GenderSelector ({currentSelection, onChange}) {
  const { t } = useTranslation();
  return (
    <Frame contentStyles='sub-panel sex-selection'>
      <RibbonTittle text={t('género')} />
      <div className='gradient-bg'></div>
      <div className='button-area'>
        <SelectOption styles='button-style' selected={currentSelection==0} onClick={ ()=> {onChange(0)}} contentStyles='button'>
          <img className='icon' src={getMaleImage(currentSelection==0)} />
        </SelectOption>
        <SelectOption styles='button-style' selected={currentSelection==1} contentStyles='button' onClick={ ()=> {onChange(1)}}>
          <img className='icon' src={getFemaleImage(currentSelection==1)} />
        </SelectOption>
      </div>
      <p className='selected-option'>{t(currentSelection==0 ? 'male' : 'female').toUpperCase()}</p>
    </Frame>
  )
}