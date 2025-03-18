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
      <p><img src="../../assets/images/hourGlass.png" class="mainView__icon"> Startar ett rörelseprogram. Om inga ändring görs startas ett förinställt program som är 4 timmar långt, med 25 minuters intensivt arbete för att sedan ta en 5 minuter paus för att få in lite rörelse.</p>
      <p>Antalet repetitioner och sets som du gör beror på övningen, din egen kapacitet och dina mål. En bra grundregel är att göra 10-20 repetitioner och 2-3 set. Lyssna på din kropp och anpassa efter vad som känns rätt för dig.</p>
      <p>Klicka på <img src="../../assets/images/Timesheet.png" class="mainView__icon"> om du vill ändra tiden för dina intervaller och <img src="../../assets/images/Squats.png" class="mainView__icon mainView__icon--large"> om du vill göra ändring i ditt program.</p>
         <!-- <img src="../../assets/images/move.webp" class="mainView__image"> -->
</article>
<img src="../../assets/images/move.webp" class="mainView__image">
  </section>
  <Menu />
</section>
</template>
