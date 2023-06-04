import { createSlice } from '@reduxjs/toolkit'

export const MapInfoSlice = createSlice({
  name: 'mapInfo',
  initialState: {
    mapName: 'ciudad de prueba',
    interestPoints: [],
    mapNumber:1,
    isSafe: true,
    coordinates: {x:12, y:15}
  },
  reducers: {
    setMapInfo: (state, action) => {
      state.mapName = action.payload.name
      state.mapNumber = action.payload.mapNumber
      state.isSafe = action.payload.isSafe
    },
    setInterestPoints: (state, action) => {
      state.interestPoints = action.payload
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload
    }
  },
})

export const { setMapInfo, setCoordinates, setInterestPoints } = MapInfoSlice.actions

export const selectMapName = (state) =>  state.mapInfo.mapName
export const selectInterestPoints = (state) => state.mapInfo.interestPoints
export const selectMapNumber = (state) => state.mapInfo.mapNumber
export const selectCurrentCoordinates = (state) => state.mapInfo.coordinates
export const selectIsSafeMap = (state) => state.mapInfo.isSafe

export default MapInfoSlice.reducer