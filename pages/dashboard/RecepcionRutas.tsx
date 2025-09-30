import ScrollViewContainer from "components/container/ScrollViewContainer";
import PageLayout from "components/Layouts/PageLayout";
import { View } from 'react-native'
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import DataTableInfo from "components/tables/DataTableInfo";
import { Text, useTheme } from "react-native-paper";
import ButtonForm from "components/form/ButtonForm";
import IconButtomForm from "components/form/IconButtomForm";
import ContainerScannerQr from "pages/Layouts/RecepccionRuta/ContainerScannerQr";
import CheckBoxForm from "components/form/CheckBoxForm";
import { Modalize } from "react-native-modalize";
import ModalizeProductCantidad from "pages/Layouts/RecepccionRuta/ModalizeProductCantidad";
import configTableRecepccionRutas from "helpers/tables/configTableRecepccionRutas";

export type MercanciaType = {
    id?: number;
    name?: string;
    cantidad?: number;
    cantidadUpload?: number;
}

export default function RecepcionRutas() {

    const theme = useTheme()

    const modalizeRef = useRef<Modalize>(null)
    
    const onOpenModalizeUpdate = () => modalizeRef.current?.open()

    const onCloseModalizeUpdate = () => modalizeRef.current?.close()

    const { control, handleSubmit, reset, resetField, formState: { errors } } = useForm({
        // resolver: yupResolver(schemaListRutasForm),
        mode: 'all'
    })

    const [ editMercancia, setEditMercancia ] = useState<MercanciaType | null>(null)

    const [mercancia, setMercancia] = useState<MercanciaType[]>([
        { id: 1, name: 'Pesquezo', cantidad: 34, cantidadUpload: 34 },
        { id: 2, name: 'Pollo crudo', cantidad: 67, cantidadUpload: 67 },
        { id: 3, name: 'Alitas', cantidad: 2, cantidadUpload: 2 },
    ])

    return (
        <>
            <ModalizeProductCantidad 
                modalizeRef={modalizeRef} 
                closeModalize={onCloseModalizeUpdate}
                mercancia={editMercancia}
            />

            <PageLayout titleAppBar="Recepccion">
                <ScrollViewContainer>
                    <View className="flex-1 my-5 flex-col gap-10">

                        <ContainerScannerQr disabled={false}/>

                        <View className="w-full">
                            <DataTableInfo
                                data={mercancia}
                                pagination={false}
                                search={false}
                                filter={false}
                                configTable={
                                    configTableRecepccionRutas(
                                        control, 
                                        onOpenModalizeUpdate,
                                        setEditMercancia
                                    )
                                }
                            />
                        </View>

                        <View className="w-full">
                            <ButtonForm 
                                label="Recepccionar" 
                                disabled={true} 
                                buttonColor={theme.colors.error}
                            />
                        </View>

                    </View>
                </ScrollViewContainer>
            </PageLayout>
        </>
    )
}