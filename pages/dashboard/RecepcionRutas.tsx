import ScrollViewContainer from "components/container/ScrollViewContainer";
import PageLayout from "components/Layouts/PageLayout";
import { View } from 'react-native'
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import DataTableInfo from "components/tables/DataTableInfo";
import { Text, useTheme } from "react-native-paper";
import ButtonForm from "components/form/ButtonForm";
import ContainerScannerQr from "pages/Layouts/RecepccionRuta/ContainerScannerQr";
import { Modalize } from "react-native-modalize";
import ModalizeProductCantidad from "pages/Layouts/RecepccionRuta/ModalizeProductCantidad";
import configTableRecepccionRutas from "helpers/tables/configTableRecepccionRutas";
import scannerQrState from "helpers/states/scannerQrState";
import { generateJsonError, ResponseService } from "types/RequestType";
import alertsState from "helpers/states/alertsState";
import { AJAX, URLPIOAPP } from "helpers/http/ajax";
import DataArticulosRutaType from "types/RecepccionRutas/DataArticulosRutaType";
import QrRecepccionObjectType from "types/RecepccionRutas/QrRecepccionObjectType";
import globalState from "helpers/states/globalState";
import recepccionRutaState from "helpers/states/recepccionRutaState";
import ArticuloRutaType from "types/Rutas/ArticuloRutaType";
import DialogComponent from "components/Modals/DialogComponent";

