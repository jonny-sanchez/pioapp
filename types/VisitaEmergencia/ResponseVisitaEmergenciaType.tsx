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
}

export default ResponseVisitaEmergenciaType