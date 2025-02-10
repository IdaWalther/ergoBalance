import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIntervalTimer = defineStore('intervalTimer', () => {

    const workInterval = ref(25 * 60)
    const breakDuration = ref(5 * 60)

    const isRunning = ref(false)
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
            const secondsElapsed = Math.floor((Date.now() - phaseStart) / 1000)
            const secondsLeft = phaseDuration - secondsElapsed
            remainingTime.value = secondsLeft >= 0 ? secondsLeft : 0
        }, 1000)
    }

    function runCycle() {
        if (!isRunning.value) return

        startCountdown()

        if (currentPhase.value === 'work') {
            console.log(`Work interval started for ${workInterval.value} seconds.`)
            timeoutId = setTimeout(() => {
                clearInterval(countdownIntervalId)
                currentPhase.value = 'break'
                runCycle()
            }, workInterval.value * 1000)
        } else {
            console.log(`Break started for ${breakDuration.value} seconds.`)
            timeoutId = setTimeout(() => {
                clearInterval(countdownIntervalId)
                currentPhase.value = 'work'
                runCycle()
            }, breakDuration.value * 1000)
        }
    }

    function start() {
        if (isRunning.value) return
        isRunning.value = true
        runCycle()
    }

    function stop() {
        isRunning.value = false
        clearTimeout(timeoutId)
        clearInterval(countdownIntervalId)
    }

    function updateSettings(newWorkInterval, newBreakDuration) {
        workInterval.value = newWorkInterval
        breakDuration.value = newBreakDuration
    }

    return {
        workInterval,
        breakDuration,
        isRunning,
        currentPhase,
        remainingTime,
        start,
        stop,
        updateSettings,
    }
})
