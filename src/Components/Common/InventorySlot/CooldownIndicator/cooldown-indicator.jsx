
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { e_CDTypeMask, e_CdTypes } from '../../../../constants'
import { selectActiveIntervals, selectIntervals } from '../../../../redux/GameplaySlices/Cooldowns'
import './cooldown-indicator.scss'
import { CdFiller } from '../../CdFiller/cd-filler'

// need to replace with this implementation : https://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css/
const considerInterval = (currentTime, lastStartTime, intervalTime, currentCdState) => {
  let attackInterval = intervalTime - (currentTime - lastStartTime)
  if (attackInterval > currentCdState.longerCd) {
    currentCdState.longerCd = attackInterval
    currentCdState.startTime = lastStartTime
    currentCdState.cdDuration = intervalTime
    return true
  }
  return false
}
const GetLongestIntervalTime = (cdMask, cdType, customCd, intervals, activeIntervals) => {
  let currentCdState = {
    longerCd: 0,
    startTime: 0,
    cdDuration: 0
  }
  let currentTime = Date.now()
  if ((cdMask & e_CDTypeMask.eBasicAttack) > 0) {
    if (considerInterval(currentTime, activeIntervals[e_CdTypes.eMelee], intervals.hit, currentCdState)) { console.log("delay fisical attack  for hit")}
    if (considerInterval(currentTime, activeIntervals[e_CdTypes.eMagic], intervals.magicHit, currentCdState)) { console.log("delay fisical attack  for magic")}
  }
  if ((cdMask & e_CDTypeMask.eRangedAttack) > 0) {
    if (considerInterval(currentTime, activeIntervals[e_CdTypes.eRanged], intervals.bow, currentCdState)) 
      { console.log("delay ranged  for ranged")
    }
  }
  if ((cdMask & e_CDTypeMask.eCustom) > 0 && cdType > 0 && cdType < activeIntervals.length) {
    if (considerInterval(currentTime, activeIntervals[cdType], customCd, currentCdState)) { 
      console.log("delay ranged  for custom")
    }
  }
  return currentCdState
}

export const CooldownIndicator = ({cdMask, cdType, elementCD}) => {
  const gIntervals = useSelector(selectIntervals)
  const activeIntervals = useSelector(selectActiveIntervals)
  const [cdState, setcdState] = useState({progress:1})

  let progress = cdState.progress
  if (cdMask > 0) {
    const intervalState = GetLongestIntervalTime(cdMask, cdType, elementCD,
                                                    gIntervals, activeIntervals)
    if (intervalState.longerCd > 0) {
      progress = (Date.now() - intervalState.startTime) / intervalState.cdDuration
    }
    else {
      progress = 1
    }
  }
  useEffect(() => {
    let interval = null
    if (progress < 1) {
      interval = setInterval(() => {
        if (cdMask > 0) {
          const intervalState = GetLongestIntervalTime(cdMask, cdType, elementCD,
                                                          gIntervals, activeIntervals)
          if (intervalState.longerCd > 0) {
            setcdState({progress:(Date.now() - intervalState.startTime) / intervalState.cdDuration})
          }
          else {
            setcdState({progress:1})
            clearInterval(interval)
          }
        }
        
      }, 10);
    }    
    return () => interval && clearInterval(interval);
  }, [gIntervals, activeIntervals, cdMask, cdType, elementCD]);

  return (
    <>
    {progress < 1 ? <CdFiller percent={1-progress}/> : null}
    </>
  )
}