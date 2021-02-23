import * as yup from 'yup'

const defaultValues = {
  coordinator: ''
}

const formSchema = yup.object().shape({
  coordinator: yup
    .string()
    .email('Must be a valid email')
    .required('Email address must not be blank')
})

export { formSchema, defaultValues }
