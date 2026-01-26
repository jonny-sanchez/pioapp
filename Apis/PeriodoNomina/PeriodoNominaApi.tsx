import { AJAX, ParamsDataGenerate, URLPIOAPP } from "helpers/http/ajax";
import alertsState from "helpers/states/alertsState";
import { TipoPeriodoEnum } from "types/BoletaType";
import PeriodoType from "types/PeriodoType";
import { generateJsonError, ResponseService } from "types/RequestType";

type ParamsPaginatePeriodosType = {
    tipo_periodo: TipoPeriodoEnum;
    limit: number;
    cursor?: number|null;
    search?: string|null;
}

export type ResponsePaginatePeriodoType = ResponseService<{
    list: PeriodoType[],
    nextCursor: number,
    hasMore: boolean
}>

export const paginatePeriodos = async (params:ParamsPaginatePeriodosType) : Promise<ResponsePaginatePeriodoType> => {
    try {
        const query = ParamsDataGenerate(params)
        const result = await AJAX(`${URLPIOAPP}/nomina/periodos?${query}`)
        return result
    } catch (error) {
        alertsState.getState().openVisibleSnackBar(`${error}`, 'error')
        return generateJsonError(`${error}`, 'array')
    }
}