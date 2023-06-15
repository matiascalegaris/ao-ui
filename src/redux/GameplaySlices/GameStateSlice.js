import { createAction, createSlice } from '@reduxjs/toolkit'

export const resetGameplay = createAction('gaemplay/reset')

export const GameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    fps: 0,
    intervals: {bow:1200, hit:1165, magic:1230, buildWork:500,
      dropItem:800, extractWork:3000, hitMagic:800,
      hitUseItem:800, magicHit:800, useItemClick:276,
      useItemKey:380, walk:210 }
  },
  reducers: {
    setFps: (state, action) => {
      state.fps = action.payload
    },
    updateIntervals: (state, action) => {
      console.log(action.payload)
      state.intervals = action.payload
    }
  },
})

export const { setFps, updateIntervals } = GameStateSlice.actions

export const selectFps = (state) =>  state.gameState.fps
export const selectIntervals = (state) => state.gameState.intervals

export default GameStateSlice.reducer