import { AJAX, URLPIOAPP } from "helpers/http/ajax"
import alertsState from "helpers/states/alertsState"
import BoletaType from "types/BoletaType"
import { generateJsonError, ResponseService } from "types/RequestType"

export const getBoleta = async (periodoId: number, tipo:number): Promise<ResponseService<BoletaType>> => {
    try {
        const result: ResponseService<BoletaType> = await AJAX(`${URLPIOAPP}/nomina/boleta/detalle-completo?id_periodo=${periodoId}&tipo=${tipo}`, 'GET')
        return result
    } catch (error: any) {
        alertsState.getState().openVisibleSnackBar(`Error al obtener la boleta: ${error}`, 'error')
        // openVisibleSnackBar(`Error al obtener la boleta: ${error}`, 'error')
        return generateJsonError(`${error}`, 'object')
    }
}