type ArticuloRutaType = {
    id: number,
    id_pedido: number,
    codigo_articulo: string,
    nombre_articulo: string,
    description: string,
    cantidad: number;
    serie?: string;
}

export default ArticuloRutaType