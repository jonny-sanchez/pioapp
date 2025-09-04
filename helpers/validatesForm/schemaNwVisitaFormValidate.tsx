import * as Yup from 'yup'

const schemaNwVisitaFormValidate = Yup.object({
    tienda: Yup.string().required("La tienda es un campo requerido")
}).required()

export default schemaNwVisitaFormValidate