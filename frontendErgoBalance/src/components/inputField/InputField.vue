<script lang="ts">
import './inputField.scss'
import { defineProps, defineEmits } from 'vue'
import InputText from 'primevue/inputtext';

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
});

// const emit = defineEmits(['update:modelValue']);

// const handleInput = (event: Event) => {
//     emit('update:modelValue', (event.target as HTMLInputElement).value);
// };
</script>

<template>
    <section class="input-field">
        <label>{{ label }}</label>
        <InputText type="text" v-model="modelValue" @input="handleInput" />
    </section>
</template>