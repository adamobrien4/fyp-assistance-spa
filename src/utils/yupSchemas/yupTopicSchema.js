import * as yup from 'yup'

const defaultValues = {
  title: '',
  description: '',
  additionalNotes: '',
  tags: [],
  targetCourses: []
}

const basicSchemaObj = {
  title: yup.string().required('Topic must have a title'),
  description: yup.string().required('Toic must have a description'),
  tags: yup
    .array(yup.string())
    .min(1, 'You must specify at least one tag for your Topic'),
  additionalNotes: yup.string(),
  targetCourses: yup.array(yup.string())
}

const formSchema = yup.object().shape({ ...basicSchemaObj })

const editFormSchema = yup.object().shape({
  ...basicSchemaObj,
  status: yup
    .string()
    .oneOf([
      'draft',
      'suggestion',
      'active',
      'archived',
      'assigned',
      'prev_term'
    ])
})

export { formSchema, editFormSchema, defaultValues }
