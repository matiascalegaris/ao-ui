import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export const UIFlowSlice = createSlice({
  name: 'uiFlow',
  initialState: {
    activeDialog: 'login',
    activePopup: '',
    nextScreen: '',
    transitionActive: false,
    selectedEndpoint: 0,
    popupData: null
  },
  reducers: {
    setActiveScreen : (state, action) => {
      state.loading = false
      state.nextScreen = ''
      state.transitionActive = false
      state.activeDialog = action.payload
    },
    displayLoading : (state, action) => {
      state.activePopup = action.payload ? 'loading' : ''
    },
    displayLoadingText : (state, action) => {
      state.activePopup = 'loading'
      state.popupData = action.payload
    },
    displayErrorMessage : (state, action) => {
      state.activePopup = 'error-message'
      state.popupData = action.payload
    },
    hideErrorMessage : (state) => {
      state.activePopup = ''
      state.popupData = null
    },
    setActivePopup : (state, action) => {
      state.activePopup = action.payload.popUp
      state.popupData = action.payload.data
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
        state.activePopup = ''
        state.activeDialog = state.nextScreen
      }
    },
    updateEndpoint: (state, action) => {
      state.selectedEndpoint = action.payload
    },
    setOptionDialog: (state, action) => {
      state.activePopup = 'option-dialog'
      state.popupData = action.payload
    },
    hidePopup: (state) => {
      state.activePopup = ''
      state.popupData = null
    }
  },
})

export const { setActiveScreen, displayLoading, displayLoadingText, displayErrorMessage,
               hideErrorMessage, startTransition, transitionComplete, updateEndpoint,
                setOptionDialog, setActivePopup, hidePopup } = UIFlowSlice.actions

export const selectActiveDialog = (state) =>  state.uiFlow.activeDialog
export const selectActivePopup = (state) => state.uiFlow.activePopup
export const selectPopupData = (state) => state.uiFlow.popupData
export const selectExitScreenActive = (state) => state.uiFlow.transitionActive
export const selectActiveEndPoint = (state) => state.uiFlow.selectedEndpoint

export const setActiveDialog = (dialog) => (dispatch) => {
  console.log('set secreen: ' + dialog)
  dispatch(startTransition(dialog))
  setTimeout(() => {
    dispatch(transitionComplete())
  }, 400)
}
export default UIFlowSlice.reducer

