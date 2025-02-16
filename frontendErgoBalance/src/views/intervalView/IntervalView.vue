<script setup lang="ts">
import './intervalView.scss'
import { Button } from 'primevue';
import { computed } from 'vue'
import { useIntervalTimer } from '../../stores/intervalStore.ts'

const intervalTimer = useIntervalTimer()

const formattedRemainingTime = computed(() => {
  const minutes = Math.floor(intervalTimer.remainingTime / 60)
  const seconds = intervalTimer.remainingTime % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
})

function stop() {
  intervalTimer.stop()
}

// function togglePause() {
//   intervalTimer.pauseToggle()
// }

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
     <!-- <Button v-if="intervalTimer.isRunning" @click="togglePause">
      {{ intervalTimer.isPaused ? 'starta intervaller igen' : 'pausa intervaller' }}
    </Button> -->
    <Button @click="stop" :disabled="!intervalTimer.isRunning">
      Stoppa Intervaller
    </Button>
    <router-link to="/main">
      <Button>Tillbaka till Main View</Button>
    </router-link>
  </section>
  </section>
</template>

