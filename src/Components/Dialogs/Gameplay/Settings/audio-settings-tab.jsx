import { useTranslation } from "react-i18next";
import './audio-settings-tab.scss'
import { Section } from "./Section";
import AoCheckbox from "../../../Common/ao-checkbox/ao-checkbox";
import { useState } from "react";
import { Slider } from "../../../Common/Slider/slider";

export const AudioSettingsTab = () => {
  const { t } = useTranslation();
  const [ audioSettings, setAudioSettings ] = useState ({music:true, fx:true, ambient:true, navigationFx: true, invertLR:false, musicVol: 500, fxVol: 500, ambientVol: 500})
  const { music, fx, ambient, navigationFx, invertLR, musicVol, fxVol, ambientVol} = audioSettings

  const handleChange = evt => {
    const { value, name } = evt.target;
  }
  const setAudioMusicVol = evt => {

  }
  const setAudioFxVol = evt => {
    
  }
  const setAudioAmbientVol = evt => {
    
  }
  return (
    <div className="audio-settings-tab">
      <div className="option-column">
        <Section name={t('sound').toUpperCase()}>
          <AoCheckbox label={t('music')} name="music" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={music} />
          <AoCheckbox label={t('fx')} name="fx" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={fx} />
          <AoCheckbox label={t('ambient')} name="ambient" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={ambient} />
          <AoCheckbox label={t('navigationFx')} name="navigationFx" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={navigationFx} />
          <AoCheckbox label={t('invertLR')} name="invertLR" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={invertLR} />
        </Section>
      </div>
      <div className="option-column">
        <Section name={t('musicvolume').toUpperCase()}>
          <Slider min={0} max={1000} currentValue={musicVol} onChange={setAudioMusicVol}/>
        </Section>
        <Section name={t('fx-volume').toUpperCase()}>
          <Slider min={0} max={1000} currentValue={fxVol} onChange={setAudioFxVol}/>
        </Section>
        <Section name={t('ambient-volume').toUpperCase()}>
          <Slider min={0} max={1000} currentValue={ambientVol} onChange={setAudioAmbientVol}/>
        </Section>
      </div>
    </div>
)}