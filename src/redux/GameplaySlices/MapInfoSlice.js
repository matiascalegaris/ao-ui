import { createSlice } from '@reduxjs/toolkit'

export const MapInfoSlice = createSlice({
  name: 'mapInfo',
  initialState: {
    mapName: '',
    interestPoints: [],
    mapNumber:1,
    coordinates: {x:12, y:15}
  },
  reducers: {
    setMapInfo: (state, action) => {
      state.mapName = action.payload.name
      state.interestPoints = action.payload.interestPoints
    }
  },
})

export const { setCharacterInfo, updateExp } = MapInfoSlice.actions

export const selectMapName = (state) =>  state.mapInfo.mapName
export const selectInterestPoints = (state) => state.mapInfo.interestPoints
export const selectMapNumber = (state) => state.mapInfo.mapNumber
export const selectCurrentCoordinates = (state) => state.mapInfo.coordinates

export default MapInfoSlice.reducer