<script setup lang="ts">
import './registerView.scss'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext';
import { useForm, useField } from 'vee-validate'
import validationSchema from '@/validation/registerSchema'
import Message from 'primevue/message'
import type { RegisterFormValues } from '@/types/types';
import { postFetch } from '@/services/postFetch';

const { handleSubmit } = useForm<RegisterFormValues>({
  validationSchema
})

const { value: username, errorMessage: usernameError } = useField<string | null>('username')
const { value: email, errorMessage: emailError, } = useField<string | null>('email')
const { value: password, errorMessage: passwordError } = useField<string | null>('password')
const { value: passwordAgain, errorMessage: passwordAgainError } = useField<string | null>('passwordAgain')

const router = useRouter()

const onFormSubmit = handleSubmit(async (values: RegisterFormValues) => {
  try {
    const response = await postFetch('userUrl', {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.passwordAgain
    });
    if (response.body.success) {
      console.log('success registration!', response)
      router.push('/login');
    } else {
      console.error('Error:', response.body.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

</script>

<template>
  <section class="registerView__wrapper">
    <section>
      <form class="registerView__container" @submit.prevent="onFormSubmit">
        <article>
          <h4>Användarnamn</h4>
          <InputText class="registerView__input" v-model="username" type="text" placeholder="Skriv Användarnamn här..."
            fluid />
          <Message v-if="usernameError" severity="error" size="small" variant="simple">
            {{ usernameError }}
          </Message>
        </article>
        <article>
          <h4>Email</h4>
          <InputText class="registerView__input" v-model="email" type="text" placeholder="Skriv Email här..." fluid />
          <Message v-if="emailError" severity="error" size="small" variant="simple">
            {{ emailError }}
          </Message>
        </article>
        <article>
          <h4>Lösenord</h4>
          <InputText class="registerView__input" v-model="password" type="password" placeholder="Skriv Lösenord här..."
            fluid />
          <Message v-if="passwordError" severity="error" size="small" variant="simple">
            {{ passwordError }}
          </Message>
        </article>
        <article>
          <h4>Lösenord igen</h4>
          <InputText class="registerView__input" v-model="passwordAgain" type="password"
            placeholder="Skriv samma lösenord igen..." fluid />
          <Message v-if="passwordAgainError" severity="error" size="small" variant="simple">
            {{ passwordAgainError }}
          </Message>
        </article>
        <Button class="registerView__button" type="submit" label="Registrera mig" />
      </form>
    </section>
  </section>
</template>
