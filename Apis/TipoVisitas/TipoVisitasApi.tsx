import { AJAX, URLPIOAPP } from "helpers/http/ajax"
import alertsState from "helpers/states/alertsState"
import { generateJsonError, ResponseService } from "types/RequestType"

export const getTiposVisitas = async():Promise<ResponseService<any[]>> => {
    try {
        const result:ResponseService<any[]> = await AJAX(`${URLPIOAPP}/tipo/visitas/all`)
        return result
    } catch (error) {
        alertsState.getState().openVisibleSnackBar(`${error}`, 'error')
        return generateJsonError(`${error}`, 'array')
    }
}