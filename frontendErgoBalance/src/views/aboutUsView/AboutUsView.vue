<script setup lang="ts">
import './aboutUsView.scss'
import Header from '@/components/Header/Header.vue';
import Menu from '@/components/menu/Menu.vue';
</script>

<template>
  <section class="aboutUsView__wrapper">
    <Header />
    <section class="aboutUsView__container">
      <h1 class="aboutUsView__header">Om oss</h1>
      <section class="aboutUsView__section">
        <h3 class="aboutUsView__section-header">Två utvecklare, en smartare arbetsdag</h3>
        <p class="aboutUsView__text"> Hej! Vi är Ida och Lisa, två utvecklare med en passion för både teknik och hälsa. Under vår YH-utbildning insåg vi hur mycket tid vi – och de flesta andra – tillbringar stillasittande, både vid arbete och studier. Det väckte en tanke: Vad om en app kunde påminna oss att röra på oss regelbundet?</p>
        <p class="aboutUsView__text">Så föddes idén till vår ergonomiapp – ett verktyg som hjälper dig att integrera rörelse i din vardag och motverka de negativa effekterna av långvarigt stillasittande. Som en del av vårt examensarbete utvecklade vi en lösning som gör det enkelt att ta aktiva pauser och hålla kroppen i rörelse, utan att störa arbetsflödet.</p>
      </section>
      <img class="aboutUs__img-creators" src="../../assets/images/IdaAndLisa.webp" alt="Ida And Lisa - creator of ErgoBalance">
      <p class="aboutUsView__section-imgInfo" v-animateonscroll="{ enterClass: 'fade-slide-in', leaveClass: 'fadeout' }">Ida och Lisa - Skapare av ErgoBalance</p>
    <section class="aboutUsView__section aboutUsView__section-backgroundcolor"  v-animateonscroll="{ enterClass: 'fade-slide-in', leaveClass: 'fadeout' }">
      <h3 class="aboutUsView__section-header" v-animateonscroll="{ enterClass: 'fade-slide-in', leaveClass: 'fadeout' }">
        Vad gör appen?</h3>
      <section  v-animateonscroll="{ enterClass: 'fade-slide-in', leaveClass: 'fadeout' }">
      <p class="aboutUsView__text">📅 Timer som räknar ner till din nästa paus – För att du ska slippa glömma att röra på dig.</p>
      <p class="aboutUsView__text">🏃 Pausövningar som får dig att sträcka ut och röra på dig – Inga svettiga träningspass, bara enkla rörelser som gör att du mår bättre.</p>
      <p class="aboutUsView__text">⏳ Tydlig info om hur lång pausen är – Så du vet exakt hur länge du kan pausa innan du återgår till jobbet.</p>
      <p class="aboutUsView__text">⚙️ Möjlighet att anpassa övningarna efter dina preferenser – Så du kan välja de övningar som passar bäst för dig och dina behov.</p>
      <p class="aboutUsView__text">Vi skapade den här appen för att vi själva behövde den – och vi hoppas att den hjälper dig också!</p>
      </section>
    </section>
    <article v-animateonscroll="{ enterClass: 'fade-slide-in', leaveClass: 'fadeout' }" >
      <img class="aboutUs__img" src="../../assets/images/simpleErgonomics.webp" alt="person at desk stretching">
    </article>
  </section>
    <Menu />
  </section>
</template>
