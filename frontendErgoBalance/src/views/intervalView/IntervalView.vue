<script setup lang="ts">
import './intervalView.scss'
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { Button } from 'primevue';
import { computed, ref, onMounted, watch } from 'vue'
import { useIntervalTimer } from '../../stores/intervalStore.ts'
import { getProgram } from '@/services/getProgram.ts';

interface CustomJwtPayload extends JwtPayload {
  username?: string
}

const intervalTimer = useIntervalTimer()
const program = ref<any>(null)
const currentExerciseIndex = ref(0);

const token = localStorage.getItem('token')
const username = ref<string | null>(null)

const getUsername = () => {
  if(token) {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token)
      console.log('decoded token:', decoded)
      username.value = decoded.username ?? null
    } catch(error) {
      console.log('Kunde inte dekoda token:', error)
    }
  }
}

const fetchProgram = async () => {
  if (!username.value) return
  try {
    const response = await getProgram('userUrl', username.value)
    if (response.success) {
      program.value = response.data
      console.log('hämtat program:', program.value)

    } else {
      console.error('Error:', response.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

onMounted(() => {
    getUsername();
});

watch([username], ([newUsername]) => {
  if (newUsername) {
    fetchProgram()
  }
})

const formattedRemainingTime = computed(() => {
  const minutes = Math.floor(intervalTimer.remainingTime / 60)
  const seconds = intervalTimer.remainingTime % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
})

const currentExercise = computed(() => {
  if (!program.value || !program.value.exercises) return null;
  const exercises = program.value.exercises; 
  if (exercises.length === 0) return null;
  return exercises[currentExerciseIndex.value % exercises.length]; 
});

watch(() => intervalTimer.currentPhase, (newPhase) => {
  if (newPhase === "break") {
    currentExerciseIndex.value++; 
  console.log('nuvarande övning:', currentExercise.value)
  }
});

function stop() {
  intervalTimer.stop()
}

function togglePause() {
  intervalTimer.pauseToggle()
}

</script>

<template>
  <section class="intervalView__wrapper">
    <section class="intervalView__container">
      <section v-if="!intervalTimer.isRunning">
        <h1>nu är det slut!</h1>
        <router-link to="/main">
          <Button class="interval__btn">Tillbaka till Main View</Button>
        </router-link>
      </section>
      <section v-else>
        <h1>Timer</h1>
        <p> Fas: <strong>{{ intervalTimer.currentPhase }}</strong></p>
        <p> Tid kvar: <strong>{{ formattedRemainingTime }}</strong></p>
        <section v-if="intervalTimer.currentPhase === 'work'">
          <h1>Timer</h1>
          <p> Tid kvar: <strong>{{ formattedRemainingTime }}</strong></p>
        </section>
        <section v-if="intervalTimer.currentPhase === 'break' && currentExercise">
          <h1>Break Time!</h1>
          <h2>{{ currentExercise.name }}</h2>
          <img :src="currentExercise.image" :alt="currentExercise.name" width="50" />
          <p>{{ currentExercise.desc }}</p>
        </section>
        <Button v-if="intervalTimer.isRunning" @click="togglePause">
          {{ intervalTimer.isPaused ? 'starta intervaller igen' : 'Pausa Intervaller' }}
        </Button>
        <Button class="interval__btn" @click="stop" :disabled="!intervalTimer.isRunning">
          Stoppa Intervaller
        </Button>
        <router-link to="/main">
          <Button class="interval__btn">Tillbaka till Main View</Button>
        </router-link>
      </section>
    </section>
  </section>
</template>

