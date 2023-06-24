import { configureStore } from '@reduxjs/toolkit'
import CharSelectionSlice from './CharSelectionSlice'
import CharacterInfoSlice from './GameplaySlices/CharacterInfoSlice'
import ChatSlice from './GameplaySlices/ChatSlice'
import InventorySlice from './GameplaySlices/InventorySlice'
import MapInfoSlice from './GameplaySlices/MapInfoSlice'
import PlayerStatsSlice from './GameplaySlices/PlayerStatsSlice'
import UIFlowReducer from './UIFlowSlice'
import GameStateSlice from './GameplaySlices/GameStateSlice'
import CooldownSlice from './GameplaySlices/Cooldowns'

export default configureStore({
  reducer: {
    uiFlow: UIFlowReducer,
    charSelection: CharSelectionSlice,
    playerStats: PlayerStatsSlice,
    inventory: InventorySlice,
    characterInfo: CharacterInfoSlice,
    mapInfo: MapInfoSlice,
    chat: ChatSlice,
    cooldowns: CooldownSlice,
    gameState: GameStateSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["gameState/setGameActiveDialog", "uiFlow/setActiveToolTip"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['gameState.setActiveDialog'],
        // Ignore these paths in the state
        ignoredPaths: ["gameState.activeDialog.actions", "gameState.activeDialog", "uiFlow.activeToolTip"],
      },
    }),
})