<script setup lang="ts">
import './setupIntervalView.scss'
import { computed, ref } from 'vue'
import { Button } from 'primevue';
import { RouterLink } from 'vue-router'
import { useIntervalTimer } from '../../stores/intervalStore.ts'
import InputNumber from 'primevue/inputnumber';

const intervalTimer = useIntervalTimer()

const localWorkInterval = ref(intervalTimer.workInterval / 60)
const localBreakDuration = ref(intervalTimer.breakDuration / 60)
const saveMessage = ref('')
const isFadingOut = ref(false)

const overallDurationHours = computed({
  get: () => intervalTimer.overallTime / 3600,  
  set: (val) => {
    intervalTimer.overallTime = val * 3600;
  },
});

function update() {
  intervalTimer.updateSettings(
    localWorkInterval.value * 60,
    localBreakDuration.value * 60,
    intervalTimer.overallTime
  )

  saveMessage.value = 'Inställningar sparade!'

  setTimeout(() => {
    isFadingOut.value = true
  },2500)

  setTimeout(() => {
    saveMessage.value = ''
    isFadingOut.value = false
  }, 3500)
}

</script>

<template>
  <section class="setupIntervalView__wrapper">
    <form class="setupIntervalView__container" @submit.prevent="update">
      <article>
        <label>
          Tid för arbete (i minuter):
          <InputNumber v-model.number="localWorkInterval" :min="0" :max="100" showButtons buttonLayout="horizontal" fluid />
        </label>
      </article>
      <article>
        <label>
         Tid för paus (i minuter):
          <InputNumber v-model.number="localBreakDuration" :min="0" :max="100" showButtons buttonLayout="horizontal" fluid />
        </label>
      </article>
      <article>
        <label>
         Övergripande tid för alla intervaller:
          <InputNumber v-model.number="overallDurationHours" :min="0" :max="1000" showButtons suffix=" h" buttonLayout="horizontal" fluid />
        </label>
      </article>
      <article>
        <RouterLink to="/setupExercises">
      <Button class="setupInterval__btn">Val av övningar</Button>
        </RouterLink>
      </article>
      <Button class="setupInterval__btn" type="submit">Spara</Button>
      <p v-if="saveMessage" :class="{'fade-out': isFadingOut}" class="save-message">{{ saveMessage }}</p>
      <router-link to="/main">
      <Button class="setupInterval__btn">Tillbaka</Button>
    </router-link>
  </form>
  
  </section>
</template>
