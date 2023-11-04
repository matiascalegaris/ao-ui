import { useState } from 'react'
import AoDialog from '../../../../Common/ao-dialog/ao-dialog'
import AoInput from '../../../../Common/ao-input/ao-input'
import './find-npc.scss'
import { useTranslation } from 'react-i18next'
import Frame from '../../../../Common/Frame/frame'
import AoButton from '../../../../Common/ao-button/ao-button'
import { Worlds } from '../../../../../constants'

var NcpDirectory = null;
const GetNpcList = worlds => {
  if (NcpDirectory === null) {
    NcpDirectory = {}
    for (var i = 0; i < worlds.length; i++) {
      let mapDetailKeys = Object.keys(worlds[i].mapDetails)
      for (var j = 0; j < mapDetailKeys.length; j++) {
        if (worlds[i].mapDetails[mapDetailKeys[j]].npcList) {
          for (var npcI = 0; npcI < worlds[i].mapDetails[mapDetailKeys[j]].npcList.length; npcI++) {
            var npcId = worlds[i].mapDetails[mapDetailKeys[j]].npcList[npcI].index
            if (NcpDirectory[npcId] === undefined) {
              NcpDirectory[npcId] = {
                name: worlds[i].mapDetails[mapDetailKeys[j]].npcList[npcI].name,
                mapList: [{mapIndex:mapDetailKeys[j], 
                          mapName: worlds[i].mapDetails[mapDetailKeys[j]].name,
                          count: worlds[i].mapDetails[mapDetailKeys[j]].npcList[npcI].count, 
                          world: Worlds[i].index }]
              }
            } else {
              NcpDirectory[npcId].mapList.push( {mapIndex:mapDetailKeys[j], 
                mapName: worlds[i].mapDetails[mapDetailKeys[j]].name,
                count: worlds[i].mapDetails[mapDetailKeys[j]].npcList[npcI].count, 
                world: Worlds[i].index })
            }
          } 
        }       
      }
    }
  }
  return NcpDirectory;
}

export const FindNpc = ({onClose, onSelectMap, worldInfo}) => {
  const { t } = useTranslation();
  const [ dialogState, setDialogState] = useState({search:'', selectedIndex: -1})
  const { search, selectedIndex } = dialogState;

  const npcList = GetNpcList(worldInfo)
  console.log(npcList)
  const searchTerm = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleUpperCase()
  const npcKeys = Object.keys(npcList)
  const filteredList = npcKeys.filter( e => 
    npcList[e].name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleUpperCase().includes(searchTerm)
  )

  const mapList = npcList[selectedIndex] ? npcList[selectedIndex].mapList : null
  const handleChange = event => {
    const { value, name } = event.target;
    setDialogState({ ...dialogState, [name]: value});
  }

  const selectNpc = npcIndex => {
    setDialogState({ ...dialogState, selectedIndex: npcIndex});
  }
  return (
    <AoDialog styles='find-npc' contentStyles='content'>
      <div className='header-line'>
        <h1 className='game-dialog-header'>{t('npc-search').toUpperCase()}</h1>
      </div>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
      <span className='find-header-underline'></span>
      <div className='search-area'>
        <p className='search-text'>{t('search')}</p>
        <AoInput styles='search-input' name="search" value={search} IsValid={true} showDelete={search.length > 0} required handleChange={handleChange} />
      </div>

      <div className='result-area'>
        <Frame contentStyles='npc-list'>
        {
          filteredList.map( (el, index) => (
            <p key={index} className={'npc-name ' + ( el === selectedIndex ? 'selected-npc' : '')} onClick={ () => selectNpc(el)}>{npcList[el].name}</p>
          ))
        }
        </Frame>
        <Frame contentStyles='map-list'>
          <div className='element-line list-header'>
            <p className='mapNumber header-style'>{t('map').toLocaleUpperCase()}</p>
            <p className='mapName header-style'>{t('name').toLocaleUpperCase()}</p>
            <p className='world-name header-style'>{t('Continent').toLocaleUpperCase()}</p>
            <p className='npcCount header-style'>{t('amount').toLocaleUpperCase()}</p>
          </div>
          <div className='item-list'>
           {
              mapList && mapList.map( el => (
                <div className={'element-line '} onDoubleClick={()=>onSelectMap(el.mapIndex, selectedIndex)}>
                  <p className='mapNumber'>{el.mapIndex}</p>
                  <p className='mapName'>{el.mapName}</p>
                  <p className='world-name'>{Worlds[el.world].name}</p>
                  <p className='npcCount'>{el.count}</p>
                </div>
              ))
           }
          </div>
        </Frame>
      </div>
    </AoDialog>
  )
}