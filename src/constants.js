export const DragDropTypes = {
  ITEM: 'Item',
  SPELL: 'Spell'
}

export const Actions = {
	Minimize: 1,
	Close: 2,
	OpenMinimap: 3,
	OpenClanDialog: 4,
  OpenChallenge: 5,
  OpenKeys: 6,
  OpenActiveQuest: 7,
  GoHome: 8,
  ShowStats: 9,
  UpdateGroupLock: 10,
  UpdateClanSafeLock: 11,
  UpdateAttackSafeLock: 12,
  UpdateResurrectionLock: 13,
  ReportBug: 14,
  RequestSkill: 15,
  OpenGroupDialog: 16,
  OpenGmPannel: 17,
  OpenCreateObjMenu: 18,
  OpenSpawnMenu: 19,
  SetGmInvisible: 20,
  DisplayHPInfo: 21,
  OpenSettings: 22,
  DisplayInventory: 23,
  DisplaySpells: 24,
}

export const SafeLocks = {
  Group: 1,
  Clan: 2,
  Attack: 3,
  Resurrection: 4
}

export const eObjType = {
  otUseOnce: 1,
  otWeapon: 2,
  otArmor: 3,
  otTrees: 4,
  otMoney: 5,
  otDoors: 6,
  otContainers: 7,
  otSigns: 8,
  otKeys: 9,
  otForums: 10,
  otPotions: 11,
  otDrinks: 13,
  otFirewood: 14,
  otBonfire: 15,
  otSHIELD: 16,
  otHELMET: 17,
  otTools: 18,
  otTeleport: 19,
  otDecorations: 20,
  otMagicalItems: 21,
  otDeposit: 22,
  otMinerals: 23,
  otScrolls: 24,
  otInstruments: 26,
  otAnvil: 27,
  otForge: 28,
  otRings: 30,
  otBoats: 31,
  otArrows: 32,
  otEmptyBottle: 33,
  otFullBottle: 34,
  otStains: 35,          // Not used
  otPassages: 36,
  otMap: 38,
  otWells: 40,
  otMounts: 44,
  otRunes: 45,
  otKnuckles: 46,
  otMail: 47,
  otChest: 48,
  otDonator: 50,
  otQuest: 51,
  otFishingPool: 52,
  otAny: 1000
};

export const e_CDTypeMask = {
  eBasicAttack: 1,
  eRangedAttack: 2,
  eMagic: 4,
  eUsable: 8,
  eCustom: 16
};

export const e_CdTypes = {
  eMagic: 1,
  eMelee: 2,
  ePotions: 3,
  eRanged: 4,
  eThrowing: 5,
  eResurrection: 6,
  eTraps: 7,
  eWeaponPoison: 8,
  eArpon: 9,
  eHandCannon: 10,
};

export const ChatStates = {
  Normal: 0,
  Global: 1,
  Private: 2,
  Shout: 3,
  Clan: 4,
  Group: 5,
  Gmsg: 6,
  GmGlobal: 7
};

export const ChatPrefix = ['', ';','\\', '-', "/CMSG" ,'/GRUPO', '/GMSG', '/RMSG']

export const attributeList = ['sta-str', 'sta-agi', 'sta-int', 'sta-cha', 'sta-cons']
export const raceList = ['Human', 'Elf', 'Drow', 'Gnome', 'Dwarf','Orc']
export const classList = [ 'Mage', 'Cleric', 'Warrior', 'Assasin', 'Bard', 'Druid', 'Paladin', 'Hunter', 'Worker', 'Pirate', 'Thief', 'Bandit']