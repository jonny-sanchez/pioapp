type RutasListType = {
    id:string;
    id_pedido:number;
    empresa: string;
    tienda:string;
    fecha_entrega: Date | string;
    piloto: string;             
    no_ruta: number;
    nombre_ruta: string;
    cede: string;
    id_tipo_entrega: number;
    name_tipo_entrega: string;
    tienda_nombre: string;
    tienda_direccion: string;
    codigo_empleado_piloto: number;
}

export default RutasListType