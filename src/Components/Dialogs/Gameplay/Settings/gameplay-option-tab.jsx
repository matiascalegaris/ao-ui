import { useTranslation } from "react-i18next";
import { Section } from "./Section"
import AoCheckbox from "../../../Common/ao-checkbox/ao-checkbox";
import { useState } from "react";
import './gameplay-options.scss'
import Select from 'react-select';
import { Slider } from "../../../Common/Slider/slider";


const ThrowSpellsOptions = [
  { value: 'noLock', label: 'no-Lock', index: 0},
  { value: 'lockThrow', label: 'lock-throw', index: 1},
  { value: 'lockCast', label: 'lock-cast', index: 2},
]

const LanguageSettings = [
  { value: 'en', label: 'English', index: 0},
  { value: 'es', label: 'Español', index: 1}
]
export const GameplayTab = () => {
  const { t } = useTranslation();
  const [ copyTerminal, setCopyTerminal] = useState(true)
  const [ moveAndWrite, setMoveAndWrite] = useState(false)
  const [ blockSpellScroll, setBlockSpellScroll] = useState(false)
  const [ invertMouse, setInvertMouse] = useState(false)
  const [ graphicCursor, setGraphicCursor] = useState(false)
  const [ selectedThrowState, setSelectedThrowState] = useState(0)
  const [ selectNpcText, setSelectNpcText] = useState(0)
  const [ selectedTutorialOpt, setSelectedTutorialOpt] = useState(0)
  const [ mouseSense, setMouseSense] = useState(500)
  
  const language = window.parent.BabelUI.GetStoredLocale()
  const currentLanguage = LanguageSettings.find( e => (e.value === language))
  const throwSpellOpt = ThrowSpellsOptions.map( el => {
    return ({...el, label: t(el.label)})
  })
  const throwOption = throwSpellOpt[selectedThrowState]
  const NpcsText = [
    { value: 'Text', label: t('text'), index: 0},
    { value: 'rendered', label: t('rendered'), index: 1},
  ]
  const npcText = NpcsText[selectNpcText]
  const tutorialOptions = [
    { value: 'disabled', label: t('Disabled'), index: 0},
    { value: 'enabled', label: t('Enabled'), index: 1},
  ]
  const tutorialOpt = tutorialOptions[selectedTutorialOpt]
  const handleChangeBox = evt => {
    const { value, name } = evt.target;
    switch (name) {
      case 'copyterminal':
        setCopyTerminal(!copyTerminal)
        break;
      case 'writeandmove':
        setMoveAndWrite(!moveAndWrite)
        break;
      case 'blockScrollList':
        setBlockSpellScroll(!blockSpellScroll)
        break;
      case 'invertMouse':
        setInvertMouse(!invertMouse)
        break;
      case 'graphicCursor':
        setGraphicCursor(!graphicCursor)
        break;
    }
  }
  const updateThowOption = evt => {
    setSelectedThrowState(evt.index)
  }
  const updateNpcText = evt => {
    setSelectNpcText(evt.index)
  }
  const updateTutorialOpt = evt => {
    setSelectedTutorialOpt(evt.index)
  }
  const updateLanguage = evt => {

  }
  const mouseSenseCahnge = newVal => {
    setMouseSense(newVal)
  }
  return (
    <div className="gameplay-settings">
      <Section name={t('chat').toUpperCase()}>
        <AoCheckbox label={t('copy-terminal')} name="copyterminal" styles='chat-options' labelStyle='check-box-label' handleChange={handleChangeBox} state={copyTerminal} />
        <AoCheckbox label={t('write-and-move')} name="writeandmove" styles='chat-options' labelStyle='check-box-label' handleChange={handleChangeBox} state={moveAndWrite} />
      </Section>
      <Section name={t('fight').toUpperCase()}>
        <p className="throw-spells-title">{t('throw-spells')}</p>
        <Select unstyled className="server-selector" classNamePrefix='throw-selector-prop' options={throwSpellOpt} value={throwOption} onChange={updateThowOption}  />
        <AoCheckbox label={t('block-spell-list-scroll')} name="blockScrollList" styles='chat-options' labelStyle='check-box-label' handleChange={handleChangeBox} state={blockSpellScroll} />
      </Section>
      <Section name={t('mouse-sens').toUpperCase()}>
        <Slider min={0} max={1000} currentValue={mouseSense} onChange={mouseSenseCahnge}/>
        <div className="mouse-checkbox">
        <AoCheckbox label={t('invert')} name="invertMouse" styles='chat-options' labelStyle='check-box-label' handleChange={handleChangeBox} state={invertMouse} />
        <AoCheckbox label={t('graphic-cursor')} name="graphicCursor" styles='chat-options' labelStyle='check-box-label' handleChange={handleChangeBox} state={graphicCursor} />
        </div>
      </Section>
      <Section name={t('language').toUpperCase()}>
        <p className="throw-spells-title">{t('interface-language')}</p>
        <Select unstyled className="server-selector" classNamePrefix='throw-selector-prop' options={LanguageSettings} value={currentLanguage} onChange={updateLanguage}  />
      </Section>
      <Section name={t('other').toUpperCase()} style='other-settings'>
        <div className="flex-row">
          <p className="throw-spells-title">{t('Npc-text')}</p>
          <Select unstyled className="server-selector" classNamePrefix='throw-selector-prop' options={NpcsText} value={npcText} onChange={updateNpcText}  />
          <p className="throw-spells-title">{t('Tutorial')}</p>
          <Select unstyled className="server-selector" classNamePrefix='throw-selector-prop' options={tutorialOptions} value={tutorialOpt} onChange={updateTutorialOpt}  />
        </div>        
      </Section>
    </div>
  )}