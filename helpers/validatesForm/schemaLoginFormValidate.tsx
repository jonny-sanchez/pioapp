import * as Yup from 'yup'

const schemaLoginFormValidate = Yup.object({
    codigo: Yup.string().required('El campo usuario es obligatorio.'),
    password: Yup.string().required('El campo contraseña es obligatorio.'),
    recordar_btn: Yup.boolean()
}).required()

export type schemaLoginFormValidateType = Yup.InferType<typeof schemaLoginFormValidate>;

export default schemaLoginFormValidate