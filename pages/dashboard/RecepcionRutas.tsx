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
import DataArticulosRutaType, { ArticuloDetalleType } from "types/RecepccionRutas/DataArticulosRutaType";
import QrRecepccionObjectType from "types/RecepccionRutas/QrRecepccionObjectType";
import globalState from "helpers/states/globalState";
import recepccionRutaState from "helpers/states/recepccionRutaState";

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

    const [articulosRecepccion, setArticulosRecepccion] = useState<DataArticulosRutaType | null>(null) 

    const getMercanciaRuta = async(json:QrRecepccionObjectType):Promise<ResponseService<DataArticulosRutaType>> => {
        try {
            const result:ResponseService<DataArticulosRutaType> = await AJAX(`${ URLPIOAPP }/articulos/ruta/list/POS?serie=${json?.serie || ''}&docNum=${json?.id_pedido || ''}`)
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
            <ModalizeProductCantidad 
                modalizeRef={modalizeRef} 
                closeModalize={onCloseModalizeUpdate}
            />

            <PageLayout titleAppBar="Recepccion">
                <ScrollViewContainer>
                    <View className="flex-1 my-5 flex-col gap-10">

                        <ContainerScannerQr listadoArticulosRuta={articulosRecepccion} disabled={false}/>

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
                                        setArticuloRecepccion
                                    )
                                }
                                // onPressRow={(data:ArticuloDetalleType) => {
                                //     console.log(data)
                                // }}
                            />
                        </View>

                        <View className="w-full">
                            <ButtonForm 
                                label="Recepccionar" 
                                disabled={!((articulosRecepccion?.detalle || []).length > 0)} 
                                buttonColor={theme.colors.error}
                            />
                        </View>

                    </View>
                </ScrollViewContainer>
            </PageLayout>
        </>
    )
}