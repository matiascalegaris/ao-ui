import { createSlice } from '@reduxjs/toolkit'

export const CooldownSlice = createSlice({
  name: 'cooldowns',
  initialState: {
    intervals: {bow:1200, hit:1165, magic:1230, buildWork:500,
      dropItem:800, extractWork:3000, hitMagic:800,
      hitUseItem:800, magicHit:800, useItemClick:276,
      useItemKey:380, walk:210 },
    activeInterval: Array(20).fill(0),
  },
  reducers: {
    updateIntervals: (state, action) => {
      state.intervals = action.payload
    },
    fireInterval: (state, action) => {
      console.log('fire interval ')
      console.log(action.payload)
      state.activeInterval[action.payload.intervalType] = action.payload.startTime
    }
  },
})

export const { updateIntervals, fireInterval } = CooldownSlice.actions

export const selectIntervals = (state) => state.cooldowns.intervals
export const selectActiveIntervals = (state) => state.cooldowns.activeInterval


export default CooldownSlice.reducer