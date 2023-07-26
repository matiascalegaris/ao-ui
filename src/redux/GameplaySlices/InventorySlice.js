import { createSlice } from '@reduxjs/toolkit'
import { eObjType } from '../../constants'
import { resetGameplay } from './GameStateSlice'
import { createSelector } from 'reselect'
import { ArrayMove } from '../../Tools/Utils'

const defaultValues = {
  itemList: Array(42).fill({name:'', count:1, cantUse: 0, equipped: true, grh:0,
                           maxDef:0, minDef:0, minHit:0, maxHit:0, objIndex: 0, type: 0,
                           value: 0, cooldown:0, cdType:0, cdMask:0})
                      .map((element, index) => ({...element, count: 0, index:index})),
  selectedItemIndex: -1,
  extraInventorySlotState:[ true, false, false],
  spellList: Array(40).fill({ name:'(Vacio)', index: 0, spellIndex: 0})
                      .map((element, index) => ({...element, index:index, name:'(Vacio)' + index})),
  selectedSpellIndex: -1,
  keys: Array(10).fill({name:'', count:0, cantUse: 0, equipped: false, 
                        grh:0, maxDef:0, minDef:0, maxHit:0, objIndex: 0,
                        type: 0, value: 0, cooldown:0, cdType:0, cdMask:0})
                 .map((element, index) => ({...element, count: 0, index:index})),
  selectedKeyIndex: -1,
  hotkeys: Array(10).fill({type:null, content:null, lastUse: 0}).map((element, index) => ({...element, index:index}))
}

export const InventorySlice = createSlice({
  name: 'inventory',
  initialState: defaultValues,
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
    updateSpellSlot: (state, action) => {
      state.spellList[action.payload.index] = action.payload
    },
    selectInvSlot: (state, action) => {
      state.selectedItemIndex = action.payload
    },
    selectSpellSlot: (state, action) => {
      state.selectedSpellIndex = action.payload
    },
    updateKeySlot: (state, action) => {
      state.keys[action.payload.index] = action.payload
    },
    selectKeySlot: (state, action) => {
      state.selectedKeyIndex = action.payload
    },
    moveSpellSlot: (state,action) => {
      ArrayMove(state.spellList, action.payload.from, action.payload.to)
      let i = 0
      state.spellList.forEach( element => { element.index = i; i++})
    },
    setHotkeySlot: (state, action) => {
      state.hotkeys[action.payload.index] = action.payload
    },
    activateRemoteHotkey: (state, action) => {
      state.hotkeys[action.payload.index].lastUse = state.hotkeys[action.payload.index].lastUse + 1
    },
    extraReducers: (builder) => {
      builder
        .addCase(resetGameplay, (state) => {
          state = defaultValues
        })
    },
    
  },
})

export const { updateInvSlot, setInvLevel, selectInvSlot, selectSpellSlot, 
               updateSpellSlot, updateKeySlot, selectKeySlot,
              moveSpellSlot, setHotkeySlot, activateRemoteHotkey } = InventorySlice.actions

export const selectSelectedItemIndex = (state) =>  state.inventory.selectedItemIndex

export const selectInventorySlots = (state) => state.inventory.itemList
export const selectSpellList = (state) => state.inventory.spellList
export const selectSelectedSpellSlotIndex = (state) => state.inventory.selectedSpellIndex
export const selectExtraSlotState = (state) => state.inventory.extraInventorySlotState
export const selectKeys = (state) => state.inventory.keys
export const selectSelectedKeyIdex = (state) => state.inventory.selectedKeyIndex
export const selectHotkeys = (state) => state.inventory.hotkeys

export const selectEquippedItems = createSelector(
  (state) => state.inventory.itemList,
  (itemList) => {
    return itemList.filter( element => {
      return element.equipped
    })
  }
)

export const selectEquippedBonus = createSelector(
  selectEquippedItems,
  (itemList) => {
    let equippedSlots = {
      armor: { min: 0, max: 0},
      shield: { min: 0, max: 0},
      helm: { min: 0, max: 0},
      amunition: { min: 0, max: 0},
      weapon: { min: 0, max: 0}
    }
    let useAmunition = false
    itemList.forEach( item => {
      if (item.equipped) {
        switch(item.type) {
          case eObjType.otWeapon:
            equippedSlots.weapon = { min: item.minHit, max: item.maxHit}
            useAmunition = item.amunition > 0
            break
          case eObjType.otArmor:
            equippedSlots.armor = { min: item.minDef, max: item.maxDef}
            break
          case eObjType.otArrows:
            equippedSlots.amunition = { min: item.minHit, max: item.maxHit}
            break
          case eObjType.otHELMET:
            equippedSlots.helm = { min: item.minDef, max: item.maxDef}
            break
          case eObjType.otSHIELD:
            equippedSlots.shield = { min: item.minDef, max: item.maxDef}
            break
        default:
          break
        }
      }
    });
    if (!useAmunition) {
      equippedSlots.amunition = { min: 0, max: 0}
    }
    return equippedSlots
  }
)
export const selectHotkeySlot = createSelector(
  [
    // Usual first input - extract value from `state`
    state => state.inventory.itemList,
    // Take the second arg, `category`, and forward to the output selector
    (state, hotkey) => hotkey
  ],
  // Output selector gets (`items, category)` as args
  (inventory, hotkey) => {
    const content = inventory[hotkey.lastKnownSlot]
    if (content.objIndex === hotkey.targetIndex) {
      return content
    }
    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i].objIndex === hotkey.targetIndex) {
        return inventory[i]
      }
    }
    return null
  }
);

export const selectHotkeySpellSlot = createSelector(
  [
    // Usual first input - extract value from `state`
    state => state.inventory.spellList,
    // Take the second arg, `category`, and forward to the output selector
    (state, hotkey) => hotkey
  ],
  // Output selector gets (`items, category)` as args
  (spellList, hotkey) => {
    const content = spellList[hotkey.lastKnownSlot]
    if (content.spellIndex === hotkey.targetIndex) {
      return content
    }
    for (let i = 0; i < spellList.length; i++) {
      if (spellList[i].spellIndex === hotkey.targetIndex) {
        return spellList[i]
      }
    }
    return null
  }
);

export default InventorySlice.reducer