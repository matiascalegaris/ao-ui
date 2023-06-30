import { createAction, createSlice } from '@reduxjs/toolkit'

export const resetGameplay = createAction('gamemplay/reset')
export const exitGameplay = createAction('gameplay/exit')

export const GameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    fps: 0,
    online: 0,
    gameTime: {hour:0, minutes:0},
    isGameMaster: false,
    activeDialog: null,
    spellListScroll: 0,
    firstDisplaySpell: -1
  },
  reducers: {
    setFps: (state, action) => {
      state.fps = action.payload
    },
    setGameActiveDialog: (state, action) => {
      state.activeDialog = action.payload
      window.parent.BabelUI.UpdateOpenDialog(action.payload != null)
    },
    updateOnlines: (state, action) => {
      state.online = action.payload
    },
    updateGameTime: (state, action) => {
      if (action.payload.hour !== state.gameTime.hour ||
          action.payload.minutes !== state.gameTime.minutes){
        state.gameTime = action.payload
      }
    },
    updateIsGameMaster: (state, action) => {
      state.isGameMaster = action.payload
    },
    updateSpellListScroll: (state, action) => {
      state.spellListScroll = action.payload
    },
    updateFirstSpellToDisplay: (state, action) => {
      state.firstDisplaySpell = action.payload
    },
    extraReducers: (builder) => {
      builder
        .addCase(resetGameplay, (state) => {
          state.activeDialog = null
        })
        .addCase(exitGameplay, (state) => {
          state.activeDialog = null
          window.parent.BabelUI.UpdateOpenDialog(false)
        })
    },
  },
})

export const { setFps, setGameActiveDialog, updateOnlines, updateGameTime,
               updateIsGameMaster, updateSpellListScroll,
               updateFirstSpellToDisplay } = GameStateSlice.actions

export const selectFps = (state) =>  state.gameState.fps
export const selectOnlines = (state) => state.gameState.online
export const selectActiveDialog = (state) => state.gameState.activeDialog
export const selectGameTime = (state) => state.gameState.gameTime
export const selectIsGameMaster = (state) => state.gameState.isGameMaster
export const selectSpellListScroll = (state) => state.gameState.spellListScroll
export const selectFirstSpellToDisplay = (state) => state.gameState.firstDisplaySpell

export default GameStateSlice.reducer