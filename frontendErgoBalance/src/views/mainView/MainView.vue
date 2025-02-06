<script setup lang="ts">
import './mainView.scss'
import { Button } from 'primevue';
import { RouterLink } from 'vue-router';

</script>

<template>
  <section class="mainView__wrapper">
  <section class="mainView__container">
    <img class="mainView__logo" src="../../assets/images/ergoBalanceLogo.png" alt="ergoBalanceLogo">
    <!-- <Button class="mainView__button" type="button" label="Återuppta intervaller" /> -->
    <RouterLink to="/interval">
      <Button class="mainView__button" type="button" label="Starta nya intervaller" />
    </RouterLink>
    <RouterLink to="/setupInterval">
      <Button class="mainView__button" type="button" label="Inställningar för intervaller" />
    </RouterLink>
    <RouterLink to="/about">
      <Button class="mainView__button" type="button" label="Om Appen" />
    </RouterLink>
    <Button class="mainView__button" type="button" label="Logga ut" />
  </section>
</section>
</template>
