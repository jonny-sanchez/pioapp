import * as Yup from 'yup'

const schemaLoginFormValidate = Yup.object({
    email: Yup.string().required('El campo usuario es obligatorio.'),
    password: Yup.string().required('El campo contraseña es obligatorio.')
}).required()

export default schemaLoginFormValidate