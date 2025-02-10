<script setup lang="ts">
import './intervalView.scss'
import { computed } from 'vue'
import { useIntervalTimer } from '../../stores/intervalStore.js'

const intervalTimer = useIntervalTimer()

const formattedRemainingTime = computed(() => {
  const minutes = Math.floor(intervalTimer.remainingTime / 60)
  const seconds = intervalTimer.remainingTime % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
})

// function start() {
//   intervalTimer.start()
// }

function stop() {
  intervalTimer.stop()
}

</script>

<template>
  <section class="intervalView__wrapper">
    <section class="intervalView__container">
    <h1>Timer</h1>
    <p>
      Fas:
      <strong>{{ intervalTimer.currentPhase }}</strong>
    </p>
    <p>
      Tid kvar:
      <strong>{{ formattedRemainingTime }}</strong>
    </p>
    <!-- <button @click="start" :disabled="intervalTimer.isRunning">
      Start Intervals
    </button> -->
    <button @click="stop" :disabled="!intervalTimer.isRunning">
      Stoppa intervaller
    </button>
    <br /><br />
    <router-link to="/main">
      <button>Gå tillbaka</button>
    </router-link>
  </section>
  </section>
</template>
