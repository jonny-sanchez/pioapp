import * as Yup from 'yup'

const schemaPerfilUser = Yup.object({
    switch_ubicacion: Yup.boolean(),
    switch_camara: Yup.boolean(),
    switch_notificaciones: Yup.boolean()
}).required()

export type schemaPerfilUserType = Yup.InferType<typeof schemaPerfilUser>

export default schemaPerfilUser