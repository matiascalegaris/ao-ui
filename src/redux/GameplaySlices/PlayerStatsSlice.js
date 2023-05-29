import { createSlice } from '@reduxjs/toolkit'

export const PlayerStats = createSlice({
  name: 'playerStats',
  initialState: {
    currentHp:100,
    maxHp : 100,
    currentMana: 50,
    maxMana: 100,
    currentShield:0,
    gold:56946218,
    str:19,
    agi:19,
    currentEnergy:0,
    maxEnergy:100,
    drink:100,
    food:100,
    shield: {min:0, max:0},
    weapon: {min:0, max:0},
    helm: {min:0, max:0},
    armor: {min:0, max:0},
    magicDef:0,
    magicBonus:0,
    attackLock: true,
    clanLock: true,
    groupLock: true
  },
  reducers: {
    setStats: (state, action) => {
      state.currentHp = action.payload.currentHp
      state.maxHp = action.payload.maxHp
      state.currentMana = action.payload.currentMana
      state.maxMana = action.payload.maxMana
      state.currentShield = action.payload.currentShield
      state.gold = action.payload.gold
      state.str = action.payload.str
      state.agi = action.payload.agi
      state.currentEnergy = action.payload.currentEnergy
      state.maxEnergy = action.payload.maxEnergy
      state.drink = action.payload.drink
      state.food = action.payload.food
      state.shield = action.payload.shield
      state.weapon = action.payload.weapon
      state.helm = action.payload.helm
      state.armor = action.payload.armor
      state.magicDef = action.payload.magicDef
      state.magicBonus = action.payload.magicBonus
      state.attackLock = action.payload.attackLock
      state.clanLock = action.payload.clanLock
      state.groupLock = action.payload.groupLock
    }
  },
})

export const { setStats } = PlayerStats.actions

export const selectCharacterStats = (state) => {
  return {
    currentHp: state.playerStats.currentHp,
    maxHp : state.playerStats.maxHp,
    currentMana: state.playerStats.currentMana,
    maxMana: state.playerStats.maxMana,
    currentShield: state.playerStats.currentShield,
    gold: state.playerStats.gold,
    str: state.playerStats.str,
    agi: state.playerStats.agi,
    currnetEnergy: state.playerStats.currentEnergy,
    maxEnergy: state.playerStats.maxEnergy,
    drink: state.playerStats.drink,
    food: state.playerStats.food,
    shield: state.playerStats.shield,
    weapon: state.playerStats.weapon,
    helm: state.playerStats.helm,
    armor: state.playerStats.armor,
    magicDef: state.playerStats.magicDef,
    magicBonus: state.playerStats.magicBonus,
  }
}
export const selectCurrentHp = (state) =>  state.playerStats.currentHp
export const selectMaxHp = (state) =>  state.playerStats.maxHp
export const selectCurrentMana = (state) =>  state.playerStats.currentMana
export const selectMaxMana = (state) =>  state.playerStats.maxMana
export const selectCurrentShield = (state) =>  state.playerStats.currentShield
export const selectGold = (state) =>  state.playerStats.gold
export const selectStr = (state) =>  state.playerStats.str
export const selectAgi = (state) =>  state.playerStats.agi
export const selectEnergy = (state) =>  state.playerStats.energy
export const selectDrink = (state) =>  state.playerStats.drink
export const selectFood = (state) =>  state.playerStats.food
export const selectShield = (state) =>  state.playerStats.shield
export const selectWeapon = (state) =>  state.playerStats.weapon
export const selectHelm = (state) =>  state.playerStats.helm
export const selectArmor = (state) =>  state.playerStats.armor
export const selectMagicDef = (state) =>  state.playerStats.magicDef
export const selectMagicBonus = (state) =>  state.playerStats.magicBonus
export const selectAttackLock = (state) =>  state.playerStats.attackLock
export const selectClanLock = (state) =>  state.playerStats.clanLock
export const selectGroupLock = (state) =>  state.playerStats.groupLock


export default PlayerStats.reducer