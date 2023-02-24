import { createSlice } from '@reduxjs/toolkit'

export const CharSelectionSlice = createSlice({
  name: 'charSelection',
  initialState: {
    charactersList: [{name:'gordo en zunga'},{name:'macho en zunga'},{name:'osin'},{name:'Uff al sudar'},{name:'5'},
                     {name:'sgrum s'},{name:'Errabundus'},{name:'8'},{name:'9'},{name:'10'}],
    selectedIndex: -1,
  },
  reducers: {
    selectCharacter : (state, action) => {
      state.loading = false
      state.selectedIndex = action.payload
    },
    removeCharacter : (state, action) => {
      state.charactersList[action.payload] = {}
    },
    addCharacter : (state, action) => {
      state.loading = true
      state.charactersList[action.payload.index] = action.payload.details
    },
  },
})

export const { selectCharacter, removeCharacter, addCharacter } = CharSelectionSlice.actions

export const selectSelectedIndex = (state) =>  state.charSelection.selectedIndex

export const selectAvailableCharacters = (state) => state.charSelection.charactersList

export default CharSelectionSlice.reducer