<script setup lang="ts">
import './startView.css'
import Button from 'primevue/button'
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="startView__wrapper">
    <h1 class="startView__title">ErgoBalance</h1>
    <figure>
      <img class="startView__logo" src="../../assets/ergoBalanceLogo.png" alt="logo" />
    </figure>
    <RouterLink class="startView__button" to="/login">
      <Button type="button" label="Logga in" />
    </RouterLink>
    <RouterLink class="startView__button startView__button--register" to="/register">
      <Button type="button" label="Inte medlem ännu? Registrera dig här" />
    </RouterLink>
  </section>
</template>
