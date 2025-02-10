<script setup>
import './setupIntervalView.scss'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useIntervalTimer } from '../../stores/intervalStore.js'

const intervalTimer = useIntervalTimer()

const localWorkInterval = ref(intervalTimer.workInterval / 60)
const localBreakDuration = ref(intervalTimer.breakDuration / 60)
const saveMessage = ref('')
const isFadingOut = ref(false)

function update() {
  intervalTimer.updateSettings(
    localWorkInterval.value * 60,
    localBreakDuration.value * 60
  )
  saveMessage.value = 'Inställningar sparade!'
  isFadingOut.value = false

  setTimeout(() => {
    isFadingOut.value = true  
  }, 2500)

  setTimeout(() => {
    saveMessage.value = '' 
    isFadingOut.value = false
  }, 3500) 
}
</script>

<template>
  <section class="setupIntervalView__wrapper">
    <form class="setupIntervalView__container" @submit.prevent="update">
      <div>
        <label>
          Tid för arbete (i minuter):
          <input type="number" v-model.number="localWorkInterval" />
        </label>
      </div>
      <div>
        <label>
         Tid för paus (i minuter):
          <input type="number" v-model.number="localBreakDuration" />
        </label>
      </div>
      <button type="submit">Spara</button>
      <p v-if="saveMessage" :class="{'fade-out': isFadingOut}" class="save-message">{{ saveMessage }}</p>
    </form>
     <router-link to="/main">
      <button>Tillbaka</button> 
    </router-link>  
  </section>
</template>
