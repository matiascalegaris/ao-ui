import './App.scss';
import Loading from './Components/Dialogs/Loading/loading';
import LogInFlow from './Components/Login-flow/login-flow';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayErrorMessage, displayLoadingText, selectActivePopup, selectIsFadeOut, selectPopupData } from './redux/UIFlowSlice'
import ErrorMessage from './Components/Dialogs/error-message/error-message';
import {RegisterApiCallback} from './Api/Api'
import { useTranslation } from 'react-i18next';
import { setCharacter } from './redux/CharSelectionSlice';
import OptionDialog from './Components/Dialogs/OptionDialog/option-dialog';
import ValidateCode from './Components/Dialogs/validate-code/validate-code';
import TransferCharacter from './Components/Dialogs/TransferCharacter/transfer-character';
import { setStats, updateDrink, updateFood, updateGold, updateHp, updateLockState, updateMagicAttack, updateMagicResitance, updateMana, updateStamina, updateStrandAgi } from './redux/GameplaySlices/PlayerStatsSlice';
import { setCharacterInfo, setUserName, updateExp } from './redux/GameplaySlices/CharacterInfoSlice';
import { postChatMessage, setWhisperTarget } from './redux/GameplaySlices/ChatSlice';
import { resetGameplay, setFps, updateGameTime, updateIsGameMaster, updateOnlines } from './redux/GameplaySlices/GameStateSlice';
import { setInvLevel, updateInvSlot, updateKeySlot, updateSpellSlot } from './redux/GameplaySlices/InventorySlice';
import { setCoordinates, setInterestPoints, setMapInfo, updateGroupMarker } from './redux/GameplaySlices/MapInfoSlice';
import { fireInterval, updateIntervals } from './redux/GameplaySlices/Cooldowns';
import { ActiveToolTip } from './Components/Common/Tooltip/Tooltip-manager';

