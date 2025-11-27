export type TipoPersonasConvivio = {
    id_tipo_persona_convivio: number;
    name_tipo_persona_convivio: string;
    userCreatedAt: string | null;
    userUpdatedAt: string | null;
    createdAt: string;
    updatedAt: string;
};

export type ResponseGetPersonaQrType = {
    id_personas_convivio: number;
    codigo: number;
    id_tipo_persona_convivio: number;
    nombre_persona_convivio: string;
    empresa: string | null;
    userCreatedAt: string | null;
    userUpdatedAt: string | null;
    createdAt: string;
    updatedAt: string;
    TipoPersonasConvivioModel: TipoPersonasConvivio;
}