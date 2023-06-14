import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAttackLock, selectClanLock, selectGroupLock } from '../../../../../redux/GameplaySlices/PlayerStatsSlice';
import './menu-panel.scss'
import MenuButton from './MenuButton/menu-button'
import MenuToggle from './MenuToggle/menu-toggle';
import { Actions } from '../../../../../constants';
import { KeysDialog } from '../../../KeysDialog/keys-dialog';
import { useState } from 'react';

export default function MenuPanel() {
  const [showKey, setShowKey ] = useState({displayKeys:false})
  const { t } = useTranslation();
  const groupLock = useSelector(selectGroupLock)
  const clanLock = useSelector(selectClanLock)
  const attackLock = useSelector(selectAttackLock)
  const requestAction = action => {
    window.parent.BabelUI.RequestAction(action)
  }
  const showKeysMenu = evt => {
    setShowKey({...showKey,displayKeys:true})
  }
  const closeKeyMenu = evt => {
    setShowKey({...showKey,displayKeys:false})
  }
  return (
    <div className='menu-panel'>
      <div className='button-section'>
        <MenuButton icon={require('../../../../../assets/Icons/gameplay/ico_menu_map.png')} 
          label={t('map').toUpperCase()}
          onClick={() => {requestAction(Actions.OpenMinimap)}}
        />
        <MenuButton icon={require('../../../../../assets/Icons/gameplay/ico_menu_llavero.png')} 
          label={t('keys').toUpperCase()}
          onClick={showKeysMenu}
        />
        <MenuButton icon={require('../../../../../assets/Icons/gameplay/ico_menu_grupo.png')} 
          label={t('group').toUpperCase()}
          onClick={() => {requestAction(Actions.OpenGroupDialog)}}
        />
        <MenuButton icon={require('../../../../../assets/Icons/gameplay/ico_menu_quests.png')} 
          label={t('quest').toUpperCase()}
          onClick={() => {requestAction(Actions.OpenActiveQuest)}}
        />
        <MenuButton icon={require('../../../../../assets/Icons/gameplay/ico_menu_clanes.png')} 
          label={t('clan').toUpperCase()}
          onClick={() => {requestAction(Actions.OpenClanDialog)}}
        />
        <MenuButton icon={require('../../../../../assets/Icons/gameplay/ico_menu_home.png')} 
          label={t('home').toUpperCase()}
          onClick={() => {requestAction(Actions.GoHome)}}
        />
        <MenuButton icon={require('../../../../../assets/Icons/gameplay/ico_menu_retos.png')} 
          label={t('challenges').toUpperCase()}
          onClick={() => {requestAction(Actions.OpenChallenge)}}
        />
        <MenuButton icon={require('../../../../../assets/Icons/gameplay/ico_menu_estadisticas.png')} 
          label={t('stats').toUpperCase()}
          onClick={() => {requestAction(Actions.ShowStats)}}
        />
      </div>
      <img src={require('../../../../../assets/Misc/main_inv_divider.png')}/>
      <div className='toggles-bar'>
        <span className='horizontal-gap10'></span>
        <MenuToggle status={groupLock}><img src={require('../../../../../assets/Icons/gameplay/ico_chat.png')}/></MenuToggle>
        <MenuToggle status={clanLock}><img src={require('../../../../../assets/Icons/gameplay/ico_clanes.png')}/></MenuToggle>
        <MenuToggle status={attackLock}><img src={require('../../../../../assets/Icons/gameplay/ico_key.png')}/></MenuToggle>
        <MenuToggle status={attackLock}><img src={require('../../../../../assets/Icons/gameplay/ico_key.png')}/></MenuToggle>
        <span className='spacer'></span>
        <div className='report-bug'>
          <p className='reportText'>{t('report-bug')}</p>
          <img src={require('../../../../../assets/Icons/gameplay/ico_bugs.png')}/>
        </div>
      </div>
      {
        showKey.displayKeys ? <KeysDialog styles='keys-menu' onClose={closeKeyMenu}></KeysDialog> : null
      }
    </div>
  )
}