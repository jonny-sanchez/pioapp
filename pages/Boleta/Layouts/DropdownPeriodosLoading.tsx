import { paginatePeriodos, ResponsePaginatePeriodoType } from "Apis/PeriodoNomina/PeriodoNominaApi";
import DropdownForm from "components/form/DropdownForm";
import alertsState from "helpers/states/alertsState";
import { useEffect, useState } from "react";
import PeriodoType from "types/PeriodoType";

type DropdownPeriodosLoadingProps = {
    selectedTipoPeriodo:string;
    control:any;
    errors: any;
}

export default function DropdownPeriodosLoading({
    selectedTipoPeriodo,
    control,
    errors
} : DropdownPeriodosLoadingProps) {

    const { openVisibleSnackBar } = alertsState()
    const [periodo, setPeriodo] = useState<PeriodoType[]>([])
    const [responsePaginatePeriodo, setResponsePaginatePeriodo] = useState<ResponsePaginatePeriodoType|null>(null)
    const [loadingFooter, setLoadingFooter] = useState<boolean>(false)
    const [errorPeriodo, setErrorPeriodo] = useState<boolean>(false) 

    const onEndReached = async() => {
        if (loadingFooter) return;
        if (!selectedTipoPeriodo) return;
        if(errorPeriodo) return
        if(responsePaginatePeriodo?.status && !responsePaginatePeriodo?.data?.hasMore) return
        try {
            setLoadingFooter(true)
            const response = await paginatePeriodos({ 
                limit: 15, 
                tipo_periodo: Number(selectedTipoPeriodo),
                cursor: responsePaginatePeriodo?.data?.nextCursor || null,
                search: null
            })
            setErrorPeriodo(!(response?.status ?? false))
            if(!response.status) return
            setResponsePaginatePeriodo(response)
            setPeriodo(prev => [...prev, ...response?.data?.list ?? [] ])   
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
        } finally {
            setLoadingFooter(false)
        }
    }

    const clearDropdown = () => {
        setResponsePaginatePeriodo(null)
        setPeriodo([])
        setLoadingFooter(false)
        setErrorPeriodo(false)
    }

    return ( 
        <>
            <DropdownForm
                onFocus={() => clearDropdown()}
                loadingFooter={loadingFooter}
                disable={!(selectedTipoPeriodo)}
                control={control}
                name="periodo"
                label="Periodo"
                onEndReached={onEndReached}
                data={periodo.map((item) => ({
                    label: item.nombrePeriodo,
                    value: `${item.idPeriodo}-${item.tipo}`
                }))}
                errors={errors}
            />
        </> 
    )
}