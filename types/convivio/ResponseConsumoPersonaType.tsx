type ResponseConsumoPersonaType = {
    id_personas_convivio: number;
    codigo: number;
    id_tipo_persona_convivio: number;
    nombre_persona_convivio: string;
    empresa: string;
    id_productos_convivio: number;
    name_producto_convivio: string;
    descripcion_producto_convivio: string | null;
    id_category_productos_convivio: number;
    name_category_productos_convivio: string;
    fecha_creacion_producto: string;
    total_consumido: string;
}

export default ResponseConsumoPersonaType