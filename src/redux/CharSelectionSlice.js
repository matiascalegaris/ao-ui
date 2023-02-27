import { createSlice } from '@reduxjs/toolkit'

export const CharSelectionSlice = createSlice({
  name: 'charSelection',
  initialState: {
    charactersList: [{}],
    selectedIndex: -1,
  },
  reducers: {
    selectCharacter : (state, action) => {
      state.selectedIndex = action.payload
    },
    removeCharacter : (state, action) => {
      state.charactersList[action.payload] = {}
    },
    setCharacter : (state, action) => {
      state.charactersList[action.payload.index] = action.payload
    },
    clearCharList: (state) => {
      state.charactersList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
      state.selectedIndex = -1
    }
  },
})

export const { selectCharacter, removeCharacter, setCharacter, clearCharList } = CharSelectionSlice.actions

export const selectSelectedIndex = (state) =>  state.charSelection.selectedIndex

export const selectAvailableCharacters = (state) => state.charSelection.charactersList

export const selectSelectedCharacter = (state) => {
  if (state.charSelection.selectedIndex >= 0) {
    return state.charSelection.charactersList[state.charSelection.selectedIndex]
  }
  return null;
}

export default CharSelectionSlice.reducer