function App() {
  const dispatch = useDispatch()
  const { t, i18n  } = useTranslation();
  useEffect(() => {
    RegisterApiCallback('ErrorMessage', (msg, localize, action) => {
      if (localize) {
        dispatch(displayErrorMessage(t(msg)))
      }
      else {
        dispatch(displayErrorMessage(msg))
      }
    })
    RegisterApiCallback('SetLoadingMessage', (msg, localize) => {
      if (localize) {
        dispatch(displayLoadingText(t(msg)))
      }
      else {
        dispatch(displayLoadingText(msg))
      }
    })
    RegisterApiCallback('SetCharacter', (charInfo) => {
      dispatch(setCharacter(charInfo))
    })
    RegisterApiCallback('DeleteCharacterFromList', (charIndex) => {
      window.parent.APicallbacks.ConfirmDeleteChar(charIndex)
    })
    RegisterApiCallback('PostChatMsg', (msg) => {
      dispatch(postChatMessage(msg))
    })
    RegisterApiCallback('UpdateUserStats', (stats) => {
      dispatch(setStats({
        currentHp:stats.minHp,
        maxHp : stats.maxHp,
        currentMana: stats.minMan,
        maxMana: stats.maxMan,
        currentShield: stats.hpShield,
        gold: stats.gold,
        currentEnergy: stats.minSta,
        maxEnergy: stats.maxSta,
        drink: stats.minAgu,
        food: stats.minHam,
        shield: {min:0, max:0},
        weapon: {min:0, max:0},
        helm: {min:0, max:0},
        armor: {min:0, max:0},
        magicDef:0,
        magicBonus:0,
        attackLock: true,
        clanLock: true,
        groupLock: true
      }))
      dispatch(setCharacterInfo({
        class: stats.class,
        exp: {min: stats.exp, max: stats.nextLevel},
        level : stats.level
      }))
    })
    RegisterApiCallback('SetUserName', (name) => {
      dispatch(setUserName(name))
    })
    RegisterApiCallback('UpdateFps', (fps) => {
      dispatch(setFps(fps))
    })
    RegisterApiCallback('SetInventoryLevel', (level) => {
      dispatch(setInvLevel(level))
    })
    RegisterApiCallback('UpdateInvSlot', (slotInfo) => {
      dispatch(updateInvSlot(slotInfo))
    })
    RegisterApiCallback('UpdateSpellSlot', (slotInfo) => {
      dispatch(updateSpellSlot(slotInfo))
    })
    RegisterApiCallback('UpdateHp', (slotInfo) => {
      dispatch(updateHp(slotInfo))
    })
    RegisterApiCallback('UpdateMana', (slotInfo) => {
      dispatch(updateMana(slotInfo))
    })
    RegisterApiCallback('UpdateStamina', (slotInfo) => {
      dispatch(updateStamina(slotInfo))
    })
    RegisterApiCallback('UpdateFood', (slotInfo) => {
      dispatch(updateFood(slotInfo))
    })
    RegisterApiCallback('UpdateDrink', (slotInfo) => {
      dispatch(updateDrink(slotInfo))
    })
    RegisterApiCallback('UpdateGold', (gold) => {
      dispatch(updateGold(gold))
    })
    RegisterApiCallback('UpdateExp', (current, max) => {
      dispatch(updateExp({min: current, max: max}))
    })
    RegisterApiCallback('UpdateStrAndAgi', (str, agi, strState, agiState) => {
      dispatch(updateStrandAgi({str:str, agi:agi, strState:strState, agiState:agiState}))
    })
    RegisterApiCallback('UpdateMapNumber', (mapName, mapNumber, isSafe) => {
      dispatch(setMapInfo({mapName, mapNumber, isSafe}))
    })
    RegisterApiCallback('UpdateMapNpc', (data) => {
      dispatch(setInterestPoints(data))
    })
    RegisterApiCallback('UpdatePlayerCoord', (posX, PosY, MapPosX, MapPosY) => {
      dispatch(setCoordinates({x:posX, y:PosY, mapPos: {x:MapPosX, y: MapPosY}}))
    })
    RegisterApiCallback('UpdateGroupMarker', (posX, PosY, index) => {
      dispatch(updateGroupMarker({ mapPos: {x:posX, y: PosY}, index: index}))
    })
    RegisterApiCallback('PrepareGemplayScreen', () => {
      dispatch(resetGameplay)
    })
    RegisterApiCallback('UpdateKeySlot', (slotInfo) => {
      dispatch(updateKeySlot(slotInfo))
    })
    RegisterApiCallback('UpdateIntervals', (intervals) => {
      dispatch(updateIntervals(intervals))
    })
    RegisterApiCallback('StartInterval', (intervalType, tunnelDelay) => {
      dispatch(fireInterval({intervalType: intervalType, startTime: Date.now() - tunnelDelay}))
    })
    RegisterApiCallback('UpdateLockState', (type, state) => {
      dispatch(updateLockState({type:type, state:state}))
    })
    RegisterApiCallback('UpdateOnlines', (newValue) => {
      dispatch(updateOnlines(newValue))
    })
    RegisterApiCallback('UpdateGameTime', (hour, minutes) => {
      dispatch(updateGameTime({hour:hour, minutes:minutes}))
    })
    RegisterApiCallback('UpdateIsGameGaster', (state) => {
      dispatch(updateIsGameMaster(state))
    })
    RegisterApiCallback('UpdateMagicAttack', (value) => {
      dispatch(updateMagicAttack(value))
    })
    RegisterApiCallback('UpdateMagicResistance', (value) => {
      dispatch(updateMagicResitance(value))
    })
    RegisterApiCallback('SetWhisperTarget', (target) => {
      dispatch(setWhisperTarget({target:target, openChat: true}))
    })
    
    const language = window.parent.BabelUI.GetStoredLocale()
    i18n.changeLanguage(language)
  },[]);
  
  const activePopup = useSelector(selectActivePopup)
  const popupData = useSelector(selectPopupData)
  const fadeOut = useSelector(selectIsFadeOut)
  return (
    <div className='app'>
      {
        fadeOut != null ? <span className={'backgrund ' + (fadeOut ? 'go-to-black' : 'go-to-transparent') }></span> : null
      }
      <LogInFlow/>
      {
          activePopup !== '' ?
          <div className='popups'>
          {
            {
                'loading':<Loading styles='centered'>{popupData}</Loading>,
                'error-message':<ErrorMessage styles='centered'>{popupData}</ErrorMessage>,
                'option-dialog':<OptionDialog styles='centered' settings={popupData}/>,
                'validate-code':<ValidateCode styles='centered'/>,
                'transfer-character':<TransferCharacter styles='centered' settings={popupData}/>
            }
            [activePopup]
          }
          </div>
          :
          null
      }
      <ActiveToolTip/>
    </div>
  );
}

export default App;