export default function RecepcionRutas() {

    const theme = useTheme()

    const { valueScannedQr, clearValueScannedQr } = scannerQrState()

    const { openVisibleSnackBar } = alertsState()

    const { setOpenScreenLoading, setCloseScreenLoading } = globalState()

    const { setArticuloRecepccion } = recepccionRutaState()

    const modalizeRef = useRef<Modalize>(null)
    
    const onOpenModalizeUpdate = () => modalizeRef.current?.open()

    const onCloseModalizeUpdate = () => modalizeRef.current?.close()

    const { control, handleSubmit, reset, resetField, formState: { errors } } = useForm({
        // resolver: yupResolver(schemaListRutasForm),
        mode: 'all'
    })

    const [loadingRecepcion, setLoadingRecepcion] = useState<boolean>(false)

    const [visibleDialogConfirmRecepcion, setVisibleDialogConfirmRecepcion] = useState<boolean>(false)

    const [articulosRecepccion, setArticulosRecepccion] = useState<DataArticulosRutaType | null>(null) 

    const [payloadRecepcion, setPayloadRecepcion] = useState<DataArticulosRutaType|null>(null);

    const postUploadRecepcion = async(body:DataArticulosRutaType) : Promise<ResponseService<any>> => {
        try {
            const result:ResponseService<any> = await AJAX(
                `${ URLPIOAPP }/recepcion/articulos/save`,
                'POST',
                body
            )
            openVisibleSnackBar(`${result?.message||''}`, 'success')
            return result
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
            return generateJsonError(`${error}`, 'object')
        }
    }

    const orderDataEnvServiceRecepcion = (data:any):DataArticulosRutaType => {

        let validArticulos:ArticuloRutaType[] = []

        Object.entries(data).forEach(([key, value]) => {
            if(!value) return
            const validArticulo:ArticuloRutaType|null = 
                articulosRecepccion?.detalle?.find(({ codigo_articulo }) => codigo_articulo === key) || null

            validArticulo && validArticulos.push(validArticulo)
        })

        const dataUploadRecepcion:DataArticulosRutaType = {
            cabecera: articulosRecepccion?.cabecera,
            detalle: validArticulos
        }

        return dataUploadRecepcion

    }

    const handleSubmitFormRecepcionArt = async (data:any) => {
        const payloadRecepcionValid:DataArticulosRutaType = orderDataEnvServiceRecepcion(data)

        if((payloadRecepcionValid?.detalle?.length ?? 0) <= 0) return openVisibleSnackBar('Debes seleccionar al menos un producto.', 'warning')

        setPayloadRecepcion(payloadRecepcionValid)

        setVisibleDialogConfirmRecepcion(true)
    }

    const confirmModalRecepcion = async():Promise<any> => {

        setLoadingRecepcion(true)

        setVisibleDialogConfirmRecepcion(false)

        const resultRecepccionUpload =  await postUploadRecepcion(payloadRecepcion as DataArticulosRutaType)
        
        resultRecepccionUpload.status && setArticulosRecepccion(null)

        setLoadingRecepcion(false)

    }

    const getMercanciaRuta = async(json:QrRecepccionObjectType):Promise<ResponseService<DataArticulosRutaType>> => {
        try {
            const result:ResponseService<DataArticulosRutaType> = await AJAX(`${ URLPIOAPP }/articulos/ruta/list/POS?serie=${json?.serie || ''}&id_pedido=${json?.id_pedido || ''}`)
            return result
        } catch (error) {
            openVisibleSnackBar(`${error}`, "error")
            return generateJsonError(`${error}`, 'object')
        }
    }

    const handleValueScannerRuta = async():Promise<any> => {
        if(!(valueScannedQr?.data || null)) return

        setOpenScreenLoading()

        const JsonValueQr:QrRecepccionObjectType = JSON.parse(valueScannedQr.data)
        
        const resultMercanciaRuta = await getMercanciaRuta(JsonValueQr) 

        setArticulosRecepccion({...resultMercanciaRuta.data, tienda_nombre: JsonValueQr.nombre_tienda} as DataArticulosRutaType)

        setCloseScreenLoading()

        clearValueScannedQr()
    }

    useEffect(() => { handleValueScannerRuta() }, [valueScannedQr])

    return (
        <>
            {/* dialog component */}
            <DialogComponent
                visible={visibleDialogConfirmRecepcion}
                title="Confirmar Recepcion"
                content={`Total articulos: ${ payloadRecepcion?.detalle?.reduce( (sum, { cantidad }) => sum + cantidad, 0) }`}
                icon="package-variant"
                onAccept={() => confirmModalRecepcion()}
                onCancel={() => setVisibleDialogConfirmRecepcion(false)}
                disabledButtonAccept={loadingRecepcion}
                loadingButtonAccept={loadingRecepcion}
            />

            {/* Modalize */}
            <ModalizeProductCantidad 
                modalizeRef={modalizeRef} 
                closeModalize={onCloseModalizeUpdate}
                setItemArtRecepcion={setArticulosRecepccion}
            />

            <PageLayout titleAppBar="Recepción"> 
                <ScrollViewContainer>
                    <View className="flex-1 my-5 flex-col gap-10">

                        <ContainerScannerQr listadoArticulosRuta={articulosRecepccion} disabled={loadingRecepcion}/>

                        <View className="w-full">
                            <DataTableInfo
                                data={articulosRecepccion?.detalle || []}
                                pagination={false}
                                search={false}
                                filter={false}
                                configTable={
                                    configTableRecepccionRutas(
                                        control,
                                        theme,
                                        onOpenModalizeUpdate,
                                        setArticuloRecepccion,
                                        loadingRecepcion
                                    )
                                }
                                // onPressRow={(data:ArticuloDetalleType) => {
                                //     console.log(data)
                                // }}
                            />
                        </View>

                        <View className="w-full">
                            <ButtonForm 
                                loading={loadingRecepcion}
                                onPress={handleSubmit(handleSubmitFormRecepcionArt)}
                                label="Recepcionar" 
                                icon="upload"
                                disabled={(
                                    !((articulosRecepccion?.detalle || []).length > 0) ||
                                    loadingRecepcion
                                )} 
                                buttonColor={theme.colors.error}
                            />
                        </View>

                    </View>
                </ScrollViewContainer>
            </PageLayout>
        </>
    )
}