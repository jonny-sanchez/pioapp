import { paginatePeriodos, ResponsePaginatePeriodoType } from "Apis/PeriodoNomina/PeriodoNominaApi";
import DropdownForm from "components/form/DropdownForm";
import alertsState from "helpers/states/alertsState";
import { useEffect, useRef, useState } from "react";
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
    const [search, setSearch] = useState<string>("")

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
                search: search
            })
            setErrorPeriodo(!(response?.status ?? false))
            if(!response.status) return
            setResponsePaginatePeriodo(response)
            // setPeriodo(prev => [...prev, ...response?.data?.list ?? [] ])  
            setPeriodo(prev => {
                const ids = new Set(prev.map(p => p.idPeriodo))
                const nuevos = response?.data?.list.filter(p => !ids.has(p.idPeriodo)) ?? []
                return [...prev, ...nuevos]
            }) 
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
        } finally {
            setLoadingFooter(false)
        }
    }

    const searchDropdown = (search:string) => {
        // console.log(search)
        // if(!search) return
        // console.log(search)
        clearDropdown()
        setSearch(search)
    }

    const clearDropdown = (onFocus:boolean = false) => {
        setResponsePaginatePeriodo(null)
        onFocus && setPeriodo([])
        setLoadingFooter(false)
        setErrorPeriodo(false)
    }

    const onFocus = () => {
        clearDropdown(true)
    }

    useEffect(() => {
        onEndReached()
    }, [search])

    return ( 
        <>
            <DropdownForm
                onFocus={onFocus}
                loadingFooter={loadingFooter}
                disable={!(selectedTipoPeriodo)}
                control={control}
                name="periodo"
                label="Periodo"
                onEndReached={onEndReached}
                onChangeText={searchDropdown}
                data={periodo.map((item) => ({
                    label: item.nombrePeriodo,
                    value: `${item.idPeriodo}-${item.tipo}`
                }))}
                errors={errors}
            />
        </> 
    )
}