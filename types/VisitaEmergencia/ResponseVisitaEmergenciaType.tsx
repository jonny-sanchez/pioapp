export type ArchivosCasoType = {
    id_archivo: string;        
    id_caso: string;             
    s3_bucket: string;
    s3_key: string;
    nombre_original: string | null;
    mime_type: string | null;
    bytes: number | string;      
    userCreatedAt: number | string;
    createdAt: string;           
    updatedAt: string;           
}

type ResponseVisitaEmergenciaType = {
    id_visita: number;
    empresa: string;
    tienda: string;
    tienda_nombre: string;
    tienda_direccion: string | null;
    id_tipo_visita: number;
    last_gps_longitude: string | null;
    last_gps_latitude: string | null;
    new_gps_longitude: number;
    new_gps_latitude: number;
    comentario: string | null;
    id_estado: number;
    fecha_programacion: string | null; 
    user_asignado: string;
    nombre_user_asignado: string;
    userCreatedAt: number | null;
    userUpdatedAt: number | null;
    createdAt: string; 
    updatedAt: string;
    ingreso_visita_valid: boolean;
    archivos_caso?: ArchivosCasoType[];
}

export default ResponseVisitaEmergenciaType