import { createSlice } from '@reduxjs/toolkit'
import { resetGameplay } from './GameStateSlice'

const defaultValues = {
  mapName: 'ciudad de prueba',
  interestPoints: [{position:{tileX:20, tileY:20}, npcNumber:300, state:1}, {position:{tileX:99, tileY:99}, npcNumber:300, state:2}],
  mapNumber:1,
  minimapFile: 1,
  isSafe: true,
  coordinates: {x:12, y:15, mapPos: {x: 12, y: 14}},
  groupMarkers:  Array(6).fill({mapPos: {x:0, y: 0}, index:1})
}
export const MapInfoSlice = createSlice({
  name: 'mapInfo',
  initialState: defaultValues,
  reducers: {
    setMapInfo: (state, action) => {
      state.mapName = action.payload.mapName
      state.mapNumber = action.payload.mapNumber
      state.minimapFile = action.payload.minimapFile
      state.isSafe = action.payload.isSafe
    },
    setInterestPoints: (state, action) => {
      state.interestPoints = action.payload
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload
    },
    updateGroupMarker: (state, action) => {
      state.groupMarkers[action.payload.index] = action.payload
    },
    extraReducers: (builder) => {
      builder
        .addCase(resetGameplay, (state) => {
          state = defaultValues
        })
    },
  },
})

export const { setMapInfo, setCoordinates, setInterestPoints, updateGroupMarker } = MapInfoSlice.actions

export const selectMapName = (state) =>  state.mapInfo.mapName
export const selectInterestPoints = (state) => state.mapInfo.interestPoints
export const selectMapNumber = (state) => state.mapInfo.mapNumber
export const selectMinimapNumber = (state) => state.mapInfo.minimapFile
export const selectCurrentCoordinates = (state) => state.mapInfo.coordinates
export const selectIsSafeMap = (state) => state.mapInfo.isSafe
export const selectGroupMarkers = (state) => state.mapInfo.groupMarkers.filter( e => e.mapPos.x > 0)

export default MapInfoSlice.reducer