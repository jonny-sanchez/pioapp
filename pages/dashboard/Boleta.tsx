import ScrollViewContainer from "components/container/ScrollViewContainer"
import { View } from "react-native"
import { Text, useTheme, IconButton } from "react-native-paper"
import PageLayout from "components/Layouts/PageLayout"
import PeriodoType, { SelectPeriodoType } from "types/PeriodoType"
import BoletaType, { FirmaExitosaResponse, VerificacionFirmaResponse } from "types/BoletaType"
import { useState, useEffect } from "react"
import FormAdaptiveKeyBoard from "components/container/FormAdaptiveKeyBoard"
import DropdownForm from "components/form/DropdownForm"
import { useForm } from "react-hook-form"
import ButtonForm from "components/form/ButtonForm"
import { AJAX, URLPIOAPP } from "helpers/http/ajax"
import { ResponseService, generateJsonError } from "types/RequestType"
import alertsState from "helpers/states/alertsState"
import globalState from "helpers/states/globalState"
import BoletaCard from "pages/Layouts/Boleta/BoletaCard"
import BoletaDetailModal from "pages/Layouts/Boleta/BoletaDetailModal"
import DialogComponent from "components/Modals/DialogComponent"
import { AppTheme } from "types/ThemeTypes"
import { locationPermission, getLocation } from "helpers/ubicacion/ubicacionHelper"
import { getDeviceIPAddress } from "helpers/network/networkHelper"
import { TipoBoletaType } from "types/Apis/TipoBoleta/TipoBoletaType"
import { getAllTipoBoleta } from "Apis/TipoBoleta/TipoBoletaApi"
import { yupResolver } from "@hookform/resolvers/yup"
import schemaBoletaFilter from "helpers/validatesForm/schemaBoletaFilter"
import DropdownPeriodosLoading from "pages/Boleta/Layouts/DropdownPeriodosLoading"

