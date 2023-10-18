import { useTranslation } from "react-i18next";
import { Section } from "../Settings/Section"
import AoInput from "../../../Common/ao-input/ao-input";
import { useEffect, useState } from "react";
import Select from 'react-select';
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { Slider } from "../../../Common/Slider/slider";
import AoCheckbox from "../../../Common/ao-checkbox/ao-checkbox";
import AoButton from "../../../Common/ao-button/ao-button";
import { useDispatch, useSelector } from "react-redux";
import { selectCharacterName } from "../../../../redux/GameplaySlices/CharacterInfoSlice";
import { setGameActiveDialog } from "../../../../redux/GameplaySlices/GameStateSlice";
import GameBarButton from "../../../Common/ao-button/GameBarButton/game-bar-button";


export const CreateEvent = () => {
  const { t } = useTranslation();
  const eventTypes = [
    { value: 'deathmatch', label: t('Deathmatch'), index: 3, minPlayers:1, maxPlayers: 40, defaultMin:2, defaultMax:20, step:1, showTeamSize: true},
    { value: 'navalconquest', label: t('Abordaje'), index: 4, minPlayers:4, maxPlayers: 12, defaultMin:6, defaultMax:12, step:2, showTeamSize: false},
  ]
  const teamTypes = [
    { value: 'random', label: t('random'), index: 1 },
    { value: 'premade', label: t('premade'), index: 2},
  ]
  const [ eventInfo, setEventInfo] = useState({description:'',
     eventType: 3, 
     minLevel:1, 
     teamSize:1,
     maxLevel:47,
     requestPassword: false,
     minPlayers:eventTypes[0].defaultMin,
     maxPlayers:eventTypes[0].defaultMax,
     password:'',
     inscriptionPrice: 0,
     teamType: 1})
  const {description , eventType, teamType, minPlayers, 
         maxPlayers, minLevel, maxLevel, teamSize,
         requestPassword, password , inscriptionPrice} = eventInfo
  const handleChange = evt => {
    const { value, name } = evt.target;
    setEventInfo({ ...eventInfo, [name]: value});
  }
  const handleChangeNumeric = evt => {
    const { value, name } = evt.target;
    setEventInfo({ ...eventInfo, [name]: parseInt(value)});
  }
  
  const handleChangeBox = evt => {
    const { name } = evt.target;
    setEventInfo({...eventInfo, [name]: !eventInfo[name]})
  }
  const selectedEvent = eventTypes.find(e => ( e.index === eventType))
  const selectedTeamType = teamTypes.find(e => ( e.index === teamType))
  const updateEventOpt = evt => {
    setEventInfo({ ...eventInfo, 
      eventType: evt.index,
      minPlayers:evt.defaultMin,
      maxPlayers:evt.defaultMax,
      teamSize: Math.min(Math.floor(evt.defaultMax/2), teamSize)});
  }
  const updateTeamTypes = evt => {
    setEventInfo({ ...eventInfo, teamType: evt.index});
  }

  const setLevelRange = evt => {
    if (minLevel !== evt.minValue || maxLevel !== evt.maxValue) {
      setEventInfo({ ...eventInfo, minLevel: evt.minValue, maxLevel: evt.maxValue});
    }
    
  }

  const setPlayerRange = evt => {
    if (minPlayers === evt.minValue && maxPlayers === evt.maxValue) return
    setEventInfo({ ...eventInfo, 
      minPlayers: evt.minValue, 
      maxPlayers: evt.maxValue,
      teamSize: Math.min(Math.floor(evt.maxValue/2), teamSize)});
  }
  const setTeamSize = val => {
    setEventInfo({ ...eventInfo, teamSize: Math.round(val)});
    
  }
  const charName = useSelector(selectCharacterName)
  useEffect( () => {
    setEventInfo({ ...eventInfo, description: 'partida de ' + charName });
  }, [charName])
  const dispatch = useDispatch()
  const createNew = evt => {
    window.parent.BabelUI.CreateEvent(description, eventType, minLevel, teamSize, 
                                      maxLevel, minPlayers, maxPlayers, password, 
                                      inscriptionPrice, teamType )
    dispatch(setGameActiveDialog(null))
  }
  const updateIncriptionFee = valueChange => {
    setEventInfo({ ...eventInfo, inscriptionPrice: Math.max(inscriptionPrice + valueChange, 0)});
  }
  const validInscriptionPrice = inscriptionPrice >= 0 && inscriptionPrice < 10000000
  const validTeamSize = (minPlayers % teamSize === 0) && (maxPlayers % teamSize === 0)
  const canCreate = description.length > 0 && (validTeamSize || !selectedEvent.showTeamSize) && validInscriptionPrice
  return (
    <div className="create-event">
      <div className="column">
        <Section name={t('event-description').toUpperCase()}>
          <AoInput styles='margin-bot' inputStyles='input-style' showDelete={description.length > 0} name="description" IsValid={description.length > 4} value={description} required handleChange={handleChange} />
          <Select unstyled className="ao-selector" classNamePrefix='global-select-prop' options={eventTypes} value={selectedEvent} onChange={updateEventOpt}  />
        </Section>
        <Section name={t('teams-type').toUpperCase()}>
          <Select unstyled className="ao-selector" classNamePrefix='global-select-prop' options={teamTypes} value={selectedTeamType} onChange={updateTeamTypes}  />
        </Section>
        <Section name={t('private-match').toUpperCase()}>
          <AoCheckbox label={t('request-password')} name="requestPassword" styles='generic-checkbox' labelStyle='check-box-label' handleChange={handleChangeBox} state={requestPassword} />
          { requestPassword && <AoInput styles='margin-bot' inputStyles='input-style' showDelete={password.length > 0} name="password" IsValid={true} value={password} required handleChange={handleChange}/>}
        </Section>
        <Section name={t('incription-price').toUpperCase()}>
          <span className="inscription-fee-line margin-bot">
          <GameBarButton styles='fixed-increment' onClick={() => updateIncriptionFee(-1000)}>-1K</GameBarButton>
          <GameBarButton styles='fixed-increment' onClick={() => updateIncriptionFee(-10000)}>-10K</GameBarButton>
            <AoInput type="number" 
                    inputStyles='center-text' showDelete={false} 
                    name="inscriptionPrice" IsValid={validInscriptionPrice} 
                    min="0" max="10000000"
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    value={inscriptionPrice} handleChange={handleChangeNumeric}/>
          <GameBarButton styles='fixed-increment' onClick={() => updateIncriptionFee(1000)}>+1K</GameBarButton>
          <GameBarButton styles='fixed-increment' onClick={() => updateIncriptionFee(10000)}>+10K</GameBarButton>
          </span>
        </Section>
      </div>
      <div className="column">
        <Section name={t('level-range').toUpperCase()}>
          <MultiRangeSlider
            min={1}
            max={47}
            minValue={minLevel}
					  maxValue={maxLevel}
            onInput={setLevelRange}
            onChange={setLevelRange}
            label={true}
            ruler={false}
            step={1}
            style={{ border: "none", boxShadow: "none", padding: "15px 10px", marginBottom: '5px'}}
            barLeftColor="DimGray"
            barInnerColor="DarkSlateGray"
            barRightColor="DimGray"
            thumbLeftColor="black"
            thumbRightColor="black"
          />
          <p className="team-size-value">{minLevel} / {maxLevel}</p>
        </Section>
        <Section name={t('max-players').toUpperCase()}>
          <MultiRangeSlider            
              min={selectedEvent.minPlayers}
              max={selectedEvent.maxPlayers}
              minValue={minPlayers}
					    maxValue={maxPlayers}
              onInput={setPlayerRange}
              onChange={setPlayerRange}
              label={true}
              ruler={false}
              step={1}
              style={{ border: "none", boxShadow: "none", padding: "15px 10px", marginBottom: '5px'}}
              barLeftColor="DimGray"
              barInnerColor="DarkSlateGray"
              barRightColor="DimGray"
              thumbLeftColor="black"
              thumbRightColor="black"
            />
            <p className="team-size-value">{minPlayers} / {maxPlayers}</p>
        </Section>
        {
          selectedEvent.showTeamSize &&
          <Section name={t('team-size').toUpperCase()}>
            <div className="team-size-slider">
              <Slider min={1} max={ Math.floor(maxPlayers/2)} currentValue={teamSize} onChange={setTeamSize} />
            </div>
            <p className="team-size-value">{teamSize}</p>
            {
              !validTeamSize && <p className="error-msg">{t('invalid-team-size')}</p>
            }
          </Section>
        }
        <AoButton disabled={!canCreate} isRed={true} styles='main-action-button' onClick={createNew}>{t('create').toLocaleUpperCase()}</AoButton>
      </div>
    </div>
  )
}