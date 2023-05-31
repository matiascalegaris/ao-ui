import { createSlice } from '@reduxjs/toolkit'

export const InventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    itemList: Array(48).fill({grh:5, count:7}).map((element, index) => ({...element, count: index, index:index})),
    selectedItemIndex: -1,
    extraInventorySlotState:[ true, false, false],
    spellList: Array(40).fill({ name:'<Vacio>', index: 0}).map((element, index) => ({...element, index:index})),
    selectedSpellIndex: -1
  },
  reducers: {
    updateInvSlot: (state, action) => {
      state.itemList[action.payload.index] = action.payload
    },
    setInvLevel: (state, action)=> {
      for (let i = 0; i < action.payload; i++) {
        state.extraInventorySlotState[i] = true
      }
      for (let i = action.payload; i < 3; i++) {
        state.extraInventorySlotState[i] = false
      }
    },
    selectInvSlot: (state, action) => {
      state.selectedItemIndex = action.payload
    },
    selectSpellSlot: (state, action) => {
      state.selectedSpellIndex = action.payload
    }
  },
})

export const { updateInvSlot, setInvLevel, selectInvSlot, selectSpellSlot } = InventorySlice.actions

export const selectSelectedItemIndex = (state) =>  state.inventory.selectedItemIndex

export const selectInventorySlots = (state) => state.inventory.itemList
export const selectSpellList = (state) => state.inventory.spellList
export const selectSelectedSpellSlotIndex = (state) => state.inventory.selectedSpellIndex
export const selectExtraSlotState = (state) => state.inventory.extraInventorySlotState

export default InventorySlice.reducer