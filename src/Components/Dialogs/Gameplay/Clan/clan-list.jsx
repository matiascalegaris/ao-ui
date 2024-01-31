import './clan-list.scss'
import AoDialog from "../../../Common/ao-dialog/ao-dialog";
import AoButton from '../../../Common/ao-button/ao-button';
import { useState } from 'react';
import AoInput from '../../../Common/ao-input/ao-input';
import { useTranslation } from 'react-i18next';
import { Actions, GuildAlignment, GuildAlignmentsStr } from '../../../../constants';
import { useDispatch } from 'react-redux';
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice';

export const ClanListDialog = ({contentInfo}) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [aligment, setAligment] = useState(GuildAlignment.Neutral)
  
  const dispatch = useDispatch()
  
  const alignmentFilter = aligment === -1 ? contentInfo.details.guildList : contentInfo.details.guildList.filter( el => el.aligment === aligment)
  const searchTerm = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleUpperCase()
  const clanes = search ? alignmentFilter.filter( e => 
    e.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleUpperCase().includes(searchTerm)
  ) : alignmentFilter
  let styleAlineacion = ''
  if(aligment === GuildAlignment.Chaos) {
    styleAlineacion = ' red'
  }
  if(aligment === GuildAlignment.Army) {
    styleAlineacion = ' blue'
  }
  
  const onSelectClan = (evt, guildIndex) => {
    window.parent.BabelUI.RequestAction(Actions.eDisplayGuildDetails, guildIndex)
  }
  const onClose = evt => {
    dispatch(setGameActiveDialog(null))
  }
  return (
    <AoDialog styles='clan-dialog' ignoreAnimation={true}>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
      <div className="clan-list-dialog">
        <div className='title'>
          <img className='frame-sep' src={require('../../../../assets/Icons/Dialogs/clan-flag.png')} />
          <h2>{t('guilds').toLocaleUpperCase()}</h2>
        </div>
        
        <img className='frame-sep' src={require('../../../../assets/frame/top-center.jpg')} />
        <div className='list-box'>
          <div className='filters'>
            <AoInput 
              styles={'btn'} 
              placeholder={t('Search clan')}
              name="search" 
              value={search} 
              handleChange={(e) => setSearch(e.target.value)} 
              inputStyles={'search-input'}
              imgStyles={'search-img'}
              showDelete={search}
              showSearch={true}
            />
            <div className='select'>
              <label htmlFor='Alineacion' >{t('Alineación')}</label>
              <select 
                id='aligment' 
                className="btn aligment" 
                name="aligment"
                value={aligment}
                onChange={(e) => setAligment(parseInt(e.target.value))}
              >
                <option value={-1}>{t('Todas')}</option>
                {
                  GuildAlignmentsStr.map( (str, index) => (
                    <option key={index} value={index}>{t(str)}</option>    
                  ))
                }
              </select>
            </div>
          </div>
          <div className={'list '+ styleAlineacion}>
            {clanes.map((clan) => 
              <span 
                className='clan-opt'
                onDoubleClick={evt => {onSelectClan(evt, clan.index)}}
              >
                {clan.name}
              </span>)
            }
          </div>
        </div>
        <img className='frame-sep small' src={require('../../../../assets/frame/top-center.jpg')} />
        <div className='last'>
          <AoButton caption='guardar' styles='fundar'>{t('CREATE CLAN')}</AoButton>
        </div>
      </div> 
    </AoDialog>  
  )
}