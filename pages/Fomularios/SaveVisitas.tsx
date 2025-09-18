import AppBarHome from "components/container/AppBarHome"
import ScrollViewContainer from "components/container/ScrollViewContainer"
import { View } from 'react-native'
import TextInfo from "components/typografy/TextInfo"
import FormAdaptiveKeyBoard from "components/container/FormAdaptiveKeyBoard"
import DropdownForm from "components/form/DropdownForm"
import InputFormHook from "components/form/InputFormHook"
import { useForm } from "react-hook-form"
import ButtonForm from "components/form/ButtonForm"
import { yupResolver } from '@hookform/resolvers/yup'
import schemaNwVisitaFormValidate from "helpers/validatesForm/schemaNwVisitaFormValidate"
import { useState } from "react"
import PickerFile from "components/container/PickerFile"
import { Icon, Text } from "react-native-paper"
import { useRoute } from "@react-navigation/native"
import { NavigationService } from "helpers/navigator/navigationScreens"

export default function SaveVisitas(){

    const route = useRoute()

    // const { nombre_tienda } = route.params as any

    const [ tipoEntrega, setTipoEntrega ] = useState([ 
        { label: 'Manzana', value: 'apple' },
        { label: 'Banana', value: 'banana' },
    ])

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schemaNwVisitaFormValidate),
        mode: 'all'
    })

    const submitFormNwVisita = async(data: any) => {
        alert(JSON.stringify(data))
        // NavigationService.reset('Home')
        // NavigationService.navigate('Home', { keyIndex: 'rutas' })

    }

    return (

        <>
            {/* <AppBarHome title="Nueva Visita" goBack={true}/> */}

            <ScrollViewContainer>
                
                <View className="w-full mt-6">
                    <TextInfo style={{ textAlign: "justify" }}>Fomulario para ingreso de una nueva visita a una tienda porfavor completa los campos solicitados de manera correcta.</TextInfo>
                </View>

                <FormAdaptiveKeyBoard>

                    <View className="w-full flex-col gap-3.5 mt-5">

                        {/* <Text style={{ textAlign: 'right' }} variant="bodySmall">Tienda: { nombre_tienda || '' }</Text> */}
                        {/* <></> */}

                        <DropdownForm
                            label="Tienda"
                            data={tipoEntrega}
                            control={control}
                            name="tienda"
                            errors={errors}
                        />

                        <DropdownForm
                            label="Tipo Visita"
                            data={tipoEntrega}
                            control={control}
                            name="tipo_visita"
                            errors={errors}
                        />

                        <InputFormHook 
                            control={control} 
                            maxLength={100}
                            name="comentario" 
                            placeholder="Ingrese un comentario" 
                            label="Comentario"
                            errors={errors}
                        />

                        <PickerFile/>

                        <View className="w-full mt-3"><ButtonForm onPress={handleSubmit(submitFormNwVisita)} label="Guardar"/></View>

                    </View>

                </FormAdaptiveKeyBoard>                

            </ScrollViewContainer>
        </>

    )

}