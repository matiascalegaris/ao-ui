import { createAction, createSlice } from '@reduxjs/toolkit'

export const resetGameplay = createAction('gaemplay/reset')

export const GameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    fps: 0
  },
  reducers: {
    setFps: (state, action) => {
      state.fps = action.payload
    }
  },
})

export const { setFps } = GameStateSlice.actions

export const selectFps = (state) =>  state.gameState.fps

export default GameStateSlice.reducer