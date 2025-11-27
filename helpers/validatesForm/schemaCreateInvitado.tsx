import * as Yup from 'yup'

const schemaCreateInvitado = Yup.object({
    nombre_persona_convivio: Yup.string().required("El campo nombre invitado es obligatorio."),
    empresa: Yup.string()
}).required()

export type schemaCreateInvitadoType = Yup.InferType<typeof schemaCreateInvitado>

export default schemaCreateInvitado