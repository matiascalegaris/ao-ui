import { configureStore } from '@reduxjs/toolkit'
import CharSelectionSlice from './CharSelectionSlice'
import UIFlowReducer from './UIFlowSlice'

export default configureStore({
  reducer: {
    uiFlow: UIFlowReducer,
    charSelection: CharSelectionSlice
  }
})