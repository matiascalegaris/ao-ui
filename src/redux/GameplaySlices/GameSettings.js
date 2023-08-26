import { createSelector, createSlice } from '@reduxjs/toolkit'
import { ItemCounFormat } from '../../constants'

const defaultSettings = {
  itemCountFormat: ItemCounFormat.DisplayReduced,
  spellListScrollLock: 0,
  combatChat: 0,
  spellMode: 0,
  scrollDrag: 0,
  featureToggles: ['hotokey-enabled'],
  hideHotkeys: false
}
export const GameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState: defaultSettings,
  reducers: {
    updateSettings: (state, action) => {
      state.itemCountFormat = action.payload.inventoryFullNumbers
      state.combatChat = action.payload.combatChat
      state.spellMode = action.payload.spellMode
      state.scrollDrag = action.payload.scrollDrag
    },
    clearFeatureToggles: (state) => {
      state.featureToggles = []
    },
    addFeatureToggle: (state, action) => {
      state.featureToggles.push(action.payload)
    },
    setHideToggles: (state, action) => {
      state.hideHotkeys = action.payload
    }
  },
})

export const { updateSettings, clearFeatureToggles, addFeatureToggle, setHideToggles } = GameSettingsSlice.actions

export const selectItemCountFormat = (state) => state.gameSettings.itemCountFormat
export const selectSpellListScrollLock = (state) => state.gameSettings.spellListScrollLock
export const selectHideHotkeys = (state) => state.gameSettings.hideHotkeys

export const isToggleEnabled = createSelector(
  [
    // Usual first input - extract value from `state`
    state => state.gameSettings.featureToggles,
    // Take the second arg, `category`, and forward to the output selector
    (state, toggleName) => toggleName
  ],
  // Output selector gets (`items, category)` as args
  (toggles, toggleName) => {
    return toggles.includes(toggleName)
  }
);

export default GameSettingsSlice.reducer