import { AJAX, URLPIOAPP } from "helpers/http/ajax"
import alertsState from "helpers/states/alertsState"
import { generateJsonError, ResponseService } from "types/RequestType"
import ArticuloRutaType from "types/Rutas/ArticuloRutaType"

export const getArticulos = async (id_pedido: number | null, serie:string|null):Promise<ResponseService<ArticuloRutaType[]>> => {
    try {
        const result:ResponseService<ArticuloRutaType[]> = await AJAX(`${ URLPIOAPP }/articulos/ruta/list?id_pedido=${ id_pedido }&serie=${serie}`)
        return result
    } catch (error) {
        alertsState.getState().openVisibleSnackBar(`${error}`, 'error')
        return generateJsonError(`${error}`, "array")
    }
}

export const getArticulosRecepcion = async (id_pedido: number | null, serie:string|null):Promise<ResponseService<ArticuloRutaType[]>> => {
    try {
        const result:ResponseService<ArticuloRutaType[]> = await AJAX(`${ URLPIOAPP }/articulos/ruta/list/recepcion?numero=${ id_pedido }&serie=${serie}`)
        return result
    } catch (error) {
        alertsState.getState().openVisibleSnackBar(`${error}`, 'error')
        return generateJsonError(`${error}`, "array")
    }
}