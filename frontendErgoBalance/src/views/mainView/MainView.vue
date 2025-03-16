<script setup lang="ts">
import './mainView.scss'
import {ref, onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode'
import Header from '@/components/Header/Header.vue';
import MenuComponent from '@/components/menu/Menu.vue';

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
    <MenuComponent />
    <h1 class="mainView__heading">Välkommen {{ username }}</h1>
  </section>
</section>
</template>
