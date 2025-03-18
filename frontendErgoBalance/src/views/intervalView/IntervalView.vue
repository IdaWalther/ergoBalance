<script setup lang="ts">
import './intervalView.scss'
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { Button } from 'primevue';
import { computed, ref, onMounted, watch } from 'vue'
import { useIntervalTimer } from '../../stores/intervalStore.ts'
import { getProgram } from '@/services/getProgram.ts';
import ProgressBar from 'primevue/progressbar';
import Checkbox from 'primevue/checkbox';
import { RouterLink } from 'vue-router';
import Header from '@/components/Header/Header.vue';
import Menu from '@/components/menu/Menu.vue';

interface CustomJwtPayload extends JwtPayload {
  username?: string
}

const intervalTimer = useIntervalTimer()
const program = ref<any>(null)
const currentExerciseIndex = ref(0);
const token = localStorage.getItem('token')
const username = ref<string | null>(null)
const alarmSound = ref<HTMLAudioElement | null>(null);
const expanded = ref(false);

const toggleDescription = () => {
  expanded.value = !expanded.value;
};

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
    start();
    if (!alarmSound.value) {
    alarmSound.value = new Audio('/short-beep-tone-47916.mp3');
    alarmSound.value.volume = 0.5;
    alarmSound.value.load();
  }
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
  return program.value?.exercises?.[currentExerciseIndex.value % program.value.exercises.length] || null;
});

watch(() => intervalTimer.currentPhase, (newPhase) => {
  playAlarm();
  if (newPhase === "break") {
    currentExerciseIndex.value++; 
  console.log('nuvarande övning:', currentExercise.value)
  }
});

function start() {
  intervalTimer.start()
}

function stop() {
  intervalTimer.stop()
}

function togglePause() {
  intervalTimer.pauseToggle()
}

function playAlarm() {
  if (!intervalTimer.alarmEnabled || !alarmSound.value) return;
  if (alarmSound.value.readyState >= 2) { 
    alarmSound.value.currentTime = 0;
    alarmSound.value.play().catch(err => console.error('Autoplay blockerad:', err));
  }
}

</script>

<template>
  <section class="intervalView__wrapper">
    <Header />
    <section class="intervalView__container">
      <section v-if="!intervalTimer.isRunning" class="finished-view">
        <h1 class="intervalView__endtext">Slut på intervallerna</h1>
        <router-link to="/main">
          <Button class="interval__btn">Tillbaka</Button>
        </router-link>
      </section>
      <section v-else class="active-view">
      <section>
        <p class="progress__text">Tid kvar på intervallerna:</p>
        <ProgressBar :value="intervalTimer.progressPercentage" class="intervalView__progressbar" />
        <p class="phase-text">{{ intervalTimer.currentPhase === 'work' ? 'Nästa övning börjar om:' : 'Paus' }}</p>
        <p class="time-left">{{ formattedRemainingTime }}</p>
        </section>
        <section v-if="intervalTimer.currentPhase === 'break' && currentExercise">
          <h2>{{ currentExercise.name }}</h2>
          <img :src="currentExercise.image" :alt="currentExercise.name" class="exercise-image" />
        <p class="intervalView__desc" @click="toggleDescription">{{ currentExercise.desc }}</p>
        <section v-if="expanded" class="description-popup" @click="toggleDescription">
         <p>{{ currentExercise.desc }}</p>
        </section>
        </section>
        <section v-if="intervalTimer.currentPhase === 'work'">
        </section>
        <section>
        <article class="intervalView__alarmBtnContainer">    
          <Checkbox v-model="intervalTimer.alarmEnabled" binary class="interval__btn"/>
        <p class="intervalView__alarmBtn--text">{{ intervalTimer.alarmEnabled ? 'Alarm: På' : 'Alarm: Av' }}</p>
      <Button class="interval__btn--phasechange" v-if="intervalTimer.isRunning" @click="intervalTimer.skipToNextPhase">Till nästa fas</Button>
    </article>
      <Button class="interval__btn" v-if="intervalTimer.isRunning" @click="togglePause">
          {{ intervalTimer.isPaused ? 'Fortsätt' : 'Pausa' }}
        </Button>
        <Button class="interval__btn interval__btn-stop" @click="stop" :disabled="!intervalTimer.isRunning">
          Stoppa
        </Button>
      </section>
      </section>
    </section>
    <Menu />
  </section>
</template>

