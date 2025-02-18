import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

export const useIntervalTimer = defineStore('intervalTimer', () => {

  //Initiala tider för intervaller
  const workInterval: Ref<number> = ref(25 * 60)
  const breakDuration: Ref<number> = ref(5 * 60)
  const overallTime: Ref<number> = ref(240 * 60)

  //statusvariabler
  const isRunning: Ref<boolean> = ref(false)
  // const isPaused: Ref<boolean> = ref(false)
  const currentPhase: Ref<'work' | 'break'> = ref('work')
  const remainingTime: Ref<number> = ref(0)

  let startTime: number = 0
  let phaseStart: number = 0
  let phaseDuration: number = 0
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let countdownIntervalId: ReturnType<typeof setInterval> | null = null
  let overallIntervalId: ReturnType<typeof setInterval> | null = null


  function startOverallTimer(): void {
    overallIntervalId = setInterval(() => {
      if (!isRunning.value) return

      const elapsedOverall = Math.floor((Date.now() - startTime) / 1000)
      if (elapsedOverall >= overallTime.value) {
        stop()
        console.log('Intervallerna är slut!')
      }
    }, 1000)
  }


  //hanterar tid samt fasbyten
  function runCycle(): void {
    if (!isRunning.value) return
    // clearTimeout(timeoutId)
    // clearInterval(countdownIntervalId)
    phaseStart = Date.now()
    phaseDuration = currentPhase.value === 'work' ? workInterval.value : breakDuration.value
    remainingTime.value = phaseDuration

    countdownIntervalId = setInterval(() => {
      const secondsElapsed = Math.floor((Date.now() - phaseStart) / 1000)
      const secondsLeft = phaseDuration - secondsElapsed
      remainingTime.value = secondsLeft >= 0 ? secondsLeft : 0
    }, 1000)

    timeoutId = setTimeout(() => {
      if (countdownIntervalId) clearInterval(countdownIntervalId)
      currentPhase.value = currentPhase.value === 'work' ? 'break' : 'work'
      runCycle()
    }, phaseDuration * 1000)
    console.log('slutet på cykeln!', currentPhase.value, 'and', remainingTime.value)
  }

  function start(): void {
    if (isRunning.value) return
    console.log('start körs!')
    isRunning.value = true
    // isPaused.value = false
    startTime = Date.now()
    currentPhase.value = 'work'
    startOverallTimer()
    runCycle()
  }

  function stop() {
    console.log('stopp!')
    isRunning.value = false
    // isPaused.value = false
    if (timeoutId) clearTimeout(timeoutId)
    if (countdownIntervalId) clearInterval(countdownIntervalId)
    if (overallIntervalId) clearInterval(overallIntervalId)
    startTime = 0
  }

  // function pauseToggle() {
  //   if (!isRunning.value) return
  //   isPaused.value = !isPaused.value
  //   if (!isPaused.value) {
  //     phaseStart = Date.now() - (phaseDuration - remainingTime.value) * 1000; startCountdown()
  //   }
  // }

  function updateSettings(newWorkInterval: number, newBreakDuration: number, newOverallTime: number): void {
    workInterval.value = newWorkInterval
    breakDuration.value = newBreakDuration
    overallTime.value = newOverallTime
  }

  return {
    workInterval,
    breakDuration,
    overallTime,
    isRunning,
    // isPaused,
    currentPhase,
    remainingTime,
    start,
    stop,
    // pauseToggle,
    updateSettings,
  }
})
