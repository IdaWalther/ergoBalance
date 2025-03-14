<script setup lang="ts">
import './menu.scss'
import { Button } from 'primevue';
import { RouterLink } from 'vue-router';
import { useIntervalTimer } from '../../stores/intervalStore'

const intervalTimer = useIntervalTimer()

function resetAndStart() {
    intervalTimer.stop()
    intervalTimer.start()
}
</script>

<template>
    <nav class="menu__nav">
        <!-- <Button class="menu__button" type="button" label="Återuppta intervaller" />
        <RouterLink to="/interval">
        <Button class="menu__button" type="button" label="Starta nya intervaller" /> -->
        <!-- <RouterLink v-if="intervalTimer.isRunning" to="/interval">
            <Button class="menu__button--light">
            Tillbaka till intervaller
            </Button>
        </RouterLink> -->
        <RouterLink to="/interval">
        <!-- <Button class="menu__button"
        @click="resetAndStart">
            <img src="../../assets/images/hourGlass.png" alt="Timglas"> 
        </Button> -->
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
</template>