import * as yup from 'yup'
import { proposalStatuses } from '../proposal'

const defaultValues = {
  title: '',
  status: '',
  description: '',
  chooseMeMessage: '',
  additionalNotes: '',
  environment: '',
  languages: '',
  type: ''
}

const basicSchemaObj = {
  title: yup.string().required('Proposal must have a title'),
  description: yup.string().required('Proposal must have a description'),
  chooseMeMessage: yup.string(),
  additionalNotes: yup.string(),
  environment: yup.string(),
  languages: yup.string()
}

const formSchema = yup.object().shape({ ...basicSchemaObj })

const editFormSchema = yup.object().shape({
  description: yup.string().required('Proposal must have a description'),
  chooseMeMessage: yup.string(),
  additionalNotes: yup.string(),
  environment: yup.string(),
  languages: yup.string()
})

export { formSchema, editFormSchema, defaultValues }
