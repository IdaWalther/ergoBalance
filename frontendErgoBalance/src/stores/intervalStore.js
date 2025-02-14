import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIntervalTimer = defineStore('intervalTimer', () => {

    const workInterval = ref(25 * 60)
    const breakDuration = ref(5 * 60)

    const isRunning = ref(false)
    const isPaused = ref(false)
    const currentPhase = ref('work')
    const remainingTime = ref(0)

    let phaseStart = null
    let phaseDuration = 0
    let timeoutId = null
    let countdownIntervalId = null

    function startCountdown() {
        if (countdownIntervalId) {
            clearInterval(countdownIntervalId)
        }
        phaseStart = Date.now()
        phaseDuration =
        currentPhase.value === 'work' ? workInterval.value : breakDuration.value
        remainingTime.value = phaseDuration

        countdownIntervalId = setInterval(() => {
          if (!isPaused.value) {
            const secondsElapsed = Math.floor((Date.now() - phaseStart) / 1000)
            const secondsLeft = phaseDuration - secondsElapsed
            remainingTime.value = secondsLeft >= 0 ? secondsLeft : 0
          }
        }, 1000)
      }


    function runCycle() {
        if (!isRunning.value) return
        startCountdown()
        timeoutId = setTimeout(() => {
          if (!isPaused.value) {
            clearInterval(countdownIntervalId)
            currentPhase.value = currentPhase.value === 'work' ? 'break' : 'work'
            runCycle()
          }
        }, phaseDuration * 1000)
      }

    function start() {
        if (isRunning.value) return
        isRunning.value = true
        isPaused.value = false
        runCycle()
    }

    function stop() {
        isRunning.value = false
        isPaused.value = false
        clearTimeout(timeoutId)
        clearInterval(countdownIntervalId)
    }

    function pauseToggle() {
      if (!isRunning.value) return
      isPaused.value = !isPaused.value
      if (!isPaused.value) {
        phaseStart = Date.now() - (phaseDuration - remainingTime.value) * 1000; startCountdown()
      } else {
        clearInterval(countdownIntervalId)
        clearTimeout(timeoutId)
      }
    }

    function updateSettings(newWorkInterval, newBreakDuration) {
        workInterval.value = newWorkInterval
        breakDuration.value = newBreakDuration
    }

    return {
        workInterval,
        breakDuration,
        isRunning,
        isPaused,
        currentPhase,
        remainingTime,
        start,
        stop,
        pauseToggle,
        updateSettings,
    }
})
