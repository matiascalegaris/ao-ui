
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { e_CDTypeMask } from '../../../../constants'
import { selectActiveIntervals, selectIntervals } from '../../../../redux/GameplaySlices/Cooldowns'
import './cooldown-indicator.scss'

const considerInterval = (currentTime, lastStartTime, intervalTime, currentCdState) => {
  let attackInterval = intervalTime - (currentTime - lastStartTime)
    if (attackInterval > currentCdState.longerCd) {
      currentCdState.longerCd = attackInterval
      currentCdState.startTime = lastStartTime
      currentCdState.cdDuration = intervalTime
    }
}
const GetLongestIntervalTime = (cdMask, cdType, customCd, intervals, activeIntervals) => {
  let currentCdState = {
    longerCd: 0,
    startTime: 0,
    cdDuration: 0
  }
  let currentTime = Date.now()
  if (cdMask & e_CDTypeMask.eBasicAttack > 0) {
    considerInterval(currentTime, activeIntervals[e_CDTypeMask.eBasicAttack], intervals.hit, currentCdState)
    considerInterval(currentTime, activeIntervals[e_CDTypeMask.eMagic], intervals.magicHit, currentCdState)
  }
  if (cdMask & e_CDTypeMask.eRangedAttack > 0) {
    considerInterval(currentTime, activeIntervals[e_CDTypeMask.eRangedAttack], intervals.bow, currentCdState)
  }
  if (cdMask & e_CDTypeMask.eRangedAttack > 0) {
    considerInterval(currentTime, activeIntervals[e_CDTypeMask.eRangedAttack], intervals.bow, currentCdState)
  }
  if (cdMask & e_CDTypeMask.eCustom && cdType > 0 && cdType < activeIntervals.length) {
    considerInterval(currentTime, activeIntervals[cdType], customCd, currentCdState)
  }
  return currentCdState
}

export const CooldownIndicator = ({cdMask, cdType, elementCD}) => {
  const gIntervals = useSelector(selectIntervals)
  const activeIntervals = useSelector(selectActiveIntervals)
  const [cdState, setcdState] = useState({progress:1})

  let progress = 0.3
  if (cdMask > 0) {
    const intervalState = GetLongestIntervalTime(cdMask, cdType, elementCD,
                                                    gIntervals, activeIntervals)
    if (intervalState.longerCd > 0) {
      console.log('start interval')
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

  const fillRate = progress * 360
  const fillStyle = {
    background: `conic-gradient(transparent 0deg ${fillRate}deg, rgba(255, 0, 0, 0.514) 0deg 360deg)`
  }
  return (
    <>
    {progress < 1 ? <span className='progress-filler-style' style={fillStyle}></span> : null}
    </>
  )
}