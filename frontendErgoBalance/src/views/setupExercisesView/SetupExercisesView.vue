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
import Menu from '@/components/menu/Menu.vue';

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
const selectedExercise = ref<string[]>([])

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

  if(program.value && program.value.exercises) {
    selectedExercise.value = program.value.exercises.map((exercise: any) => exercise.sk)
  }
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
    selectedExercise.value = selectedExercise.value.filter((exercise) => exercise !== sk)
    updatePage()
  } catch(error) {
    console.log('error:', error)
    throw error
  }
}

const updatePage = () => {
  if(showMyProgram.value) {
    myProgram()
  } else {
    showAllExercises()
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
    if(!selectedExercise.value.includes(sk)) {
      selectedExercise.value.push(sk)
    }
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
      <section class="setupExercisesView__container">
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
          <section class="setupExercisesView__articleContainter">
            <article class="setupExercisesView__article">
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
              </article>
          </section>
        </section>
        <section v-if="showExercises && !loadingExercises">
          <h2 class="setupExercisesView__title">Alla övningar</h2>
          <section class="setupExercisesView__articleContainter">
            <article class="setupExercisesView__article">
              <ul v-for:="item in allExercises" class="setupExercisesView__ul">
                <li>
                  <ul :class="['setupExercisesView__ul setupExercisesView__ul--inner', selectedExercise.includes(item.sk) ? 'added' : '']">
                    <li class="setupExercisesView__li--inner" @click="showMoreInfo(item.name, item.desc, item.image)">
                      {{ item.name }}
                    </li>
                    <li>
                      <Button 
                        @click="selectedExercise.includes(item.sk) ? removeExercise(item.pk, item.sk) : addExercise(item.pk, item.sk, item.name, item.desc, item.image)"  
                        :class="['setupExercisesView__button', selectedExercise.includes(item.sk) ?'setupExercisesView__button--remove' : 'setupExercisesView__button--add']">
                        {{selectedExercise.includes(item.sk) ? '-' : '+'}}
                      </Button>
                    </li>
                  </ul>
                </li>
              </ul>
            </article>
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
      <section class="setupExercisesView__buttonContainer">
        <Button @click="myProgram" class="setupExercisesView__button">Mitt program</Button>
        <Button @click="showAllExercises"  class="setupExercisesView__button">Alla övningar</Button>
      </section>
    </section>
    <Menu />
  </section>
</template>
