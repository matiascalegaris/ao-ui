import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { LoadJsonFile } from '../../Tools/Utils'
import Header from '../CharacterSelection/Header/header'
import LoginButton from '../CharacterSelection/LogInButton/login-button'
import AoButton from '../Common/ao-button/ao-button'
import AoInput from '../Common/ao-input/ao-input'
import DrawCharacter from '../Common/DrawCharacter/draw-character'
import Frame from '../Common/Frame/frame'
import RibbonTittle from '../Common/RibbonTittle/ribbon-tittle'
import SelectOption from '../Common/SelectOption/select-option'
import './create-character.scss'
import HeadSelector from './HeadSelector/head-selector'

const getMaleImage = selected => {
  if (selected) {
    return require('../../assets/Buttons/button_gender_man_over.png')
  }
  else {
    return require('../../assets/Buttons/button_gender_man_off.png')
  }
}
const getFemaleImage = selected => {
  if (selected) {
    return require('../../assets/Buttons/button_gender_woman_over.png')
  }
  else {
    return require('../../assets/Buttons/button_gender_woman_off.png')
  }
}

const selectHeads= (bodyList, gender, race) => {
  if (bodyList == null) return null
  return bodyList.human.male
}
const getBody = (bodyList, gender, race) => {
  if (bodyList == null) return null
  return bodyList.human.male.body
}
const attributeList = ['sta-str', 'sta-agi', 'sta-int', 'sta-cha', 'sta-cons']
const raceList = ['Humano', 'Elfo', 'Drow', 'Gnomo', 'Enano',' Orco']
const classList = [ 'Mage', 'Cleric', 'Warrior', 'Assasin', 'Bard', 'Druid', 'Paladin', 'Hunter', 'Worker', 'Pirate', 'Thief', 'Bandit']
export default function CreateCharacterScreen() {
  const [characterDefinition, setCharacterDefinition] = useState({gender:0, raceIndex:0, classId:0, face:0, name:''});
  const {name, gender, raceIndex, classId, face, bodyListInfo } = characterDefinition;
  const attrValues = [21,18,17,18,15]
  const heads = selectHeads(bodyListInfo, gender, raceIndex)
  const body = getBody(bodyListInfo, gender, raceIndex)
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
  const createCharacter = event => {
  }
  useEffect(() => {
    LoadJsonFile('/init/HeadAndBodyData.json').then(data => {
      setCharacterDefinition({ ...characterDefinition, bodyListInfo: data});
    });
  }, []);
  const handleChange = event => {
    const { value, name } = event.target;
    setCharacterDefinition({ ...characterDefinition, [name]: value});
  }
  const setGender = genderId => {
    setCharacterDefinition({ ...characterDefinition, gender: genderId});
  }
  const setRace = raceId => {
    setCharacterDefinition({ ...characterDefinition, raceIndex: raceId});
  }
  const setClass = newClassId => {
    setCharacterDefinition({ ...characterDefinition, classId: newClassId});
  }
  return (
    <div className='create-charcter'>
      <Header/>
      <div className='config-area'>
        <div className='left-panel'>
          <Frame contentStyles='sub-panel sex-selection'>
            <RibbonTittle text='género' />
            <div className='button-area'>
            <SelectOption styles='button-style' selected={gender==0} onClick={ ()=> {setGender(0)}} contentStyles='button'>
              <img className='icon' src={getMaleImage(gender==0)} />
            </SelectOption>
            <SelectOption styles='button-style' selected={gender==1} contentStyles='button' onClick={ ()=> {setGender(1)}}>
              <img className='icon' src={getFemaleImage(gender==1)} />
            </SelectOption>
            </div>
          </Frame>
          <Frame  contentStyles='sub-panel race-selection'>
            <RibbonTittle text='raza' />
            <div className='button-area'>
            {
              raceList.map( (race, index) => <SelectOption key={index} selected={raceIndex===index} styles='button-settings' onClick={ ()=> {setRace(index)}}>{t(race).toUpperCase()}</SelectOption>)
            }
            </div>
          </Frame>
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
              <HeadSelector start={heads.start} end={heads.end}/> :
              null
            }
          </div>
          <div className='character-details'>
            <div className='section-divider'></div>
            <div className='section-divider'>
              <div className='seleccion-detais'>
                <div className='details-border-left'></div>
                <div className='details-box'>
                <div className='border-left'></div>
                <div className='text-area'>
                  <p className='char-name-tittle'>{t('character name').toUpperCase()}</p>
                  <AoInput styles='name-input' inputStyles='inner-input' name="name" type="name" IsValid={true} value={name} required handleChange={handleChange}/>
                  <p className='name-rules'><Trans i18nKey="rules-desc" count={1}>rules<span className='warning'>desc</span>.</Trans></p>
                </div>
                <div className='border-right'></div>
                </div>
                <div className='details-border-right'></div>
              </div>
            </div>
            <div className='section-divider'></div>
          </div>
        </div>
        <div className='right-panel'>
        <Frame  contentStyles='sub-panel race-selection class-selection'>
            <RibbonTittle text='class' />
            <div className='button-area'>
            {
              classList.map( (uclass, index) => <SelectOption key={index} selected={classId===index} styles='button-settings' onClick={ ()=> {setClass(index)}}>{t(uclass).toUpperCase()}</SelectOption>)
            }
             <div className='select-class-details'>
              
             </div>
            </div>
          </Frame>
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