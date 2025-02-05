<script setup lang="ts">
import './mainView.scss'
import { Button } from 'primevue';
import { RouterLink } from 'vue-router';

</script>

<template>
  <img class="mainView__logo" src="../../assets/images/ergoBalanceLogo.png" alt="ergoBalanceLogo">
  <section class="mainView__wrapper">
    <Button class="mainView__button" type="button" label="Återuppta intervaller" />
    <Button class="mainView__button" type="button" label="Starta nya intervaller" />
    <Button class="mainView__button" type="button" label="Inställningar för intervaller" />
    <RouterLink to="/about">
      <Button class="mainView__button" type="button" label="Om Appen" />
    </RouterLink>
    <Button class="mainView__button" type="button" label="Logga ut" />
  </section>
</template>
