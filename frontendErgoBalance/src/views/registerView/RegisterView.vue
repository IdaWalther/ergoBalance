<script setup lang="ts">
import './registerView.scss'
import Button from 'primevue/button'
import { Form } from '@primevue/forms'
import { FormSubmitEvent } from 'vee-validate'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext';
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import Message from 'primevue/message'

interface RegisterFormValues {
  username: string
  email: string
  password: string
  passwordAgain: string
}

// Valideringsschema
const validationSchema = yup.object({
  username: yup.string().required('Användarnamn är obligatoriskt'),
  email: yup.string().email('Ogiltig email').required('Email är obligatorisk'),
  password: yup.string().min(6, 'Lösenordet måste vara minst 6 tecken').required('Lösenord är obligatoriskt'),
  passwordAgain: yup
    .string()
    .oneOf([yup.ref('password')], 'Lösenorden måste matcha')
    .required('Bekräfta lösenordet'),
})

const { handleSubmit } = useForm<RegisterFormValues>({
  validationSchema
})

const { value: username, errorMessage: usernameError, meta: usernameMeta } = useField<string | null>('username')
const { value: email, errorMessage: emailError, meta: emailMeta } = useField<string | null>('email')
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField<string | null>('password')
const { value: passwordAgain, errorMessage: passwordAgainError, meta: passwordAgainMeta } = useField<string | null>('passwordAgain')

const router = useRouter()

const onFormSubmit = handleSubmit(async (values: RegisterFormValues, e?: FormSubmitEvent) => {
  console.log('Form Submitted:', values)
  router.push('/main')
})

</script>

<template>
  <section class="registerView__wrapper">
    <section>
      <Form class="registerView__container" @submit="onFormSubmit">
        <div>
          <h4>Användarnamn</h4>
          <InputText class="registerView__input" v-model="username" type="text" placeholder="Skriv Användarnamn här..."
            fluid />
          <Message v-if="usernameError" severity="error" size="small" variant="simple">
            {{ usernameError }}
          </Message>
        </div>
        <div>
          <h4>Email</h4>
          <InputText class="registerView__input" v-model="email" type="text" placeholder="Skriv Email här..." fluid />
          <Message v-if="emailError" severity="error" size="small" variant="simple">
            {{ emailError }}
          </Message>
        </div>
        <div>
          <h4>Lösenord</h4>
          <InputText class="registerView__input" v-model="password" type="password" placeholder="Skriv Lösenord här..."
            fluid />
          <Message v-if="passwordError" severity="error" size="small" variant="simple">
            {{ passwordError }}
          </Message>
        </div>
        <div>
          <h4>Lösenord igen</h4>
          <InputText class="registerView__input" v-model="passwordAgain" type="password"
            placeholder="Skriv samma lösenord igen..." fluid />
          <Message v-if="passwordAgainError" severity="error" size="small" variant="simple">
            {{ passwordAgainError }}
          </Message>
        </div>
        <Button class="registerView__button" type="submit" label="Registrera mig" />
      </Form>
    </section>
  </section>
</template>
