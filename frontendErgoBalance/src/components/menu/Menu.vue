<script setup lang="ts">
import './menu.scss'
import { Button } from 'primevue';
import { RouterLink } from 'vue-router';
import { useIntervalTimer } from '../../stores/intervalStore'
import { userAuthenticate } from '../../services/userAuthenticate'
import { useRouter } from 'vue-router'

const router = useRouter()
const {logoutUser} = userAuthenticate()


const logout = () => {
    logoutUser()
    intervalTimer.stop()
    router.push('/')
}

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
        <RouterLink v-if="intervalTimer.isRunning" to="/interval">
            <Button class="menu__button--light">
            Tillbaka till intervaller
            </Button>
        </RouterLink>
        <RouterLink to="/interval">
        <Button class="menu__button"
            @click="resetAndStart">
            Nya intervaller
        </Button>
        </RouterLink>
        <RouterLink to="/setupInterval">
        <Button class="menu__button" type="button" label="Inställningar för intervaller" />
        </RouterLink>
        <RouterLink to="/setupExercises">
        <Button class="menu__button" type="button" label="Val av övningar" />
            </RouterLink>
        <RouterLink to="/about">
        <Button class="menu__button" type="button" label="Om Appen" />
        </RouterLink>
        <Button @click="logout" class="menu__button" type="button" label="Logga ut" />
    </nav>
</template>