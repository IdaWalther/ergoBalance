<script setup lang="ts">
import './mainView.scss'
import {ref, onMounted } from 'vue'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
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
    <h1 class="mainView__heading">Välkommen {{ username }}!</h1>
    <article class="mainView__intro">
        <p>Vi är glada att du är här och vill börja röra på dig under din arbetsdag. Regelbundna rörelsepauser kan förbättra både din fysiska och mentala hälsa.</p>
        <p>Forskning visar att korta pauser för rörelse kan öka produktiviteten, minska stress och förbättra koncentrationen. Genom att röra på dig under dagen kan du också minska risken för allvarliga hälsoproblem som hjärt-kärlsjukdomar, diabetes och muskelbesvär.</p>        
        <p>Det handlar inte om att träna intensivt (även om det såklart också har sina fördelar), utan snarare om att bryta upp stillasittandet för att främja blodcirkulationen och ge både kroppen och hjärnan en välbehövlig paus. Små rörelser kan göra stor skillnad – och vi är här för att hjälpa dig att komma igång!</p>
      </article>   
      <img src="../../assets/images/move.webp" class="mainView__image">
      <article class="mainView__article">
        <h2 class="mainView__subheading">Så här fungerar appen:</h2>
        <article class="mainView__feature">
          <img src="../../assets/images/hourGlass.png" class="mainView__icon">
          <p>Ett rörelseprogram startas automatiskt. Om inga ändringar görs, startas ett förinställt program på 4 timmar, där 25 minuters arbete följs av en 5-minuters paus.</p>
        </article>
        <article class="mainView__feature mainView__infobox">
          <p>Antalet repetitioner och sets beror på övningen, din kapacitet och dina mål. En bra grundregel är att göra 10–20 repetitioner och 2–3 set. Lyssna på din kropp och anpassa efter vad som känns rätt.</p>
        </article>
        <article class="mainView__feature">
          <img src="../../assets/images/Timesheet.png" class="mainView__icon">
          <p>Ändra tiden för dina intervaller om du önskar.</p>
        </article>
        <article class="mainView__feature mainView__lastfeature">
          <img src="../../assets/images/Squats.png" class="mainView__icon mainView__icon--large">
          <p>Välj och anpassa övningarna i ditt program.</p>
        </article>
      </article>
  </section>
  <Menu />
</section>
</template>
