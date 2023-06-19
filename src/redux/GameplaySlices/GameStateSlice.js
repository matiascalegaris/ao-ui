import { createAction, createSlice } from '@reduxjs/toolkit'

export const resetGameplay = createAction('gaemplay/reset')

export const GameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    fps: 0,
    activeDialog: null
  },
  reducers: {
    setFps: (state, action) => {
      state.fps = action.payload
    },
    setActiveDialog: (state, action) => {
      state.activeDialog = action.payload
    },
    extraReducers: (builder) => {
      builder
        .addCase(resetGameplay, (state) => {
          state.activeDialog = null
        })
    },
  },
})

export const { setFps, setActiveDialog } = GameStateSlice.actions

export const selectFps = (state) =>  state.gameState.fps

export default GameStateSlice.reducer