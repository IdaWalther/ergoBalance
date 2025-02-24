<script setup lang="ts">
import './setupExercisesView.scss'
import Button from 'primevue/button'
import { getProgram } from '../../services/getProgram';
import { editProgram } from '../../services/editProgram';
import { getExercises } from '../../services/getExercises';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { onMounted, ref } from 'vue'

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
  program.value = await getYourProgram()  
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
  console.log('Visa alla övningar')
  showMyProgram.value = false
  showExercises.value = true
  try {
    const response = await getExercises('exercisesUrl')
    if (response.success) {
      allExercises.value = response.data
    }
  } catch (error) {
    console.error('error', error)
  }
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
    <router-link to="/main">
      <figure>
        <img class="setupExercisesView__logo" src="../../assets/images/ergoBalanceLogo.png" alt="logo som tar dig tillbaka till startsidan" />
      </figure>
      </router-link>
    <section class="setupExercisesView__header">
      <Button @click="myProgram" class="setupExercisesView__button">Mitt program</Button>
      <Button @click="showAllExercises"  class="setupExercisesView__button">Alla övningar</Button>
    </section>
    <section v-if="showMyProgram">
      <h2 class="setupExercisesView__title">Ta bort övningar</h2>
      <section class="setupExercisesView__container">
      <ul v-for:="item in program.exercises" class="setupExercisesView__ul">
        <li class="setupExercisesView__li">{{ item.name }}
        <Button @click="removeExercise(item.pk, item.sk)"  class="setupExercisesView__button setupExercisesView__button--remove">-</Button>
        </li>
      </ul>
      </section>
    </section>
    <section v-if="showExercises">
      <h2 class="setupExercisesView__title">Lägg till övningar</h2>
      <section class="setupExercisesView__container">
        <ul v-for:="item in allExercises" class="setupExercisesView__ul">
          <li>
            <ul class="setupExercisesView__ul setupExercisesView__ul--inner">
              <li @click="showMoreInfo(item.name, item.desc, item.image)">
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
