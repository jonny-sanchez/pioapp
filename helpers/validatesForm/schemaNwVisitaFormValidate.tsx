import * as Yup from 'yup'

const schemaNwVisitaFormValidate = Yup.object({
    tienda: Yup.string().required("La tienda es un campo requerido"),
    tipo_visita: Yup.string().required("El tipo visita es un campo requerido"),
    comentario: Yup.string(),
    uniforme: Yup.boolean(),
    buzon: Yup.boolean(),
    tienda_limpia: Yup.boolean(),
    personas: Yup.boolean(),
}).required()

export type schemaNwVisitaFormValidateType = Yup.InferType<typeof schemaNwVisitaFormValidate>;

export default schemaNwVisitaFormValidate