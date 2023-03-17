import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

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
      if (state.activeDialog !== action.payload ||
          state.transitionActive) {
        console.log('startTransition: ' + action.payload)
        state.transitionActive = true
        state.nextScreen = action.payload
      }
      else {
        console.log('ignoreTransition: ' + action.payload)
      }
    },
    transitionComplete: (state) => {
      console.log('translation complete: ' + state.nextScreen)
      if (state.transitionActive) {
        state.transitionActive = false
        state.loading = false
        state.activeDialog = state.nextScreen
      }
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
  console.log('set secreen: ' + dialog)
  dispatch(startTransition(dialog))
  setTimeout(() => {
    dispatch(transitionComplete())
  }, 400)
}
export default UIFlowSlice.reducer

