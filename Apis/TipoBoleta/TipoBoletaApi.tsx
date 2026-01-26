import { AJAX, URLPIOAPP } from "helpers/http/ajax";
import { generateJsonError, ResponseService } from "types/RequestType";
import alertsState from "helpers/states/alertsState";
import { TipoBoletaType } from "types/Apis/TipoBoleta/TipoBoletaType";

export const getAllTipoBoleta = async () : Promise<ResponseService<TipoBoletaType[]>> => {
    try {
        const result = await AJAX(`${URLPIOAPP}/tipo/boleta`)
        return result
    } catch (error) {
        alertsState.getState().openVisibleSnackBar(`${error}`, 'error')
        return generateJsonError(`${error}`, 'array')
    }
}