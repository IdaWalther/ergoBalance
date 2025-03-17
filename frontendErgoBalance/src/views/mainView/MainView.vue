<script setup lang="ts">
import './mainView.scss'
import {ref, onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode'
import Header from '@/components/Header/Header.vue';
import Menu from '@/components/menu/Menu.vue';

const token = localStorage.getItem('token')
const username = ref('Gäst')

interface CustomJwtPayload extends JwtPayload {
  username?: string
}

const getUsername = () => {
  if(token) {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token)
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
</script>

<template>
  <section class="mainView__wrapper">
    <Header />
  <section class="mainView__container">
    <h1 class="mainView__heading">Välkommen {{ username }}</h1>
    <article class="mainView__article">
      <img src="../../assets/images/move.webp" class="mainView__image">
      <p><img src="../../assets/images/hourGlass.png" class="mainView__icon"> Starta ett rörelseprogram. Om inga ändring görs startas ett förinställt program som är 4 timmar långt, med 25 minuters intensivt arbete för att sedan ta en 5 minuter paus för att få in lite rörelse.</p>
      <p><img src="../../assets/images/Timesheet.png" class="mainView__icon"> Vill du själv göra ändring i timern</p>
      <p><img src="../../assets/images/Squats.png" class="mainView__icon mainView__icon--large"> Om du vill göra ändring i ditt program</p>
    </article>
  </section>
  <Menu />
</section>
</template>
