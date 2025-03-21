<script setup lang="ts">
import './header.scss'
import { RouterLink } from 'vue-router';
import { Button } from 'primevue';
import { useRouter } from 'vue-router'
import { useIntervalTimer } from '../../stores/intervalStore'
import { userAuthenticate } from '../../services/userAuthenticate'

const router = useRouter()
const {logoutUser} = userAuthenticate()
const intervalTimer = useIntervalTimer()

const logout = () => {
  logoutUser()
  intervalTimer.stop()
  router.push('/')
}
</script>

<template>
<section class="header__wrapper">
    <RouterLink to="/main">
        <img class="header__logo" src="../../assets/images/ergoBalanceLogo.png" alt="ergoBalanceLogo">
    </RouterLink>
    <Button @click="logout" class="header__btn" type="button" label="Logga ut" />
</section>
</template>