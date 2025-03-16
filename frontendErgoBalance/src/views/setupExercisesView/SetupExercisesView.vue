<script setup lang="ts">
import './setupExercisesView.scss'
import Button from 'primevue/button'
import { getProgram } from '../../services/getProgram';
import { editProgram } from '../../services/editProgram';
import { getExercises } from '../../services/getExercises';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { onMounted, ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner';
import Header from '@/components/Header/Header.vue';

const token = localStorage.getItem('token')
const username = ref('')
const exname = ref('')
const exdesc = ref('')
const eximage = ref('')
const showExercises = ref(false)
const showMyProgram = ref(false)
const showInfo = ref(false)
const program = ref()
const allExercises = ref()
const loadingProgram = ref(false)
const loadingExercises = ref(false)

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
  loadingProgram.value = true
  program.value = await getYourProgram()
  loadingProgram.value = false  
}

const getYourProgram = async () => {
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
const showAllExercises = async () => {
  showMyProgram.value = false
  showExercises.value = true
  loadingExercises.value = true
  try {
    const response = await getExercises('exercisesUrl')
    if (response.success) {
      allExercises.value = response.data
    }
  } catch (error) {
    console.error('error', error)
  }
  loadingExercises.value = false
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

const addExercise = async (pk: string, sk:string, name:string, desc: string, image: string) => {
  const information = {
    "addExercises": [
      {
        "pk": pk,
        "sk": sk,
        "name": name,
        "image": image,
        "desc": desc
      }
    ],
  }
  try {
    await editProgram('userUrl', username.value, information)
    myProgram()
  } catch(error) {
    console.log('error:', error)
    throw error
  }
}

const showMoreInfo = (name : string, desc : string, image : string) => {
  console.log('show Info', name, desc, image)
  showInfo.value = true;
  exname.value = name
  exdesc.value = desc
  eximage.value = image
}

const dontShow = () => {
  showInfo.value = false
}
</script>

<template>
  <section class="setupExercisesView__wrapper">
  <Header />
    <section class="setupExercisesView__header">
      <Button @click="myProgram" class="setupExercisesView__button">Mitt program</Button>
      <Button @click="showAllExercises"  class="setupExercisesView__button">Alla övningar</Button>
      
    </section>
    <section v-if="loadingProgram || loadingExercises" class="setupExercisesView__loading">
      <img class="loading__image" src="../../assets/images/loading.png" alt="Laddar..." />
      <ProgressSpinner 
        style="width: 40px; height: 40px" 
        strokeWidth="8" 
        fill="transparent"
        animationDuration=".5s" 
        aria-label="Loading" 
      />
      <h2>Laddar...</h2>
    </section>
    <section v-if="showMyProgram && !loadingProgram">
      <h2 class="setupExercisesView__title">Mina övningar</h2>
      <p class="setupExercisesView__text">Klicka på knappen bredvid den övning du vill ta bort från ditt program. Klicka för mer information om övningen.</p>

      <section class="setupExercisesView__container">
      <ul v-for:="item in program.exercises" class="setupExercisesView__ul">
        <li>
          <ul class="setupExercisesView__ul setupExercisesView__ul--inner">
            <li class="setupExercisesView__li--inner" @click="showMoreInfo(item.name, item.desc, item.image)">
              {{ item.name }}
            </li>
            <li>
              <Button @click="removeExercise(item.pk, item.sk)"  class="setupExercisesView__button setupExercisesView__button--remove">-</Button>
            </li>
          </ul>
        </li>
      </ul>
      </section>
    </section>
    <section v-if="showExercises && !loadingExercises">
      <h2 class="setupExercisesView__title">Alla övningar</h2>
      <p class="setupExercisesView__text">Klicka på knappen bredvid den övning du vill lägga till i ditt program. Klicka för mer information om övningen.</p>
      <section class="setupExercisesView__container">
        <ul v-for:="item in allExercises" class="setupExercisesView__ul">
          <li>
            <ul class="setupExercisesView__ul setupExercisesView__ul--inner">
              <li class="setupExercisesView__li--inner" @click="showMoreInfo(item.name, item.desc, item.image)">
                {{ item.name }}
              </li>
              <li>
                <Button @click="addExercise(item.pk, item.sk, item.name, item.desc, item.image)"  class="setupExercisesView__button setupExercisesView__button--add">+</Button>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </section>
    <div v-if="showInfo" class="setupExercisesView__modal">
      <section class="setupExercisesView__modal-section">
        <Button class="setupExercisesView__modal-button" @click="dontShow">Tillbaka</Button>
        <h1 class="setupExercisesView__modal-title">{{exname}}</h1>
        <p class="setupExercisesView__modal-text">{{ exdesc }}</p>
        <img :src="eximage" class="setupExercisesView__modal-image">
      </section>
    </div>
  </section>
</template>
