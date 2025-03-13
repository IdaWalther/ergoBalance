<script setup lang="ts">
import './aboutUsView.scss'
import Header from '@/components/Header/Header.vue';

</script>

<template>
  <section class="aboutUsView__wrapper">
    <Header />
    <section class="aboutUsView__container">
      <h1 class="aboutUsView__header">Om oss</h1>
      <section class="aboutUsView__section">
      <h3 class="aboutUsView__section-header">Två träningsglada utvecklare och en idé</h3>
      <p> Hej! Vi är Ida och Lisa, två klasskamrater som insåg att vi (och nästan alla andra) sitter alldeles för mycket stilla på jobbet/när vi pluggar. Så vi tänkte: Vad händer om vi bygger en app som säger åt folk att röra på sig – och gör det på ett kul sätt?
        <br>
        Sagt och gjort! Som en del av vårt examensarbete på vår YH-utbildning skapade vi en ergonomiapp som inte låter dig förvandlas till en stel kontorsmumie.
      </p>
      <img class="aboutUs__img-creators" src="../../assets/images/IdaAndLisa.webp" alt="Ida And Lisa - creator of ErgoBalance">
      <p class="aboutUsView__section-imgInfo" v-animateonscroll="{ enterClass: 'fade-slide-in', leaveClass: 'fadeout' }">Ida och Lisa - Skapare av ErgoBalance</p>
    </section>
    <section class="aboutUsView__section aboutUsView__section-backgroundcolor"  v-animateonscroll="{ enterClass: 'fade-slide-in', leaveClass: 'fadeout' }">
      <h3 class="aboutUsView__section-header" v-animateonscroll="{ enterClass: 'fade-slide-in', leaveClass: 'fadeout' }">
        Vad gör appen?</h3>
      <p  v-animateonscroll="{ enterClass: 'fade-slide-in', leaveClass: 'fadeout' }">
📅 Timer som räknar ner till din nästa paus – För att du ska slippa glömma att röra på dig.
<br>
<br>
🏃 Pausövningar som får dig att sträcka ut och röra på dig – Inga svettiga träningspass, bara enkla rörelser som gör att du mår bättre.
<br>
<br>
⏳ Tydlig info om hur lång pausen är – Så du vet exakt hur länge du kan pausa innan du återgår till jobbet.
<br>
<br>
⚙️ Möjlighet att anpassa övningarna efter dina preferenser – Så du kan välja de övningar som passar bäst för dig och dina behov.
<br>
<br>
Vi skapade den här appen för att vi själva behövde den – och vi hoppas att den hjälper dig också!
      </p>
    </section>
    <article v-animateonscroll="{ enterClass: 'fade-slide-in', leaveClass: 'fadeout' }" >
      <img class="aboutUs__img" src="../../assets/images/simpleErgonomics.webp" alt="person at desk stretching">
    </article>
  </section>
  </section>
</template>
