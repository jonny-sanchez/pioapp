import ArticuloRutaType from "types/Rutas/ArticuloRutaType";
import RutasListType from "types/Rutas/RutasListType";

// export type CabeceraType = {
//     comments?: string,
//     docDate?: string,
//     docNum?: number,
//     ruta?: number,
//     piloto?: string,
//     serie?: string,
//     u_NombreCC?: string,
//     cardCode?: string,
//     almacenCamion?: string,
//     almacenDestino?: string,
//     almacenDestinoExtra?: string,
//     empresaSap?: string,
//     empresaPOS?: string,
//     empresaEnvio?: string,
//     tienda?: string,
//     docEntry?: number,
//     empresa?: string
// }

// export type ArticuloDetalleType = {
//     itemCode?: string,
//     itemCode1?: string,
//     dscription?: string,
//     quantity?: number,
//     unitMsr?: string,
//     uomCode?: string,
//     quantityEntrada?: number,
//     cantidadInventario?: number
// }

interface DataArticulosRutaType {
    tienda_nombre?: string;
    cabecera?: RutasListType;
    detalle?: ArticuloRutaType[];
}

export default DataArticulosRutaType