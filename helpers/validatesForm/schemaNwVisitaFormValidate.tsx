import * as Yup from 'yup'

const schemaNwVisitaFormValidate = Yup.object({
    tienda: Yup.string().required("La tienda es un campo requerido"),
    tipo_visita: Yup.string().required("El tipo visita es un campo requerido"),
    comentario: Yup.string()
}).required()

export type schemaNwVisitaFormValidateType = Yup.InferType<typeof schemaNwVisitaFormValidate>;

export default schemaNwVisitaFormValidate