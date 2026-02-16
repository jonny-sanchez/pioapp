import { AJAX, URLPIOAPP } from "helpers/http/ajax"
import alertsState from "helpers/states/alertsState"
import { generateJsonError, ResponseService } from "types/RequestType"
import QueryParamsRutasType from "types/Rutas/QueryParamsRutasType"
import RutasListType from "types/Rutas/RutasListType"
import TiendasRuta from "types/Rutas/TiendasRuta"

export const getRutas = async(params:QueryParamsRutasType):Promise<ResponseService<RutasListType[]>> => {
    try {
        const response:ResponseService<RutasListType[]> = await AJAX(
            `${ URLPIOAPP }/rutas/view/list?fecha_entrega=${params.fecha_entrega}&empresa=${params?.empresa||''}&tienda=${params?.tienda||''}`
        )
        return response
    } catch (error) {
        alertsState.getState().openVisibleSnackBar(`${error}`, 'error')
        return generateJsonError(`${error}`, "array")
    }
}

export const getTiendasFilter = async(params:QueryParamsRutasType):Promise<ResponseService<TiendasRuta[]>> => {
    try {
        const response:ResponseService<TiendasRuta[]> = await AJAX(
            `${ URLPIOAPP }/rutas/view/tiendas/rutas?fecha_entrega=${params.fecha_entrega}`
        )
        return response
    } catch (error) {
        alertsState.getState().openVisibleSnackBar(`${error}`, 'error')
        return generateJsonError(`${error}`, 'array')
    }
}