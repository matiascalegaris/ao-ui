import { useTranslation } from 'react-i18next';
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import './settings-dialog.scss'
import { useState } from 'react';
import AoButton from '../../../Common/ao-button/ao-button';
import { GameplayTab } from './gameplay-option-tab';

export const SettingsDialog = ({settings}) => {
  const { t } = useTranslation();
  const [activePannel, setActivePannel] = useState('gameplay');
  const onChange = panel => {
    setActivePannel(panel)
  }
  return (
  <AoDialog styles='settings-dialog' contentStyles='content'>
    <div className='header-line'>
      <h1 className='game-dialog-header'>{t('settings').toUpperCase()}</h1>
    </div>
    <span className='header-underline'></span>
    <div className='sub-menu-selection'>
      <AoButton styles={'stats-opt-button ' + (activePannel === 'gameplay' ? 'selected' : 'unselected')} onClick={() => onChange('gameplay')}>{t("gameplay").toUpperCase()}</AoButton>
      <AoButton styles={'stats-opt-button ' + (activePannel === 'video' ? 'selected' : 'unselected')} onClick={() => onChange('video')}>{t("video").toUpperCase()}</AoButton>
      <AoButton styles={'stats-opt-button ' + (activePannel === 'audio' ? 'selected' : 'unselected')} onClick={() => onChange('audio')}>{t("audio").toUpperCase()}</AoButton>
    </div>
    {
      {
        'gameplay':<GameplayTab styles='centered'/>,
        'video':<GameplayTab styles='centered'/>,
        'audio':<GameplayTab/>
      }
      [activePannel]
    }
  </AoDialog> 
)}