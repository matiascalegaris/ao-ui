import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setActiveDialog } from '../../redux/UIFlowSlice'
import { LoadJsonFile } from '../../Tools/Utils'
import Header from '../CharacterSelection/Header/header'
import LoginButton from '../CharacterSelection/LogInButton/login-button'

import DrawCharacter from '../Common/DrawCharacter/draw-character'
import Frame from '../Common/Frame/frame'
import RibbonTittle from '../Common/RibbonTittle/ribbon-tittle'
import SelectOption from '../Common/SelectOption/select-option'
import './create-character.scss'
import GenderSelector from './GenderSelector/gender-selector'
import HeadSelector from './HeadSelector/head-selector'
import NameInputArea from './NameInputArea/name-input-area'
import SelectionFrame from './SelectionFrame/selection-frame'

const getOptionsForRace = (bodyList, race) => {
  switch(race) {
    case 0:
      return bodyList.Human
    case 1:
      return bodyList.Elf
    case 2:
      return bodyList.Drow
    case 3:
      return bodyList.Gnome
    case 4:
      return bodyList.Dwarf
    case 5:
      return bodyList.Orc
  }
  return null
}

const selectStats = (bodyList, race) => {
  if (bodyList == null) return [18, 18, 18, 18, 18]
  return getOptionsForRace(bodyList, race).stats
}
const selectHeads= (bodyList, gender, race) => {
  if (bodyList == null) return null
  if (gender == 0) {
    return getOptionsForRace(bodyList, race).male
  }
  else {
    return getOptionsForRace(bodyList, race).female
  }
}
const getBody = (bodyList, gender, race) => {
  if (bodyList == null) return null
  if (gender == 0) {
    return getOptionsForRace(bodyList, race).male.body
  }
  else {
    return getOptionsForRace(bodyList, race).female.body
  }
}
const getCityList = () => {
  return [
    'Ullathorpe', 'nix', 'Arghal', 'Banderbill', 'Lindos'
  ]
}
const attributeList = ['sta-str', 'sta-agi', 'sta-int', 'sta-cha', 'sta-cons']
const raceList = ['Humano', 'Elfo', 'Drow', 'Gnomo', 'Enano',' Orco']
const classList = [ 'Mage', 'Cleric', 'Warrior', 'Assasin', 'Bard', 'Druid', 'Paladin', 'Hunter', 'Worker', 'Pirate', 'Thief', 'Bandit']
export default function CreateCharacterScreen() {
  const [characterDefinition, setCharacterDefinition] = useState({gender:0,
                                                                 raceIndex:0,
                                                                 classId:0,
                                                                 face:0,
                                                                 name:'',
                                                                 homeCity:0
                                                                });
  const {name, gender, raceIndex, classId, face, bodyListInfo, homeCity } = characterDefinition;
  const attrValues = selectStats(bodyListInfo, raceIndex)
  const heads = selectHeads(bodyListInfo, gender, raceIndex)
  const body = getBody(bodyListInfo, gender, raceIndex)
  const availableCity = getCityList()
  const attrColor = attrValues.map( value => {
    if (value > 18) {
      return 'attr-green'
    }
    else if (value < 18) {
      return 'attr-red'
    }
    return ''
  })
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const createCharacter = event => {
  }
  useEffect(() => {
    LoadJsonFile('/init/HeadAndBodyData.json').then(data => {
      setCharacterDefinition({ ...characterDefinition, bodyListInfo: data,
                            face: selectHeads(data, gender, raceIndex).start});
    });
  }, []);
  const handleChange = event => {
    const { value, name } = event.target;
    setCharacterDefinition({ ...characterDefinition, [name]: value});
  }
  const setGender = genderId => {
    if (genderId !== gender) {
      const newFace = selectHeads(bodyListInfo, genderId, raceIndex).start
      setCharacterDefinition({ ...characterDefinition, gender: genderId,
                              face:newFace });
    }
  }
  const setRace = raceId => {
    if (raceId !== raceIndex) {
      setCharacterDefinition({ ...characterDefinition, raceIndex: raceId,
                               face: selectHeads(bodyListInfo, gender, raceId).start});
    }
  }
  const setHome = cityID => {
    if (cityID !== homeCity) {
      setCharacterDefinition({ ...characterDefinition, homeCity: cityID});
    }
  }
  const updateHead = newHeadID => {
    setCharacterDefinition({ ...characterDefinition, face: newHeadID});
  }
  const setClass = newClassId => {
    setCharacterDefinition({ ...characterDefinition, classId: newClassId});
  }
  const doBack = event => {
    event.preventDefault();
    dispatch(setActiveDialog('character-selection'))
  }
  return (
    <div className='create-charcter'>
      <Header goBack={doBack}/>
      <div className='config-area'>
        <div className='left-panel'>
          <GenderSelector currentSelection={gender} onChange={setGender} />
          <SelectionFrame optionList={raceList} 
                          title={t('raza')} 
                          selectedOptionId={raceIndex} 
                          onChange={setRace}/>
          <Frame contentStyles='sub-panel '>
            <RibbonTittle text='atributos' />
            <div className='attribute-list'>
              {
                attributeList.map( (attr, index) => (
                  <div className='attrib-line' key={index}>
                    <p className='attr-name'>{t(attr)}</p>
                    <p className={'attr-value ' + attrColor[index] }>{attrValues[index]}</p>
                  </div>
                ))
              }
            </div>
          </Frame>
        </div>
        <div className='mid-panel'>
          <div className='character-preview'>
            {
              body != null ?
              <DrawCharacter body={body} head={face}/>
              : null
            }
            {
              heads != null ?
              <HeadSelector start={heads.start} 
                            end={heads.end} 
                            onUpdateSelection={updateHead} 
                            currentSelected={face}/> :
              null
            }
          </div>
          <NameInputArea onChange={handleChange} currentName={name} />
        </div>
        <div className='right-panel'>
          <SelectionFrame styles='extend-frame' 
                          optionList={classList} 
                          title={t('class-tittle')} 
                          showDetails={true}
                          selectedOptionId={classId} 
                          onChange={setClass}/>
          <SelectionFrame optionList={availableCity} 
                          title={t('city')} 
                          selectedOptionId={homeCity} 
                          onChange={setHome}/>
        </div>
      </div>
      <div className='bottom-leather'>
        <div className='button-area'>
          <div className='bar-layer'>
            <div className='bar-img'></div>
          </div>
          <div className='button-layer'>
            <LoginButton onClick={createCharacter}>{t('create character').toUpperCase()}</LoginButton>
          </div>
        </div>
      </div>
    </div>
  )
}