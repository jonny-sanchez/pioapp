import * as Yup from 'yup'

const schemaNwVisitaFormValidate = (requiredCantidadPersonas:boolean = false, requiredComentario:boolean = false) => Yup.object({
    tienda: Yup.string().required("La tienda es un campo requerido"),
    tipo_visita: Yup.number().required("El tipo visita es un campo requerido"),
    uniforme: Yup.boolean(),
    buzon: Yup.boolean(),
    tienda_limpia: Yup.boolean(),
    personas: Yup.boolean(),
    cantidad_personas: Yup.string().when([], {
        is: () => requiredCantidadPersonas,
        then: (schema) => schema.required("La cantidad personas es un campo requerido"),
        otherwise: (schema) => schema.notRequired()
    }),
    comentario: Yup.string().when([], {
        is: () => requiredComentario,
        then: (schema) => schema.required("El comentario es un campo requerido"),
        otherwise: (schema) => schema.notRequired()
    }),
}).required()

export type schemaNwVisitaFormValidateType = Yup.InferType<ReturnType<typeof schemaNwVisitaFormValidate>>;

export default schemaNwVisitaFormValidate