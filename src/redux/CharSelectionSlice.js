import { createSlice } from '@reduxjs/toolkit'

export const CharSelectionSlice = createSlice({
  name: 'charSelection',
  initialState: {
    charactersList: [{index:0}, {index:1}, {index:2}, {index:3}, {index:4}, {index:5}, {index:6}, {index:7}, {index:8}, {index:9}],
    selectedIndex: -1,
  },
  reducers: {
    selectCharacter : (state, action) => {
      state.selectedIndex = action.payload
    },
    removeCharacter : (state, action) => {
      state.charactersList.splice(action.payload, 1);
      state.charactersList = state.charactersList.map( element => {
        if (element.index > action.payload) {
          element.index -= 1
        }
        return element
      })
      state.selectedIndex = 0
      state.charactersList.push({index:9})
    },
    setCharacter : (state, action) => {
      state.charactersList[action.payload.index] = action.payload
    },
    clearCharList: (state) => {
      state.charactersList = [{index:0}, {index:1}, {index:2}, {index:3}, {index:4}, {index:5}, {index:6}, {index:7}, {index:8}, {index:9}]
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