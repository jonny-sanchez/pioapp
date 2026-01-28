import { paginatePeriodos, ResponsePaginatePeriodoType } from "Apis/PeriodoNomina/PeriodoNominaApi";
import ButtonForm from "components/form/ButtonForm";
import DropdownForm from "components/form/DropdownForm";
import alertsState from "helpers/states/alertsState";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Option from "types/Dropdown/Option";
import PeriodoType from "types/PeriodoType";
import { AppTheme } from "types/ThemeTypes";

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

    const theme = useTheme() as AppTheme

    const { openVisibleSnackBar } = alertsState()
    const [periodo, setPeriodo] = useState<PeriodoType[]>([])
    const [responsePaginatePeriodo, setResponsePaginatePeriodo] = useState<ResponsePaginatePeriodoType|null>(null)
    const [loadingFooter, setLoadingFooter] = useState<boolean>(false)
    const [errorPeriodo, setErrorPeriodo] = useState<boolean>(false) 
    const [search, setSearch] = useState<string>("")
    const [loadingInit, setLoadingInit] = useState<boolean>(false)
    //guardar data original
    const [dataLoad, setDataLoad] = useState<{
        periodo:PeriodoType[],
        responseLastPaginate:ResponsePaginatePeriodoType
    }|null>(null)
    //debounce
    const searchTimeout = useRef<NodeJS.Timeout | null>(null)

    const onEndReached = async(injectDataLoad:boolean = false) => {
        if (loadingFooter) return;
        if (!selectedTipoPeriodo) return;
        if(errorPeriodo) return
        if(responsePaginatePeriodo?.status && !responsePaginatePeriodo?.data?.hasMore) return
        try {
            setLoadingFooter(true)
            const response = await paginatePeriodos({ 
                limit: 8, 
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
                const merge = [...prev, ...nuevos]
                //injectar en data cache
                if(injectDataLoad) setDataLoad({
                    periodo: merge,
                    responseLastPaginate: response
                })
                return merge
            }) 
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
        } finally {
            setLoadingFooter(false)
        }
    }

    const searchDropdown = (search:string) => {
        if (searchTimeout.current) clearTimeout(searchTimeout.current)
        // console.log(search)
        // if(!search) return
        // console.log(search)
        // console.log('hola mundo')
        searchTimeout.current = setTimeout(() => {
            clearDropdown()
            setSearch(search)
        }, 300)
    }

    const clearDropdown = (onFocus:boolean = false) => {
        setResponsePaginatePeriodo(null)
        onFocus && setPeriodo([])
        setLoadingFooter(false)
        setErrorPeriodo(false)
    }

    const injectDataLoad = () => {
        setResponsePaginatePeriodo(dataLoad?.responseLastPaginate ?? null)
        setPeriodo(dataLoad?.periodo ?? [])
    } 

    const onFocus = async () => {
        setLoadingInit(true)
        // clearDropdown(true)
        if(!dataLoad) await onEndReached(true)
        else injectDataLoad()
        setLoadingInit(false)
    }

    const useEffectSearch = async() => {
        setLoadingInit(true)
        if(search) await onEndReached()
        else injectDataLoad()
        setLoadingInit(false)
    }

    const onChangeSelectPeriodo = (option:any) => {
        if(!option) return
        const { value, label } = option
        const [idPeriodo, tipo] = (value as string).split('-')
        const optionSelected:Option = { label, value }
        const optionFind = dataLoad?.periodo?.find(({ idPeriodo, tipo }) => `${idPeriodo}-${tipo}`==optionSelected.value) ?? null
        if(!optionFind && dataLoad) 
            setDataLoad(prev => {
                return {
                    periodo: [ { idPeriodo: Number(idPeriodo), nombrePeriodo: label, tipo: Number(tipo) }, ...prev?.periodo ?? [] ],
                    responseLastPaginate: prev?.responseLastPaginate ?? {}
                }
            })
    }

    useEffect(() => { useEffectSearch() }, [search])

    useEffect(() => { 
        clearDropdown(true) 
        setDataLoad(null)
    }, [selectedTipoPeriodo])

    return ( 
        <>
            <DropdownForm
                loading={loadingInit}
                onFocus={onFocus}
                // loadingFooter={loadingFooter}
                disable={!(selectedTipoPeriodo)}
                control={control}
                name="periodo"
                label="Periodo"
                onChangeExtra={onChangeSelectPeriodo}
                // onEndReached={onEndReached}
                renderFooterFlatList={(
                    <View className="w-full">
                        {
                            !(responsePaginatePeriodo?.status && !responsePaginatePeriodo?.data?.hasMore) && (
                                <ButtonForm 
                                    icon="reload" 
                                    label="Mostrar más" 
                                    loading={loadingFooter} 
                                    disabled={loadingFooter}
                                    buttonColor={theme.colors.background}
                                    onPress={() => onEndReached(true) }
                                    textColor={theme.colors.outline}
                                    style={{ borderRadius: 0 }}
                                />
                            )
                        }
                    </View>
                )}
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