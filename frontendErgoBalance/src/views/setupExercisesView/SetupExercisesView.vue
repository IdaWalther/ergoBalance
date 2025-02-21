<script setup lang="ts">
import Button from 'primevue/button'
import { getProgram } from '../../services/getProgram';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { onMounted, ref } from 'vue'

const token = localStorage.getItem('token')
const username = ref<string | null>(null)
const showExercises = ref(false)
const showMyProgram = ref(false)
const program = ref()

interface CustomJwtPayload extends JwtPayload {
  username?: string
}

const getUsername = () => {
  if(token) {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token)
      username.value = decoded.username ?? null
    } catch(error) {
      console.log('Kunde inte dekoda token:', error)
    }
  }
}

onMounted(() => {
    getUsername()
    myProgram()
});


const myProgram = async () => {
  showExercises.value = false
  showMyProgram.value = true
  program.value = await getExercises()  
}

const getExercises = async () => {
  if (!username.value) return
  try {
    const response = await getProgram('userUrl', username.value)
    if (response.success) {
      return response.data

    } else {
      console.error('Error:', response.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
const showAllExercises = () => {
  console.log('Visa alla övningar')
  showMyProgram.value = false
  showExercises.value = true
}

const removeExercise = (pk:string, sk:string) => {
  console.log("pk:", pk)
  console.log("sk:", sk)
}
</script>

<template>
  <section class="setupExercisesView__wrapper">
    <h1>SetupExercisesView</h1>
    <Button @click="myProgram">Mitt program</Button>
    <Button @click="showAllExercises">Alla övningar</Button>
    <section v-if="showMyProgram">
      <p>Knappen mitt program är aktiv</p>
      {{ program.name }}
      <section v-for:="item in program.exercises">
        <h2>{{ item.name }}</h2>
        <Button @click="removeExercise(item.pk, item.sk)">Ta bort</Button>
      </section>


    </section>
    <section v-if="showExercises">
      <p>Knappen Alla övningar är klickad på</p>
    </section>
  </section>
</template>
