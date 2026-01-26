import * as Yup from 'yup'

const schemaBoletaFilter = Yup.object({
    periodo: Yup.string().required("El campo periodo es obligatorio."),
    id_tipo_boleta: Yup.string().required("El campo tipo boleta es obligatorio.")
}).required()

export type schemaBoletaFilterType = Yup.InferType<typeof schemaBoletaFilter>

export default schemaBoletaFilter