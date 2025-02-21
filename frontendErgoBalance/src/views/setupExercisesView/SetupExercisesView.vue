<script setup lang="ts">
import './setupExercisesView.scss'
import Button from 'primevue/button'
import { getProgram } from '../../services/getProgram';
import { editProgram } from '../../services/editProgram';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { onMounted, ref } from 'vue'
import { ErrorMessage } from 'vee-validate';

const token = localStorage.getItem('token')
const username = ref('')
const showExercises = ref(false)
const showMyProgram = ref(false)
const program = ref()

interface CustomJwtPayload extends JwtPayload {
  username: string
}

const getUsername = () => {
  if(token) {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token)
      username.value = decoded.username
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

const removeExercise = async (pk:string, sk:string) => {
  console.log(username.value)

  const information = {
    removeExercises : [
      sk
    ]
  }
  console.log("pk:", pk)
  console.log("sk:", sk)
  try {
    await editProgram('userUrl', username.value, information)
    myProgram()
  } catch(error) {
    console.log('error:', error)
    throw error
  }


}
</script>

<template>
  <section class="setupExercisesView__wrapper">
    <Button @click="myProgram" class="setupExercisesView__button">Mitt program</Button>
    <Button @click="showAllExercises"  class="setupExercisesView__button">Alla övningar</Button>
    <section v-if="showMyProgram" class="setupExercisesView__container">
      <h2>{{ program.name }}</h2>
      <ul v-for:="item in program.exercises" class="setupExercisesView__ul">
        <li class="setupExercisesView__li">{{ item.name }}
        <Button @click="removeExercise(item.pk, item.sk)"  class="setupExercisesView__button setupExercisesView__button--remove">X</Button>
        </li>
      </ul>


    </section>
    <section v-if="showExercises" class="setupExercisesView__container">
      <p>Knappen Alla övningar är klickad på</p>
    </section>
  </section>
</template>
