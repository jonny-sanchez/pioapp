import { AJAX, URLPIOAPP } from "helpers/http/ajax"
import alertsState from "helpers/states/alertsState"
import { FirmaExitosaResponse, VerificacionFirmaResponse } from "types/BoletaType"
import { generateJsonError, ResponseService } from "types/RequestType"

export const verificarFirmaBoleta = async (periodoId: number, tipo:number): Promise<ResponseService<VerificacionFirmaResponse>> => {
    try {
        const result: ResponseService<VerificacionFirmaResponse> = await AJAX(`${URLPIOAPP}/nomina/firma-boleta/existe?id_periodo=${periodoId}&tipo=${tipo}`, 'GET')
        return result
    } catch (error: any) {
        alertsState.getState().openVisibleSnackBar(`Error al verificar firma: ${error}`, 'error')
        // openVisibleSnackBar(`Error al verificar firma: ${error}`, 'error')
        return generateJsonError(`${error}`, 'object')
    }
}

export const firmarBoleta = async (periodoId: number, tipo:number, gpsLongitude?: number, gpsLatitude?: number, ipDispositivo?: string): Promise<ResponseService<FirmaExitosaResponse>> => {
    try {
        const requestBody = {
            id_periodo: periodoId,
            tipo: tipo,
            phone_gps_longitude: gpsLongitude || null,
            phone_gps_latitude: gpsLatitude || null,
            ip_dispositivo: ipDispositivo || null
        };
        // console.log(requestBody)
        const result: ResponseService<FirmaExitosaResponse> = await AJAX(`${URLPIOAPP}/nomina/firma-boleta/firmar`, 'POST', requestBody)
        return result
    } catch (error: any) {
        // openVisibleSnackBar(`Error al firmar la boleta: ${error}`, 'error')
        alertsState.getState().openVisibleSnackBar(`Error al firmar la boleta: ${error}`, 'error')
        return generateJsonError(`${error}`, 'object')
    }
}