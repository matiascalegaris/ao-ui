import { configureStore } from '@reduxjs/toolkit'
import UIFlowReducer from './UIFlowSlice'

export default configureStore({
  reducer: {
    uiFlow: UIFlowReducer
  }
})