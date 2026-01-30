import ScrollViewContainer from "components/container/ScrollViewContainer"
import { ScrollView, View } from "react-native"
import DataTableInfo from "components/tables/DataTableInfo"
import configTableRutas from "helpers/tables/configTableRutas"
import { useEffect, useRef, useState } from "react"
import PageLayout from "components/Layouts/PageLayout"
import DatePickerForm from "components/form/DatePickerForm"
import FormAdaptiveKeyBoard from "components/container/FormAdaptiveKeyBoard"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import schemaListRutasForm from "helpers/validatesForm/schemaListRutasForm"
import DropdownForm from "components/form/DropdownForm"
import { formatDate, formatDateEsShort } from "helpers/fechas/fechasHelper"
import { generateJsonError, ResponseService } from "types/RequestType"
import RutasListType from "types/Rutas/RutasListType"
import QueryParamsRutasType from "types/Rutas/QueryParamsRutasType"
import { AJAX, URLPIOAPP } from "helpers/http/ajax"
import alertsState from "helpers/states/alertsState"
import globalState from "helpers/states/globalState"
import TiendasRuta from "types/Rutas/TiendasRuta"
import Option from "types/Dropdown/Option"
import FabFloating from "components/container/FabFloating"
import { handleScroll } from "helpers/Scroll/ScrollHelper"
import { Modalize } from "react-native-modalize"
import ModalizeDetalleArticulosLayout from "pages/Layouts/Rutas/ModalizeDetalleArticulosLayout"
import detalleArticulosState from "helpers/states/detalleArticulosState"
import { AppTheme } from "types/ThemeTypes"
import { useTheme } from "react-native-paper"
import ChipDecoration from "components/decoration/ChipDecoration"
import ToggleContainerAnimated from "components/Animaciones/ToggleContainerAnimated"

