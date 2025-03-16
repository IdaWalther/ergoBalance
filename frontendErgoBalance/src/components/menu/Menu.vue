<script setup lang="ts">
import './menu.scss'
import { Button } from 'primevue';
import { RouterLink } from 'vue-router';
</script>

<template>
    <section class="menu__container">
        <nav class="menu__nav">
            <RouterLink to="/interval">
            <Button class="menu__button">
                <img class="menu__image" src="../../assets/images/hourGlass.png" alt="Timglas för start">
            </Button>
            </RouterLink>
            <RouterLink to="/setupInterval">
            <Button class="menu__button" type="button" label="Inställningar">
                <img class="menu__image" src="../../assets/images/Timesheet.png" alt="inställningar av intervaller">
            </Button>
            </RouterLink>
            <RouterLink to="/setupExercises">
            <Button class="menu__button" type="button" label="Val av övningar" > 
                <img class="menu__image" src="../../assets/images/Squats.png" alt="övning">
            </Button>
                </RouterLink>
            <RouterLink to="/about">
            <Button class="menu__button" type="button" label="Om Oss" >
                <img class="menu__image" src="../../assets/images/info.png" alt="info">
            </Button>
            </RouterLink>
        </nav>
    </section>
</template>