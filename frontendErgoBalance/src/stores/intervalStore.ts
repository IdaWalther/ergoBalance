import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

export const useIntervalTimer = defineStore('intervalTimer', () => {

  //Initiala tider för intervaller
  const workInterval: Ref<number> = ref(25 * 60)
  const breakDuration: Ref<number> = ref(5 * 60)
  const overallTime: Ref<number> = ref(240 * 60)
  const overallStartTime: Ref<number | null> = ref(null);

  //statusvariabler
  const isRunning: Ref<boolean> = ref(false)
  const isPaused: Ref<boolean> = ref(false)
  const currentPhase: Ref<'work' | 'break'> = ref('work')
  const remainingTime: Ref<number> = ref(0)
  const progressPercentage: Ref<number> = ref(0)

  let startTime: number = 0
  let phaseStart: number = 0
  let phaseDuration: number = 0
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let countdownIntervalId: ReturnType<typeof setInterval> | null = null
  let overallIntervalId: ReturnType<typeof setInterval> | null = null


  function startOverallTimer(): void {
    overallStartTime.value = Date.now()
    requestAnimationFrame(updateProgress)

    overallIntervalId = setInterval(() => {
      if (!isRunning.value) return

      const elapsedOverall = Math.floor((Date.now() - startTime) / 1000)
      if (elapsedOverall >= overallTime.value) {
        stop()
        console.log('Intervallerna är slut!')
      }
    }, 1000)
  }

  function startCountdown() {
    countdownIntervalId = setInterval(() => {
      const secondsElapsed = Math.floor((Date.now() - phaseStart) / 1000)
      const secondsLeft = phaseDuration - secondsElapsed
      remainingTime.value = secondsLeft >= 0 ? secondsLeft : 0
    }, 1000)
  }

  function startTimeout() {
    timeoutId = setTimeout(() => {
      handlePhaseChange()
    }, remainingTime.value * 1000)
  }

  function handlePhaseChange() {
    if (countdownIntervalId) clearInterval(countdownIntervalId)
    currentPhase.value = currentPhase.value === 'work' ? 'break' : 'work'
    runCycle()
  }

  function runCycle(): void {
    if (!isRunning.value) return

    phaseStart = Date.now()
    phaseDuration = currentPhase.value === 'work' ? workInterval.value : breakDuration.value
    remainingTime.value = phaseDuration
    startCountdown()
    startTimeout()
  }

  function start(): void {
    if (isRunning.value) return
    console.log('start körs!')
    isRunning.value = true
    isPaused.value = false
    startTime = Date.now()
    overallStartTime.value = Date.now();
    currentPhase.value = 'work'
    startOverallTimer()
    runCycle()

  }

  function stop() {
    console.log('stopp!')
    isRunning.value = false
    isPaused.value = false
    if (timeoutId) clearTimeout(timeoutId)
    if (countdownIntervalId) clearInterval(countdownIntervalId)
    if (overallIntervalId) clearInterval(overallIntervalId)
    startTime = 0
    overallStartTime.value = null;
  }

  function pauseToggle() {
    if (!isRunning.value) return
    isPaused.value = !isPaused.value

    if (isPaused.value) {
      if (timeoutId) clearTimeout(timeoutId)
      if (countdownIntervalId) clearInterval(countdownIntervalId)
    } else {
      phaseStart = Date.now() - (phaseDuration - remainingTime.value) * 1000;
      startCountdown()
      startTimeout()
    }
  }
  function updateProgress() {
    if (!isRunning.value) return

    const elapsedTime = Math.floor((Date.now() - overallStartTime.value!) / 1000);
    const percentage = (elapsedTime / overallTime.value) * 100;
    progressPercentage.value = Math.max(0, Math.min(100, Math.floor(percentage)))

    requestAnimationFrame(updateProgress);
  };

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
    isPaused,
    currentPhase,
    remainingTime,
    overallStartTime,
    progressPercentage,
    start,
    stop,
    pauseToggle,
    updateSettings,
  }
})
