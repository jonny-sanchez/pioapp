type ArticuloRutaType = {
    id: number,
    id_pedido: number,
    codigo_articulo: string,
    nombre_articulo: string,
    description: string,
    cantidad: number;
    cantidad_recibida?: number;
    serie?: string;
}

export default ArticuloRutaType