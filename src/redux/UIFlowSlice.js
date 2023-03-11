import { createSlice } from '@reduxjs/toolkit'

export const UIFlowSlice = createSlice({
  name: 'uiFlow',
  initialState: {
    activeDialog: 'login',
    loading: false,
    loadingText: '',
    nextScreen: '',
    transitionActive: false,
    errorMessage : null
  },
  reducers: {
    setActiveScreen : (state, action) => {
      state.loading = false
      state.nextScreen = ''
      state.transitionActive = false
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
    },
    startTransition : (state, action) => {
      state.transitionActive = true
      state.nextScreen = action.payload
    },
    transitionComplete: (state) => {
      state.transitionActive = false
      state.loading = false
      state.activeDialog = state.nextScreen
      state.nextScreen = ''
    }
  },
})

export const { setActiveScreen, displayLoading, displayLoadingText, displayErrorMessage, hideErrorMessage, startTransition, transitionComplete } = UIFlowSlice.actions

export const selectActiveDialog = (state) =>  state.uiFlow.activeDialog

export const selectLoadingState = (state) => {
  return [state.uiFlow.loading, state.uiFlow.loadingText]
}

export const selectErrorMessage = (state) => state.uiFlow.errorMessage
export const selectExitScreenActive = (state) => state.uiFlow.transitionActive

export const setActiveDialog = (dialog) => (dispatch) => {
  dispatch(startTransition(dialog))
  setTimeout(() => {
    dispatch(transitionComplete())
  }, 400)
}
export default UIFlowSlice.reducer