export default function Rutas() {

    const theme:AppTheme = useTheme() as AppTheme

    const { openVisibleSnackBar } = alertsState()
    const { setOpenScreenLoading, setCloseScreenLoading } = globalState()
    const [queryParamsRutas, setQueryParamsRutas] = useState<QueryParamsRutasType>({
        fecha_entrega: '',
        empresa: '',
        tienda: ''
    })
    const [rutas, setRutas] = useState<RutasListType[]>([])
    const [optionsTiendasRuta, setOptionsTiendaRuta] = useState<Option[]>([])
    const [loadingTiendasRuta, setLoadingTiendasRuta] = useState<boolean>(false)
    const [visibleFab, setVisibleFab] = useState<boolean>(true); 
    const [reloadRutas, setReloadRutas] = useState<boolean>(false)
    const offsetY = useRef(0);
    const modalizeRefDetalleArticulos = useRef<Modalize>(null)
    const scrollChipRef = useRef<ScrollView>(null)
        
    const onOpenModalizeDetalleArticulos = () => modalizeRefDetalleArticulos.current?.open()
    
    // const onCloseModalizeDetalleArticulos = () => modalizeRefDetalleArticulos.current?.close()

    const { setRutaDetalle } = detalleArticulosState()

    const { control, handleSubmit, reset, resetField, formState: { errors }, watch } = useForm({
            resolver: yupResolver(schemaListRutasForm),
            mode: 'all'
    })

    const valueDateFilterRuta = watch('date')
    const valueUbicacionesRuta = watch('ubicaciones')

    const getRutas = async():Promise<ResponseService<RutasListType[]>> => {
        try {
            const response:ResponseService<RutasListType[]> = await AJAX(
                `${ URLPIOAPP }/rutas/view/list?fecha_entrega=${queryParamsRutas.fecha_entrega}&empresa=${queryParamsRutas?.empresa||''}&tienda=${queryParamsRutas?.tienda||''}`
            )
            return response
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
            return generateJsonError(`${error}`, "array")
        }
    }

    const getTiendasFilter = async():Promise<ResponseService<TiendasRuta[]>> => {
        try {
            const response:ResponseService<TiendasRuta[]> = await AJAX(
                `${ URLPIOAPP }/rutas/view/tiendas/rutas?fecha_entrega=${queryParamsRutas.fecha_entrega}`
            )
            return response
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
            return generateJsonError(`${error}`, 'array')
        }
    }

    const stateHandleSetRutas = async() => {
        const result = await getRutas()
        setRutas(result.data as RutasListType[])
    }

    const renderRutas = async() => {
        if(!queryParamsRutas.fecha_entrega) return
        setOpenScreenLoading()

        await stateHandleSetRutas()
        
        setCloseScreenLoading()
    }

    const reloadRutasController = async ():Promise<any> => {
        setReloadRutas(true)

        await stateHandleSetRutas()

        setReloadRutas(false)
    }

    const onFocusDropdownTiendas = async() => {
        if(!queryParamsRutas.fecha_entrega) return
        setLoadingTiendasRuta(true)
        const result = await getTiendasFilter()
        const dataMapOptions:Option[] = result.data?.flatMap(el => ({ value: `${el.empresa}-${el.tienda}`, label: `${el.tienda_nombre}` })) as Option[]
        setOptionsTiendaRuta(dataMapOptions)
        setLoadingTiendasRuta(false)
    }

    // const handlePressFabFilter = () => {
    //     reset()
    //     setRutas([])
    //     setOptionsTiendaRuta([])
    //     setQueryParamsRutas({ fecha_entrega: '', empresa: '', tienda: '' })
    // }

    const cleanDataRuta = () => {
        reset()
        setRutas([])
        setOptionsTiendaRuta([])
        setQueryParamsRutas({ fecha_entrega: '', empresa: '', tienda: '' })
    }

    const getNameTiendaByCode = (codTienda:string) : string => {
        const result = optionsTiendasRuta?.find(({ value })=> value === codTienda) ?? null
        return result?.label ?? ' -- '
    }

    useEffect(() => {
        const fecha_entrega = valueDateFilterRuta ? formatDate(new Date(valueDateFilterRuta)) : null
        const arrayValueTienda:string[] = valueUbicacionesRuta?.split('-') || []
        const empresa:string = arrayValueTienda[0] || ''
        const tienda:string = arrayValueTienda[1] || ''
        setQueryParamsRutas({fecha_entrega, empresa, tienda})
        //resetear scroll horizontal de los chip
        scrollChipRef.current?.scrollTo({ x: 0, animated: true })
    }, [valueDateFilterRuta, valueUbicacionesRuta])

    useEffect(() => {
        renderRutas()
    }, [queryParamsRutas])

    return (
        <>

            <ModalizeDetalleArticulosLayout
                modalizeRef={modalizeRefDetalleArticulos}
            />

            {/* <FabFloating 
                onPress={handlePressFabFilter} 
                disabled={
                    (valueDateFilterRuta || valueUbicacionesRuta) ? false : true
                } 
                icon="filter-remove" 
                // label="Limpiar Filtros" 
                visible={visibleFab}
            /> */}

            <PageLayout titleAppBar="Rutas">

                <ScrollViewContainer onScroll={(e) => handleScroll(e, offsetY, visibleFab, setVisibleFab)}>
                    <FormAdaptiveKeyBoard>
                        <View className="w-full flex-col gap-3.5 my-5">

                            {/* Chip de filtros */}
                            <ScrollView
                                ref={scrollChipRef}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                // contentContainerStyle={{ paddingRight: 12 }}
                            >
                                {
                                    (valueDateFilterRuta || valueUbicacionesRuta) && (
                                        <View className="w-full flex flex-row gap-3 py-2.5">
                                            <ToggleContainerAnimated visible={valueDateFilterRuta ? true : false}>
                                                <ChipDecoration 
                                                    onPress={() => {}}  
                                                    title={`${valueDateFilterRuta ? formatDateEsShort(valueDateFilterRuta) : ' -- '}`} 
                                                    icon="calendar"
                                                    closeIcon="close"
                                                    onClose={() => cleanDataRuta() }
                                                />
                                            </ToggleContainerAnimated>
                                            <ToggleContainerAnimated visible={valueUbicacionesRuta ? true : false}>
                                                <ChipDecoration 
                                                    onPress={() => {}} 
                                                    title={`${getNameTiendaByCode(valueUbicacionesRuta ?? '')}`} 
                                                    icon="store"
                                                    closeIcon="close"
                                                    onClose={() => resetField('ubicaciones', { defaultValue: '' })}
                                                />
                                            </ToggleContainerAnimated>
                                        </View>
                                    )
                                }
                            </ScrollView>

                            <DatePickerForm 
                                control={control} 
                                name="date"
                                errors={errors}
                            />
                            <DropdownForm 
                                control={control} 
                                name="ubicaciones"
                                label="Ubicaciones"
                                onFocus={onFocusDropdownTiendas}
                                data={optionsTiendasRuta}
                                loading={loadingTiendasRuta}
                                disable={!(valueDateFilterRuta)}
                            />
                            <DataTableInfo
                                search={false}
                                filter={false}
                                pagination={true}
                                configTable={configTableRutas(
                                    theme,
                                    reloadRutasController,
                                    reloadRutas
                                )}
                                data={rutas}
                                groupField="tienda_nombre"
                                onPressRow={(data:RutasListType) => {
                                    // setRutaDetalle({...data})
                                    setRutaDetalle(data)
                                    onOpenModalizeDetalleArticulos()
                                }}
                            />
                        </View>
                    </FormAdaptiveKeyBoard>
                </ScrollViewContainer>
            </PageLayout>
        </>
    )
}