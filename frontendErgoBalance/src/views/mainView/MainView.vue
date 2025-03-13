<script setup lang="ts">
import './mainView.scss'
import {ref, onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode';
import MenuComponent from '@/components/menu/Menu.vue'


const token = localStorage.getItem('token')
const username = ref('Gäst')

const getUsername = () => {
  if(token) {
    try {
      const decoded = jwtDecode(token)
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
  <section class="mainView__container">
    <MenuComponent />
    <img class="mainView__logo" src="../../assets/images/ergoBalanceLogo.png" alt="ergoBalanceLogo">
    <h1 class="mainView__header">Välkommen {{ username }}</h1>
  </section>
</section>
</template>
