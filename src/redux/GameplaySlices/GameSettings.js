import { createSlice } from '@reduxjs/toolkit'
import { ItemCounFormat } from '../../constants'

const defaultSettings = {
  itemCountFormat: ItemCounFormat.DisplayReduced,
  spellListScrollLock: 0,
  combatChat: 0,
  spellMode: 0,
  scrollDrag: 0
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
    }
  },
})

export const { updateSettings } = GameSettingsSlice.actions

export const selectItemCountFormat = (state) => state.gameSettings.itemCountFormat
export const selectSpellListScrollLock = (state) => state.gameSettings.spellListScrollLock


export default GameSettingsSlice.reducer