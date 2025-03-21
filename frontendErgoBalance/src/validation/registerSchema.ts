import * as yup from 'yup'

const validationSchema = yup.object({
    username: yup.string().required('Användarnamn är obligatoriskt'),
    email: yup.string().email('Ogiltig email').required('Email är obligatorisk'),
    password: yup.string().min(6, 'Lösenordet måste vara minst 6 tecken').required('Lösenord är obligatoriskt'),
    passwordAgain: yup
        .string()
        .oneOf([yup.ref('password')], 'Lösenorden måste matcha')
        .required('Bekräfta lösenordet'),
})

export default validationSchema;