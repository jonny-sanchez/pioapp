import * as Yup from 'yup'

const schemaModalizeEditMercanciaForm = Yup.object({
    cantidad_update: Yup.string().trim().required('El campo cantidad es obligatorio.')
}).required()

export type schemaModalizeEditMercanciaFormType = Yup.InferType<typeof schemaModalizeEditMercanciaForm>

export default schemaModalizeEditMercanciaForm