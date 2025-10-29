import * as Yup from 'yup'

const schemaListRutasForm = Yup.object({
    date: Yup.string().required("El campo fecha es obligatorio."),
    ubicaciones: Yup.string()
}).required()

export type schemaListRutasFormType = Yup.InferType<typeof schemaListRutasForm>;

export default schemaListRutasForm