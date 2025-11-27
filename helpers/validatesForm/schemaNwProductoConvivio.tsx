import * as Yup from 'yup'

const schemaNwProductoConvivio =  Yup.object({
    name_producto_convivio: Yup.string().required('El campo producto es obligatorio.'),
    id_category_productos_convivio: Yup.string().required('El campo categoria es obligatorio.'),
    descripcion_producto_convivio: Yup.string()
}).required()

export type schemaNwProductoConvivioType = Yup.InferType<typeof schemaNwProductoConvivio>

export default schemaNwProductoConvivio