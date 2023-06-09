import { useState } from 'react'
import { useInterval } from './useInterval'
// For more sophisticated timer hooks checkout https://github.com/amrlabib/react-timer-hook

export const useTimer = (props: {expiresInSeconds:number}) => {
  const { expiresInSeconds } = props
  const [seconds, setSeconds] = useState(getSecondsFromExpiry(expiresInSeconds))
  useInterval(() => setSeconds(getSecondsFromExpiry(expiresInSeconds)), 1000)
  return {
    seconds: Math.floor(seconds % 60),
    minutes: Math.floor((seconds % (60 * 60)) / 60),
    hours: Math.floor((seconds % (60 * 60 * 24)) / (60 * 60)),
    days: Math.floor(seconds / (60 * 60 * 24)),
  }
}
const getSecondsFromExpiry = (expire:number) => Math.round((expire - new Date().getTime()) / 1000)
