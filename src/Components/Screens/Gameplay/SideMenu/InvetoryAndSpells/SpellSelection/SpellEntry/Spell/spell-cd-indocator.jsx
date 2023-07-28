import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { e_CdTypes } from "../../../../../../../../constants"
import { selectActiveIntervals, selectIntervals, selectSpellCd, selectStunTime } from "../../../../../../../../redux/GameplaySlices/Cooldowns"
import { CdFiller } from "../../../../../../../Common/CdFiller/cd-filler"

const considerInterval = (currentTime, lastStartTime, intervalTime, currentCdState) => {
  const elapsedTime = currentTime - lastStartTime
  let attackInterval = intervalTime - elapsedTime
  if (attackInterval > currentCdState.longerCd) {
    currentCdState.longerCd = attackInterval
    currentCdState.startTime = lastStartTime
    currentCdState.cdDuration = intervalTime
    return true
  }
  return false
}
const GetLongestIntervalTime = (intervals, activeIntervals, spellCd, stunTime) => {
  let currentCdState = {
    longerCd: 0,
    startTime: 0,
    cdDuration: 0
  }
  let currentTime = Date.now()
  considerInterval(currentTime, activeIntervals[e_CdTypes.eMelee], intervals.hitMagic, currentCdState)
  considerInterval(currentTime, activeIntervals[e_CdTypes.eMagic], intervals.magic, currentCdState)
  spellCd && considerInterval(currentTime, spellCd.start, spellCd.duration, currentCdState)
  if (stunTime) {
    considerInterval(currentTime, stunTime.startTime, stunTime.duration, currentCdState)
  }
  return currentCdState
}

export const SpellCdIndicator = ({spellId}) => {
  const gIntervals = useSelector(selectIntervals)
  const activeIntervals = useSelector(selectActiveIntervals)
  const spellCd = useSelector(state => selectSpellCd(state, spellId))
  const stunTime = useSelector(selectStunTime)
  const [cdState, setcdState] = useState({progress:1})
  
  const intervalState = GetLongestIntervalTime(gIntervals, activeIntervals, spellCd, stunTime)
  let progress = cdState.progress
  if (intervalState.longerCd > 0) {
    progress = (Date.now() - intervalState.startTime) / intervalState.cdDuration
  }
  else {
    progress = 1
  }

  useEffect(() => {
    let interval = null
    if (progress < 1) {
      interval = setInterval(() => {        
        const intervalState = GetLongestIntervalTime(gIntervals, activeIntervals, spellCd, stunTime)
        if (intervalState.longerCd > 0) {
          setcdState({progress:(Date.now() - intervalState.startTime) / intervalState.cdDuration})
        }
        else {
          setcdState({progress:1})
          clearInterval(interval)
        }        
      }, 10);
    }    
    return () => interval && clearInterval(interval);
  }, [gIntervals, activeIntervals, spellCd, stunTime]);

  return (
    <>
    {progress > 0  ? <CdFiller percent={1-progress}/> : null}
    </>
  )
}