export default function Boleta() {

    const theme = useTheme() as AppTheme;
    const { openVisibleSnackBar } = alertsState()
    const { setOpenScreenLoading, setCloseScreenLoading } = globalState()

    const [periodo, setPeriodo] = useState<PeriodoType[]>([])
    const [boleta, setBoleta] = useState<BoletaType | null>(null)
    const [selectedBoleta, setSelectedBoleta] = useState<BoletaType | null>(null)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [isProcessingSignature, setIsProcessingSignature] = useState(false)
    const [showFirmaDialog, setShowFirmaDialog] = useState(false)
    const [pendingPeriodoId, setPendingPeriodoId] = useState<SelectPeriodoType | null>(null)
    //estados para dropdown para tipos boletas
    const [responseTipoBoleta, setResponseTipoBoleta] = useState<ResponseService<TipoBoletaType[]>>()
    const [loadingTipoBoleta, setLoadingTipoBoleta] = useState<boolean>(false)

    const { control, handleSubmit, reset, resetField, watch, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schemaBoletaFilter),
        mode: 'all'
    })

    const selectedPeriodo = watch('periodo')
    const selectedTipoPeriodo = watch('id_tipo_boleta')

    const normalizeBoleta = (boleta: BoletaType): BoletaType => {
        return {
            ...boleta,
            numeroBoleta: boleta.numeroBoleta || 0,
            empleado: {
                codigo: boleta.empleado?.codigo || '',
                nombre: boleta.empleado?.nombre || ''
            },
            periodo: boleta.periodo || {},
            diasTrabajados: boleta.diasTrabajados || 0,
            ingresos: {
                salarioOrdinario: boleta.ingresos?.salarioOrdinario || 0,
                horasSimples: boleta.ingresos?.horasSimples || 0,
                horasDobles: boleta.ingresos?.horasDobles || 0,
                bonificacion: boleta.ingresos?.bonificacion || 0,
                otrosIngresos: boleta.ingresos?.otrosIngresos || 0,
                totalIngresos: boleta.ingresos?.totalIngresos || 0
            },
            descuentos: {
                anticipo: boleta.descuentos.anticipo || 0,
                igss: boleta.descuentos?.igss || 0,
                isr: boleta.descuentos?.isr || 0,
                ahorro: boleta.descuentos?.ahorro || 0,
                seguro: boleta.descuentos?.seguro || 0,
                otrosDescuentos: boleta.descuentos?.otrosDescuentos || 0,
                totalDescuentos: boleta.descuentos?.totalDescuentos || 0
            },
            neto: boleta.neto || 0,
            liquido: boleta.liquido || 0,
            firma: {
                idFirmaBoleta: boleta.firma?.idFirmaBoleta || '',
                fechaFirma: boleta.firma?.fechaFirma || '',
                valido: boleta.firma?.valido || false
            }
        }
    }    

    const getPeriodos = async (): Promise<ResponseService<PeriodoType[]>> => {
        try {
            const result: ResponseService<PeriodoType[]> = await AJAX(`${URLPIOAPP}/nomina/periodos/ultimos-pagados`, 'GET')
            return result
        } catch (error: any) {
            openVisibleSnackBar(`${error}`, 'error')
            return generateJsonError(`${error}`, 'array')
        }
    }

    const verificarFirmaBoleta = async (periodoId: number, tipo:number): Promise<ResponseService<VerificacionFirmaResponse>> => {
        try {
            const result: ResponseService<VerificacionFirmaResponse> = await AJAX(`${URLPIOAPP}/nomina/firma-boleta/existe?id_periodo=${periodoId}&tipo=${tipo}`, 'GET')
            return result
        } catch (error: any) {
            openVisibleSnackBar(`Error al verificar firma: ${error}`, 'error')
            return generateJsonError(`${error}`, 'object')
        }
    }

    const getBoleta = async (periodoId: number, tipo:number): Promise<ResponseService<BoletaType>> => {
        try {
            const result: ResponseService<BoletaType> = await AJAX(`${URLPIOAPP}/nomina/boleta/detalle-completo?id_periodo=${periodoId}&tipo=${tipo}`, 'GET')
            return result
        } catch (error: any) {
            openVisibleSnackBar(`Error al obtener la boleta: ${error}`, 'error')
            return generateJsonError(`${error}`, 'object')
        }
    }

    // Función para capturar datos de geolocalización e IP
    const capturarDatosDispositivo = async (): Promise<{ longitude: number | null, latitude: number | null, ip: string | null }> => {
        let longitude: number | null = null;
        let latitude: number | null = null;
        let ip: string | null = null;

        try {
            const hasPermission = await locationPermission();
            if (hasPermission) {
                const location = await getLocation();
                if (location) {
                    longitude = location.coords.longitude;
                    latitude = location.coords.latitude;
                }
            }

            // Capturar IP del dispositivo
            ip = await getDeviceIPAddress();
        } catch (error) {
            openVisibleSnackBar('Error capturando datos del dispositivo', 'error');
        }

        return { longitude, latitude, ip };
    };

    const firmarBoleta = async (periodoId: number, tipo:number, gpsLongitude?: number, gpsLatitude?: number, ipDispositivo?: string): Promise<ResponseService<FirmaExitosaResponse>> => {
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
            openVisibleSnackBar(`Error al firmar la boleta: ${error}`, 'error')
            return generateJsonError(`${error}`, 'object')
        }
    }

    const loadPeriodos = async () => {
        setOpenScreenLoading()
        const resultPeriodos = await getPeriodos()
        if (resultPeriodos.status && resultPeriodos.data) {
            setPeriodo(resultPeriodos.data)
        }
        setCloseScreenLoading()
    }

    const onSubmit = async (data: any) => {
        if (!data.periodo) {
            openVisibleSnackBar('Debe seleccionar un período', 'error')
            return
        }

        try {
            setOpenScreenLoading()

            //ordernar idPeriodo y tipo
            const objectPeriodo = data.periodo.split('-') ?? []
            const idPeriodo:number = Number(objectPeriodo[0]) ?? 0
            const tipo:number = Number(objectPeriodo[1]) ?? 0

            const resultBoleta = await getBoleta(idPeriodo, tipo)

            if(!(resultBoleta.status && resultBoleta.data)) throw new Error(`No se encontró boleta para el período seleccionado`);
            
            let boletaFinal = normalizeBoleta(resultBoleta.data)
            const resultVerificacion = await verificarFirmaBoleta(idPeriodo, tipo)

            if(!(resultVerificacion.status && resultVerificacion.data)) throw new Error(`Error al verificar el estado de la boleta`);
        
            const { existe, firma } = resultVerificacion.data

            if (existe && firma) {
                boletaFinal = {
                    ...boletaFinal,
                    firma: {
                        idFirmaBoleta: firma.id_firma_boleta_pago,
                        fechaFirma: firma.fecha_firma,
                        valido: firma.valido
                    }
                }
                openVisibleSnackBar('Boleta cargada correctamente', 'success')
                setBoleta(boletaFinal)
                return
            } 

            setPendingPeriodoId({ idPeriodo: idPeriodo, tipo: tipo })
            setShowFirmaDialog(true)
    
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
        } finally {
            setCloseScreenLoading()
        }
    }

    const handleVerBoleta = (boleta: BoletaType) => {
        setSelectedBoleta(boleta)
        setShowDetailModal(true)
    }

    const handleVerDetalle = (boleta: BoletaType) => {
        setSelectedBoleta(boleta)
        setShowDetailModal(true)
    }

    const handleCloseModal = () => {
        setShowDetailModal(false)
        setSelectedBoleta(null)
    }

    const handleConfirmFirma = async () => {
        if (!pendingPeriodoId) return

        setShowFirmaDialog(false)
        setOpenScreenLoading()
        setIsProcessingSignature(true)

        try {
            const resultBoleta = await getBoleta(pendingPeriodoId.idPeriodo, pendingPeriodoId.tipo)
            

            if (resultBoleta.status && resultBoleta.data) {
                let boletaFinal = normalizeBoleta(resultBoleta.data)

                openVisibleSnackBar('Iniciando proceso de firma...', 'warning')

                const { longitude, latitude, ip } = await capturarDatosDispositivo();

                openVisibleSnackBar('Procesando firma...', 'warning')
                const resultFirma = await firmarBoleta(pendingPeriodoId.idPeriodo, pendingPeriodoId.tipo, longitude || undefined, latitude || undefined, ip || undefined)

                if (resultFirma.status && resultFirma.data) {
                    const firmaData = resultFirma.data
                    boletaFinal = {
                        ...boletaFinal,
                        firma: {
                            idFirmaBoleta: firmaData.id_firma_boleta_pago,
                            fechaFirma: firmaData.fecha_firma,
                            valido: true
                        }
                    }

                    openVisibleSnackBar('Boleta firmada exitosamente', 'success')
                    setBoleta(boletaFinal)
                } else {
                    openVisibleSnackBar('Error al firmar la boleta', 'error')
                }
            }
        } catch (error) {
            openVisibleSnackBar('Error en el proceso de firma', 'error')
        } finally {
            setIsProcessingSignature(false)
            setCloseScreenLoading()
            setPendingPeriodoId(null)
        }
    }

    const handleCancelFirma = () => {
        setShowFirmaDialog(false)
        setPendingPeriodoId(null)
        openVisibleSnackBar('Operación cancelada', 'warning')
    }

    const onFocusTipoBoleta = async () => {
        if(responseTipoBoleta?.status) return
        setLoadingTipoBoleta(true)
        const response = await getAllTipoBoleta()
        setResponseTipoBoleta(response)
        setLoadingTipoBoleta(false)
    }

    const onPressButtonGenerarBoleta = async () => {
        reset()
        setBoleta(null)
    }

    useEffect(() => {
        // loadPeriodos()
    }, [])

    return (
        <>
            <PageLayout titleAppBar="Boleta">
                <ScrollViewContainer>
                    <View className="w-full mt-6">
                        {/* Formulario de selección de período */}
                        <FormAdaptiveKeyBoard>
                            <View className="w-full flex-col gap-3.5 mb-5">
                                <Text style={{
                                    color: theme.colors.onSurface,
                                    fontSize: 14
                                }}>
                                    Consultar boleta pago
                                </Text>
                                { !boleta && (
                                    <>
                                        <DropdownForm
                                            loading={loadingTipoBoleta}
                                            control={control}
                                            name="id_tipo_boleta"
                                            label="Tipo Boleta"
                                            data={responseTipoBoleta?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id_tipo_boleta
                                            }))}
                                            onFocus={onFocusTipoBoleta}
                                            onChangeExtra={() => resetField('periodo', { defaultValue: '' })}
                                            errors={errors}
                                        />
                                        <DropdownPeriodosLoading
                                            control={control}
                                            selectedTipoPeriodo={selectedTipoPeriodo}
                                            errors={errors}
                                        />
                                        {/* <DropdownForm
                                            // loading
                                            disable={!(selectedTipoPeriodo)}
                                            control={control}
                                            name="periodo"
                                            label="Quincena"
                                            data={periodo.map((item) => ({
                                                label: item.nombrePeriodo,
                                                value: `${item.idPeriodo}-${item.tipo}`
                                            }))}
                                        /> */}
                                        <ButtonForm
                                            label="Consultar boleta"
                                            icon="file-search-outline"
                                            disabled={!isValid}
                                            onPress={handleSubmit(onSubmit)}
                                        />
                                    </>
                                ) }
                            </View>
                        </FormAdaptiveKeyBoard>

                        {/* Boleta encontrada */}
                        {boleta ? (
                            <View className="mb-10">
                                <BoletaCard
                                    boleta={boleta}
                                    onVerBoleta={handleVerBoleta}
                                    onVerDetalle={handleVerDetalle}
                                />
                                <ButtonForm 
                                    label="Generar otra boleta" 
                                    icon="reload" 
                                    buttonColor={theme.colors.onSurfaceVariant}
                                    onPress={onPressButtonGenerarBoleta}
                                />
                            </View>
                        ) : isValid && !isProcessingSignature ? (
                            <View className="px-4">
                                <Text
                                    style={{ color: theme.colors.onSurfaceVariant }}
                                >
                                    Presione "Consultar boleta" para ver la boleta del período seleccionado.
                                </Text>
                            </View>
                        ) : null}
                    </View>
                </ScrollViewContainer>

                {/* Modal de detalle */}
                <BoletaDetailModal
                    visible={showDetailModal}
                    boleta={selectedBoleta}
                    onDismiss={handleCloseModal}
                />

                {/* Dialog de confirmación de firma */}
                <DialogComponent
                    visible={showFirmaDialog}
                    title="Boleta no firmada"
                    content="¿Desea firmar su boleta? Para poder visualizar los detalles, es necesario firmarla."
                    type="warning"
                    icon="file-sign"
                    acceptText="Sí, firmar"
                    cancelText="No"
                    acceptIcon="check"
                    cancelIcon="close"
                    onAccept={handleConfirmFirma}
                    onCancel={handleCancelFirma}
                />
            </PageLayout>
        </>
    )
}