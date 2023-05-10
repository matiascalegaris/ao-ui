import { createSlice } from '@reduxjs/toolkit'

export const CharacterInfoSlice = createSlice({
  name: 'characterInfo',
  initialState: {
    name: 'Osim',
    class: 'Warrior',
    exp: {min:0, max:10},
    level: 1,
    time: '00:05'
  },
  reducers: {
    setCharacterInfo: (state, action) => {
      state.name = action.payload.name
      state.class = action.payload.class
      state.exp = action.payload.exp
    },
    updateExp: (state, action)=> {
      state.exp = action.payload.exp
    }
  },
})

export const { setCharacterInfo, updateExp } = CharacterInfoSlice.actions

export const selectCharacterName = (state) =>  state.characterInfo.name
export const selectCharacterLevel = (state) => state.characterInfo.level
export const selectCharacterClass = (state) => state.characterInfo.class
export const selectCharacterExp = (state) => state.characterInfo.exp
export const selectGameTime = (state) => state.characterInfo.time

export default CharacterInfoSlice.reducer