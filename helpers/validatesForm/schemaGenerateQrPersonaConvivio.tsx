import * as Yup from 'yup'

const schemaGenerateQrPersonaConvivio = Yup.object({
    persona_convivio: Yup.string().required("El campo invitado es obligatorio.")
}).required()

export type schemaGenerateQrPersonaConvivioType = Yup.InferType<typeof schemaGenerateQrPersonaConvivio>

export default schemaGenerateQrPersonaConvivio