import * as Yup from 'yup'

const schemaNwVisitaFormValidate = Yup.object({
    tipo_entrega: Yup.string().required("El tipo entrega es un campo requerido")
}).required()

export default schemaNwVisitaFormValidate