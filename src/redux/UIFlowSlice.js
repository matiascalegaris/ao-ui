import { createSlice } from '@reduxjs/toolkit'

export const UIFlowSlice = createSlice({
  name: 'uiFlow',
  initialState: {
    activeDialog: 'create-character',
    loading: false,
    loadingText: '',
    errorMessage : null
  },
  reducers: {
    setActiveDialog : (state, action) => {
      state.loading = false
      state.activeDialog = action.payload
    },
    displayLoading : (state, action) => {
      state.loading = action.payload
    },
    displayLoadingText : (state, action) => {
      state.loading = true
      state.loadingText = action.payload
    },
    displayErrorMessage : (state, action) => {
      state.errorMessage = action.payload
      state.loading = false
    },
    hideErrorMessage : (state) => {
      state.errorMessage = undefined
    }
  },
})

export const { setActiveDialog, displayLoading, displayLoadingText, displayErrorMessage, hideErrorMessage } = UIFlowSlice.actions

export const selectActiveDialog = (state) =>  state.uiFlow.activeDialog

export const selectLoadingState = (state) => {
  return [state.uiFlow.loading, state.uiFlow.loadingText]
}

export const selectErrorMessage = (state) => state.uiFlow.errorMessage

export default UIFlowSlice.reducer

