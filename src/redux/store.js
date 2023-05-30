import { configureStore } from '@reduxjs/toolkit'
import CharSelectionSlice from './CharSelectionSlice'
import CharacterInfoSlice from './GameplaySlices/CharacterInfoSlice'
import ChatSlice from './GameplaySlices/ChatSlice'
import InventorySlice from './GameplaySlices/InventorySlice'
import MapInfoSlice from './GameplaySlices/MapInfoSlice'
import PlayerStatsSlice from './GameplaySlices/PlayerStatsSlice'
import UIFlowReducer from './UIFlowSlice'
import GameStateSlice from './GameplaySlices/GameStateSlice'

export default configureStore({
  reducer: {
    uiFlow: UIFlowReducer,
    charSelection: CharSelectionSlice,
    playerStats: PlayerStatsSlice,
    inventory: InventorySlice,
    characterInfo: CharacterInfoSlice,
    mapInfo: MapInfoSlice,
    chat: ChatSlice,
    gameState: GameStateSlice
  }
})