import { createSlice } from '@reduxjs/toolkit'

export const CharacterInfoSlice = createSlice({
  name: 'characterInfo',
  initialState: {
    name: 'Uff al sudar',
    class: 1,
    exp: {min:0, max:0},
    level: 1,
  },
  reducers: {
    setCharacterInfo: (state, action) => {
      state.class = action.payload.class
      state.exp = action.payload.exp
      state.level = action.payload.level
    },
    updateExp: (state, action)=> {
      state.exp = action.payload
    },
    setUserName: (state, action) => {
      state.name = action.payload
    }
  },
})

export const { setCharacterInfo, updateExp, setUserName } = CharacterInfoSlice.actions

export const selectCharacterName = (state) =>  state.characterInfo.name
export const selectCharacterLevel = (state) => state.characterInfo.level
export const selectCharacterClass = (state) => state.characterInfo.class
export const selectCharacterExp = (state) => state.characterInfo.exp

export default CharacterInfoSlice.reducer