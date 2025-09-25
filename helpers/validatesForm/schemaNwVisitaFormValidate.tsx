import * as Yup from 'yup'

const schemaNwVisitaFormValidate = (requiredCantidadPersonas:boolean = false) => Yup.object({
    tienda: Yup.string().required("La tienda es un campo requerido"),
    tipo_visita: Yup.string().required("El tipo visita es un campo requerido"),
    comentario: Yup.string(),
    uniforme: Yup.boolean(),
    buzon: Yup.boolean(),
    tienda_limpia: Yup.boolean(),
    personas: Yup.boolean(),
    cantidad_personas: Yup.string().when([], {
        is: () => requiredCantidadPersonas,
        then: (schema) => schema.required("La cantidad personas es un campo requerido"),
        otherwise: (schema) => schema.notRequired()
    })
}).required()

export type schemaNwVisitaFormValidateType = Yup.InferType<ReturnType<typeof schemaNwVisitaFormValidate>>;

export default schemaNwVisitaFormValidate