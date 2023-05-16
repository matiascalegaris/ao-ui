import { createSlice } from '@reduxjs/toolkit'

export const InventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    itemList: Array(48).fill({grh:5, count:7}).map((element, index) => ({...element, count: index})),
    selectedItemIndex: -1,
    extraInventorySlotState:[ false, false, false],
    spellList: Array(40).fill('<Vacio>')
  },
  reducers: {
    updateInvSlot: (state, action) => {
      state.itemList[action.payload.index] = action.payload.data
    },
    setBonusSlot: (state, action)=> {
      state.extraInventorySlotState[action.payload.index] = action.payload.state
    }
  },
})

export const { updateInvSlot, setBonusSlot } = InventorySlice.actions

export const selectSelectedItemIndex = (state) =>  state.inventory.selectedItemIndex

export const selectInventorySlots = (state) => state.inventory.itemList
export const selectSpellList = (state) => state.inventory.spellList
export const selectExtraSlotState = (state) => state.inventory.extraInventorySlotState

export default InventorySlice.reducer