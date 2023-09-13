import { useTranslation } from 'react-i18next';
import AoButton from '../../../Common/ao-button/ao-button'
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import { useDispatch } from 'react-redux';
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice';
import './world-map.scss';
import Frame from '../../../Common/Frame/frame';

const Worlds = [
  { name: 'Argentum', index: 1},
  { name: 'Dungeons', index: 2},
  { name: 'Jogormut', index: 3}
]

export const WorldMap = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const onClose = e => {
    dispatch(setGameActiveDialog(null))
  }
  const activeWorld =  Worlds[0].index; 
  const onChangeWorld = world => {

  }
  return (
    <AoDialog styles='world-map' contentStyles='content'>
      <div className='header-line'>
        <img src={require('../../../../assets/Icons/Dialogs/AOShopIcon.png')}/>
        <h1 className='game-dialog-header'>{t('worldmap').toUpperCase()}</h1>
      </div>
      <span className='header-underline'></span>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
      <div className='map-content-area'>
        <div className='map-area'>
          <div className='world-selector'>
            {
              Worlds.map( world => (
                <AoButton styles={'stats-opt-button ' + (activeWorld === world.index ? 'selected' : 'unselected')} onClick={() => onChangeWorld(world)}>{t(world.name).toUpperCase()}</AoButton>
              ))
            }
          </div>
          <Frame styles='map-grid-frame' contentStyles='map-grid'></Frame>
        </div>
        <Frame contentStyles='side-bar-area'></Frame>
      </div>
    </AoDialog>
  )
}