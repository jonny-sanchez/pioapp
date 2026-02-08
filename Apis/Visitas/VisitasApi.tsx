import { AJAX, FormDataGenerate, URLPIOAPP } from "helpers/http/ajax"
import alertsState from "helpers/states/alertsState"
import { generateJsonError, ResponseService } from "types/RequestType"

type OptionsCreateVisitaType = {
    alertSuccess?:boolean;
    alertError?:boolean;
}

const defaultOptionsCreateVisita: Required<OptionsCreateVisitaType> = {
    alertSuccess: true,
    alertError: true
}

export const postCreateVisita = async(data:object, options:OptionsCreateVisitaType = {}):Promise<ResponseService<any>> => {
    const finalOptions = { ...defaultOptionsCreateVisita, ...options }
    try {
        const formData = FormDataGenerate(data)
        const result:ResponseService<any> = await AJAX(`${URLPIOAPP}/visitas/create`, "POST", formData, true)
        finalOptions.alertSuccess && alertsState.getState().openVisibleSnackBar(`${result.message}`, 'success')
        return result
    } catch (error) {
        finalOptions.alertError && alertsState.getState().openVisibleSnackBar(`${error}`, 'error')
        return generateJsonError(error, 'object')
    }
}