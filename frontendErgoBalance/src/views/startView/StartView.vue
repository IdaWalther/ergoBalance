<script setup lang="ts">
import './startView.scss'
import Button from 'primevue/button'
import { RouterLink } from 'vue-router'
import { userAuthenticate } from '../../services/userAuthenticate'
import { onMounted} from 'vue'
import { useRouter } from 'vue-router'

const {isAuthenticated} = userAuthenticate()
const router = useRouter()

const loggedIn = () => {
  if(isAuthenticated()) {
    router.push('/main')
  }
}
onMounted(() => {
  loggedIn();
});
</script>

<template>
  <section class="startView__wrapper">
    <h1 class="startView__title">ErgoBalance</h1>
    <figure>
      <img class="startView__logo" src="../../assets/images/ergoBalanceLogo.png" alt="logo" />
    </figure>
    <RouterLink to="/login">
      <Button class="startView__button" type="button" label="Logga in" />
    </RouterLink>
    <RouterLink to="/register">
      <Button class="startView__button startView__button--register" type="button"
        label="Inte medlem ännu? Registrera dig här" />
    </RouterLink>
  </section>
</template>
