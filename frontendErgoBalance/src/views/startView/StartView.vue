<script setup lang="ts">
import './startView.css'
import Button from 'primevue/button'

</script>

<template>
  <section class="startView__wrapper">
    <h1 class="startView__title">ErgoBalance</h1>
    <figure>
      <img class="startView__logo" src="../../assets/ergoBalanceLogo.png" alt="logo">
    </figure>
    <Button type="button" class="startView__button" label="Logga in" :to="{ name: 'about'}" />
    <!-- <Button type="button" class="startView__registerButton" label="Inte användare än? Registrera dig här!"  /> -->
  </section>
</template>
