<script setup lang="ts">
import './mainView.scss'
import { Button } from 'primevue';
import { RouterLink } from 'vue-router';
import {ref, onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode';
import { useIntervalTimer } from '../../stores/intervalStore.ts'
import { userAuthenticate } from '../../services/userAuthenticate'
import { useRouter } from 'vue-router'


const token = localStorage.getItem('token')
const username = ref('Gäst')
const router = useRouter()
const {logoutUser} = userAuthenticate()

const getUsername = () => {
  if(token) {
    try {
      const decoded = jwtDecode(token)
      console.log('decoded', decoded)
      username.value = decoded.username || 'Gäst'
    } catch(error) {
      console.log('Kunde inte dekoda token:', error)
    }
  }
}
onMounted(() => {
    getUsername();
});

const logout = () => {
  logoutUser()
  intervalTimer.stop()
  router.push('/')
}

const intervalTimer = useIntervalTimer()

function resetAndStart() {
  intervalTimer.stop()
  intervalTimer.start()
}
</script>

<template>
  <section class="mainView__wrapper">
  <section class="mainView__container">
    <img class="mainView__logo" src="../../assets/images/ergoBalanceLogo.png" alt="ergoBalanceLogo">
    <h1 class="mainView__header">Välkommen {{ username }}</h1>
    <!-- <Button class="mainView__button" type="button" label="Återuppta intervaller" />
    <RouterLink to="/interval">
      <Button class="mainView__button" type="button" label="Starta nya intervaller" /> -->
    <RouterLink v-if="intervalTimer.isRunning" to="/interval">
        <Button class="mainView__button--light">
          Tillbaka till intervaller
        </Button>
    </RouterLink>
    <RouterLink to="/interval">
      <Button class="mainView__button"
       @click="resetAndStart">
       Nya intervaller
      </Button>
    </RouterLink>
    <RouterLink to="/setupInterval">
      <Button class="mainView__button" type="button" label="Inställningar för intervaller" />
    </RouterLink>
    <RouterLink to="/about">
      <Button class="mainView__button" type="button" label="Om Appen" />
    </RouterLink>
    <Button @click="logout" class="mainView__button" type="button" label="Logga ut" />
  </section>
</section>
</template>
