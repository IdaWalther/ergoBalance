<script setup lang="ts">
import './mainView.scss'
import { Button } from 'primevue';
import { RouterLink } from 'vue-router';
import { useIntervalTimer } from '../../stores/intervalStore.js'

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
    <RouterLink v-if="intervalTimer.isRunning" to="/interval">
        <button class="mainView__button--light">Återuppta intervaller</button>
      </RouterLink>
      <RouterLink to="/interval">
      <button class="mainView__button"
      @click="resetAndStart">
      Nya intervaller
    </button>
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
