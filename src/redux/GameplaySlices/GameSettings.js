import { createSlice } from '@reduxjs/toolkit'
import { ItemCounFormat } from '../../constants'

const defaultSettings = {
  itemCountFormat: ItemCounFormat.DisplayReduced,
  spellListScrollLock: 0,
  combatChat: 0,
  spellMode: 0,
  scrollDrag: 0,
  displayHotkeyBar: false
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
    setDisplayHotkeys: (state, action) => {
      state.displayHotkeyBar = action.payload
    }
  },
})

export const { updateSettings, setDisplayHotkeys } = GameSettingsSlice.actions

export const selectItemCountFormat = (state) => state.gameSettings.itemCountFormat
export const selectSpellListScrollLock = (state) => state.gameSettings.spellListScrollLock
export const selectDisplayHotkeys = (state) => state.gameSettings.displayHotkeyBar


export default GameSettingsSlice.reducer