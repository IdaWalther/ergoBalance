<script setup lang="ts">
import './registerView.scss'
import { ref } from 'vue'
import Button from 'primevue/button'
import { Form } from '@primevue/forms'
import { RouterLink } from 'vue-router'
import InputText from 'primevue/inputtext';
// import InputField from '../../components/inputField/InputField.vue'

const formData = ref({
  username: '',
  password: '',
});

const handleSubmit = () => {
  console.log('Form Submitted:', formData.value);
};
</script>

<template>
  <section class="registerView__wrapper">
    <section class="registerView__container">
      <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit">
        <div>
          <h4>gffff</h4>
          <InputText name="username" type="text" placeholder="Username" fluid />
          <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
            $form.username.error?.message }}</Message>
        </div>
        <div>
          <h4>fdff</h4>
          <InputText name="username" type="text" placeholder="Username" fluid />
          <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
            $form.username.error?.message }}</Message>
        </div>
        <Button class="registerView__button" type="submit" label="Registrera mig" />
      </Form>
    </section>
  </section>
</template>
