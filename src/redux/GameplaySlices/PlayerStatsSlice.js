import { createSlice } from '@reduxjs/toolkit'
import { SafeLocks } from '../../constants'

export const PlayerStats = createSlice({
  name: 'playerStats',
  initialState: {
    currentHp:100,
    maxHp : 100,
    currentMana: 0,
    maxMana: 0,
    currentShield:0,
    gold:56946218,
    str:18,
    agi:18,
    currentEnergy:0,
    maxEnergy:100,
    drink:100,
    food:100,
    magicDef:0,
    magicBonus:0,
    attackLock: true,
    clanLock: true,
    groupLock: true,
    resurrectionLock: true,
    strState: 0,
    agiState: 0
  },
  reducers: {
    setStats: (state, action) => {
      state.currentHp = action.payload.currentHp
      state.maxHp = action.payload.maxHp
      state.currentMana = action.payload.currentMana
      state.maxMana = action.payload.maxMana
      state.currentShield = action.payload.currentShield
      state.gold = action.payload.gold
      state.currentEnergy = action.payload.currentEnergy
      state.maxEnergy = action.payload.maxEnergy
      state.drink = action.payload.drink
      state.food = action.payload.food
      state.magicDef = action.payload.magicDef
      state.magicBonus = action.payload.magicBonus
      state.attackLock = action.payload.attackLock
      state.clanLock = action.payload.clanLock
      state.groupLock = action.payload.groupLock
    },
    updateHp: (state, action) => {
      state.currentHp = action.payload.hp
      state.currentShield = action.payload.shield
    },
    updateMana: (state, action) => {
      state.currentMana = action.payload
    },
    updateStamina: (state, action) => {
      state.currentEnergy = action.payload
    },
    updateDrink: (state, action) => {
      state.drink = action.payload
    },
    updateFood: (state, action) => {
      state.food = action.payload
    },
    updateGold: (state, action) => {
      state.gold = action.payload
    },
    updateStrandAgi: (state, action) => {
      state.str = action.payload.str;
      state.agi = action.payload.agi;
      state.strState = action.payload.strState;
      state.agiState = action.payload.agiState;
    },
    updateLockState: (state, action) => {
      console.log(action.payload)
      switch (action.payload.type) {
        case SafeLocks.Attack:
          state.attackLock= action.payload.state
          break
        case SafeLocks.Clan:
          state.clanLock= action.payload.state
          break
        case SafeLocks.Group:
          state.groupLock= action.payload.state
          break
        case SafeLocks.Resurrection:
          state.resurrectionLock= action.payload.state
          break
        default:
      }
    }
    
  },
})

export const { setStats, updateHp, updateMana, updateStamina, updateDrink, updateFood, updateGold, updateStrandAgi, updateLockState } = PlayerStats.actions

export const selectCurrentHp = (state) =>  state.playerStats.currentHp
export const selectMaxHp = (state) =>  state.playerStats.maxHp
export const selectCurrentMana = (state) =>  state.playerStats.currentMana
export const selectMaxMana = (state) =>  state.playerStats.maxMana
export const selectCurrentShield = (state) =>  state.playerStats.currentShield
export const selectGold = (state) =>  state.playerStats.gold
export const selectStr = (state) =>  state.playerStats.str
export const selectAgi = (state) =>  state.playerStats.agi
export const selectStrState = (state) =>  state.playerStats.strState
export const selectAgiState = (state) =>  state.playerStats.agiState
export const selectCurrentEnergy = (state) =>  state.playerStats.currentEnergy
export const selectMaxEnergy = (state) =>  state.playerStats.maxEnergy
export const selectDrink = (state) =>  state.playerStats.drink
export const selectFood = (state) =>  state.playerStats.food
export const selectShield = (state) =>  state.playerStats.shield
export const selectWeapon = (state) =>  state.playerStats.weapon
export const selectHelm = (state) =>  state.playerStats.helm
export const selectArmor = (state) =>  state.playerStats.armor
export const selectMagicDef = (state) =>  state.playerStats.magicDef
export const selectMagicBonus = (state) =>  state.playerStats.magicBonus
export const selectAttackLock = (state) =>  state.playerStats.attackLock
export const selectResurrectionLock = (state) =>  state.playerStats.resurrectionLock
export const selectClanLock = (state) =>  state.playerStats.clanLock
export const selectGroupLock = (state) =>  state.playerStats.groupLock


export default PlayerStats.reducer