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
import schemaNwVisitaFormValidate, { schemaNwVisitaFormValidateType } from "helpers/validatesForm/schemaNwVisitaFormValidate"
import { useEffect, useState } from "react"
import PickerFile from "components/container/PickerFile"
import globalState from "helpers/states/globalState"
import { ResponseService, generateJsonError } from "types/RequestType"
import { AJAX, URLPIOAPP } from "helpers/http/ajax"
import alertsState from "helpers/states/alertsState"
import fotografyState from "helpers/states/fotografyState"

export default function SaveVisitas(){

    // const route = useRoute()
    // const { nombre_tienda } = route.params as any
    const { openVisibleSnackBar } = alertsState()
    const { metadatosPicture } = fotografyState()

    const getTiendas = async():Promise<ResponseService<any[]>> => {
        try {
            const result:ResponseService = await AJAX(`${URLPIOAPP}/tiendas/modulo/all`)
            return result
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
            return generateJsonError(`${error}`, "array")
        }
    }

    const getTiposVisitas = async():Promise<ResponseService<any[]>> => {
        try {
            const result:ResponseService = await AJAX(`${URLPIOAPP}/tipo/visitas/all`)
            return result
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
            return generateJsonError(`${error}`, 'array')
        }
    }

    const { setOpenScreenLoading, setCloseScreenLoading } = globalState()

    const [ tipoVisitas, setTipoVisitas ] = useState([])

    const [ tiendas, setTiendas ] = useState([])

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schemaNwVisitaFormValidate),
        mode: 'all'
    })

    const submitFormNwVisita = async(data: schemaNwVisitaFormValidateType) => {
        const { imgUri, coords, mimeType, nameImg } = metadatosPicture

        if(!imgUri) return openVisibleSnackBar('Imagen no encontrada.', "warning")

        if(!coords || !mimeType || !nameImg) return openVisibleSnackBar('Error en la imagen porfavor intentelo de nuevo.', "warning")
        // alert(JSON.stringify(data))
        alert(JSON.stringify(nameImg))
        // NavigationService.reset('Home')
        // NavigationService.navigate('Home', { keyIndex: 'rutas' })

    }

    const renderAll = async () => {
        setOpenScreenLoading()
        const listTiendas = await getTiendas()
        const listTipoVisita = await getTiposVisitas()
        const flatTiendas:any = listTiendas.data?.flatMap(el => ({ label: el.nombre_tienda, value: `${el.codigo_empresa}-${el.codigo_tienda}` }))
        const flatTipoVisitas:any = listTipoVisita.data?.flatMap(el => ({ label: el.name, value: el.id_tipo_visita }))
        setTiendas(flatTiendas)
        setTipoVisitas(flatTipoVisitas)
        setCloseScreenLoading()
    }

    useEffect(() => { renderAll() }, [])

    return (

        <>
            {/* <AppBarHome title="Nueva Visita" goBack={true}/> */}

            <ScrollViewContainer>
                
                <View className="w-full mt-6">
                    <TextInfo style={{ textAlign: "justify" }}>Fomulario para ingreso de una nueva visita a una tienda porfavor completa los campos solicitados de manera correcta.</TextInfo>
                </View>

                <FormAdaptiveKeyBoard>

                    <View className="w-full flex-col gap-3.5 mt-5">

                        <DropdownForm
                            label="Tienda"
                            data={tiendas}
                            control={control}
                            name="tienda"
                            errors={errors}
                        />

                        <DropdownForm
                            label="Tipo Visita"
                            data={tipoVisitas}
                            control={control}
                            name="tipo_visita"
                            errors={errors}
                            // disable={true}
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

                        <View className="w-full mt-3 mb-6"><ButtonForm onPress={handleSubmit(submitFormNwVisita)} label="Guardar"/></View>

                    </View>

                </FormAdaptiveKeyBoard>                

            </ScrollViewContainer>
        </>

    )

}