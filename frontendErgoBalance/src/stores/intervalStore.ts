import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

export const useIntervalTimer = defineStore('intervalTimer', () => {

  //Initiala tider för intervaller
  const workInterval: Ref<number> = ref(25 * 60)
  const breakDuration: Ref<number> = ref(5 * 60)
  const overallTime: Ref<number> = ref(240 * 60)
  const overallStartTime: Ref<number | null> = ref(null);
  const elapsedOverallTime: Ref<number> = ref(0);
  const alarmEnabled = ref(true);

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
  let animationFrameId: number | null = null;

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
    elapsedOverallTime.value = 0;
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
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    startTime = 0
    progressPercentage.value = 0;
    elapsedOverallTime.value = 0;
    overallStartTime.value = null;
  }

  function pauseToggle() {
    if (!isRunning.value) return
    isPaused.value = !isPaused.value

    if (isPaused.value) {
      if (timeoutId) clearTimeout(timeoutId)
      if (countdownIntervalId) clearInterval(countdownIntervalId)
      if (overallIntervalId) clearInterval(overallIntervalId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      elapsedOverallTime.value += Math.floor((Date.now() - overallStartTime.value!) / 1000);
    } else {
      overallStartTime.value = Date.now();

      setTimeout(() => {
        requestAnimationFrame(updateProgress);
      }, 100);

      phaseStart = Date.now() - (phaseDuration - remainingTime.value) * 1000;

      startCountdown()
      startTimeout()
    }
  }

  function skipToNextPhase() {
    if (!isRunning.value) return;

    if (timeoutId) clearTimeout(timeoutId);
    if (countdownIntervalId) clearInterval(countdownIntervalId);

    handlePhaseChange();
  }

  function updateProgress() {
    if (!isRunning.value || isPaused.value) return

    const elapsedTime = elapsedOverallTime.value + Math.floor((Date.now() - overallStartTime.value!) / 1000);
    const percentage = (elapsedTime / overallTime.value) * 100;

    if (elapsedTime >= overallTime.value) {
      stop();
      progressPercentage.value = 100;
      return;
    }
    progressPercentage.value = Math.max(0, Math.min(100, Math.floor(percentage)))

    animationFrameId = requestAnimationFrame(updateProgress);
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
    alarmEnabled,
    start,
    stop,
    pauseToggle,
    skipToNextPhase,
    updateSettings,
  }
})
