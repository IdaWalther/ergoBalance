<script setup lang="ts">
import './loginView.scss'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { ref } from 'vue'

const identifier = ref('')
const password = ref('')
const identifierError = ref('')
const passwordError = ref('')

const router = useRouter()

const onFormSubmit = () => {
  identifierError.value = identifier.value ? '' : 'Användarnamn eller Email är obligatoriskt'
  passwordError.value = password.value ? '' : 'Lösenord är obligatoriskt'

  if (!identifierError.value && !passwordError.value) {
    console.log('Login Submitted:', { identifier: identifier.value, password: password.value })
    router.push('/main')
  }
}

</script>

<template>
  <section class="loginView__wrapper">
    <section>
      <Form class="loginView__container" @submit="onFormSubmit">
        <div>
          <h4>Användarnamn eller Email</h4>
          <InputText class="loginView__input" v-model="identifier" type="text" placeholder="Skriv Användarnamn eller email här..." />
          <Message v-if="identifierError" severity="error" size="small" variant="simple">
            {{ identifierError }}
          </Message>
        </div>
        <div>
          <h4>Lösenord</h4>
          <InputText class="loginView__input" v-model="password" type="password" placeholder="Skriv Lösenord här..." />
          <Message v-if="passwordError" severity="error" size="small" variant="simple">
            {{ passwordError }}
          </Message>
        </div>
        <Button class="loginView__button" type="submit" label="Logga in" />
      </Form>
    </section>
  </section>
</template>
