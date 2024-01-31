import { useDispatch } from 'react-redux'
import AoButton from '../../../Common/ao-button/ao-button'
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import './quest-dialog.scss'
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice'
import { useTranslation } from 'react-i18next'
import { Section } from '../Settings/Section'
import { FrameMap } from '../WorldMap/FrameMap/framemap'
import Frame from '../../../Common/Frame/frame'

export const QuestDialog = ({settings}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const onClose = e => {
    dispatch(setGameActiveDialog(null))
  }
  return(
    <AoDialog styles='quest-dialog' contentStyles='content'>
      <div className='header-line'>
        <img src={require('../../../../assets/Icons/gameplay/Merchant.png')}/>
        <h1 className='game-dialog-header'>{t('available quest').toUpperCase()}</h1>
      </div>
      <span className='header-underline'></span>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
      <div className='quest-info-area'>
        <Frame>

        </Frame>
        <Section name={t('description').toUpperCase()}>

        </Section>
        <div className='objective-columns'>
          <Section name={t('objectives').toUpperCase()}>
          
          </Section>
          <Section name={t('preview').toUpperCase()}>
          
          </Section>
        </div>
        <FrameMap>

        </FrameMap>
      </div>
      <span className='split-area-line'></span>
      <div className='button-line'>
        <AoButton>{t('reject').toUpperCase()}</AoButton>
        <AoButton>{t('accept').toUpperCase()}</AoButton>
      </div>
    </AoDialog>
)}