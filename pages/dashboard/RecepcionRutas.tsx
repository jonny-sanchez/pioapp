import ScrollViewContainer from "components/container/ScrollViewContainer";
import PageLayout from "components/Layouts/PageLayout";
import { View } from 'react-native'
import { useForm } from "react-hook-form";
import { useState } from "react";
import DataTableInfo from "components/tables/DataTableInfo";
import { Text, useTheme } from "react-native-paper";
import ButtonForm from "components/form/ButtonForm";
import IconButtomForm from "components/form/IconButtomForm";
import ContainerScannerQr from "pages/Layouts/RecepccionRuta/ContainerScannerQr";
import CheckBoxDinamic from "pages/Layouts/RecepccionRuta/CheckBoxDinamic";
import CheckBoxForm from "components/form/CheckBoxForm";

type MercanciaType = {
    id?: number;
    name?: string;
    cantidad?: number;
}

export default function RecepcionRutas() {

    const theme = useTheme()

    const { control, handleSubmit, reset, resetField, formState: { errors } } = useForm({
        // resolver: yupResolver(schemaListRutasForm),
        mode: 'all'
    })

    const [mercancia, setMercancia] = useState<MercanciaType[]>([
        { id: 1, name: 'Pesquezo', cantidad: 34 },
        { id: 2, name: 'Pollo crudo', cantidad: 67 },
        { id: 3, name: 'Alitas', cantidad: 2 },
    ])

    return (
        <>
            <PageLayout titleAppBar="Recepccion">
                <ScrollViewContainer>
                    <View className="flex-1 my-5 flex-col gap-10">

                        <ContainerScannerQr/>

                        <View className="w-full">
                            <DataTableInfo
                                data={mercancia}
                                pagination={false}
                                configTable={
                                    [
                                        {
                                            data: 'name',
                                            name: 'Producto'
                                        },
                                        {
                                            data: null,
                                            name: 'Cantidad',
                                            render: (data:MercanciaType) => { return (
                                                    <View className="flex flex-row justify-center items-center gap-3">
                                                        <Text>{ data.cantidad }</Text>
                                                        <IconButtomForm icon="pencil-outline"/>
                                                    </View>
                                                ) 
                                            }
                                        },
                                        {
                                            data: null,
                                            name: '',
                                            render: (data:MercanciaType) => { return (
                                                    <View className="flex flex-row">
                                                        {/* <CheckBoxForm label="Si" control={control} name={`${data.name}-si`}/>
                                                        <CheckBoxForm label="no" control={control} name={`${data.name}-no`}/> */}
                                                    </View>
                                                ) 
                                            }
                                        },
                                    ]
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