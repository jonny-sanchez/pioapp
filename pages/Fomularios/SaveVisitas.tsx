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
    const { metadatosPicture, clearMetadatosPicture } = fotografyState()

    const getTiendas = async():Promise<ResponseService<any[]>> => {
        try {
            const result:ResponseService<any[]> = await AJAX(`${URLPIOAPP}/tiendas/modulo/all`)
            return result
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
            return generateJsonError(`${error}`, "array")
        }
    }

    const getTiposVisitas = async():Promise<ResponseService<any[]>> => {
        try {
            const result:ResponseService<any[]> = await AJAX(`${URLPIOAPP}/tipo/visitas/all`)
            return result
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
            return generateJsonError(`${error}`, 'array')
        }
    }

    const postCreateVisita = async(data:object):Promise<ResponseService<any>> => {
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value])=> formData.append(`${key}`, value))
            const result:ResponseService<any> = await AJAX(`${URLPIOAPP}/visitas/create`, "POST", formData, true)
            openVisibleSnackBar(`${result.message}`, 'success')
            return result
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
            return generateJsonError(error, 'object')
        }
    }

    const orderDataFormVisitas = (dataForm:schemaNwVisitaFormValidateType):object => {
        const objectTienda = dataForm.tienda.split('-')
        const empresa = objectTienda[0] || ''
        const tienda = objectTienda[1] || ''
        const findTienda:any = originalTiendas.find(el => el.codigo_empresa === empresa && el.codigo_tienda === tienda)

        return {
            empresa: empresa,
            tienda: tienda,
            tienda_nombre: findTienda?.nombre_tienda || null,
            tienda_direccion: findTienda?.direccion_tienda || null,
            id_tipo_visita: dataForm.tipo_visita,
            photo_gps_longitude: metadatosPicture?.exif?.GPSLongitude || null,
            photo_gps_latitude: metadatosPicture?.exif?.GPSLatitude || null,
            phone_gps_longitude: metadatosPicture?.coords?.longitude || null,
            phone_gps_latitude: metadatosPicture?.coords?.latitude || null,
            name_original_image: metadatosPicture?.nameImg || null,
            comentario: dataForm?.comentario || null,
            foto_visita: { 
                uri: metadatosPicture.imgUri,
                type: metadatosPicture.mimeType,
                name: metadatosPicture.nameImg
            }
        }
    }

    const { setOpenScreenLoading, setCloseScreenLoading } = globalState()

    const [ isLodingForm, setIsLoadingForm ] = useState<boolean>(false)

    const [ tipoVisitas, setTipoVisitas ] = useState([])

    const [originalTiendas, setOriginalTiendas] = useState<any[]>([])

    const [ tiendas, setTiendas ] = useState<any[]>([])

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schemaNwVisitaFormValidate),
        mode: 'all'
    })

    const clearFormVisitas = () => {
        reset()
        clearMetadatosPicture()
    }

    const submitFormNwVisita = async(data: schemaNwVisitaFormValidateType) => {
        const { imgUri, coords, mimeType, nameImg } = metadatosPicture

        if(!imgUri) return openVisibleSnackBar('Imagen no encontrada.', "warning")

        if(!coords || !mimeType || !nameImg) return openVisibleSnackBar('Error en la imagen porfavor intentelo de nuevo.', "warning")

        const uploadData = orderDataFormVisitas(data)

        setIsLoadingForm(true)

        const resultCreateVisita = await postCreateVisita(uploadData)

        resultCreateVisita.status && clearFormVisitas()

        setIsLoadingForm(false)

        // NavigationService.reset('Home')
        // NavigationService.navigate('Home', { keyIndex: 'rutas' })

    }

    const renderAll = async () => {
        setOpenScreenLoading()
        const listTiendas = await getTiendas()
        const listTipoVisita = await getTiposVisitas()
        const flatTiendas:any = listTiendas.data?.flatMap(el => ({ label: el.nombre_tienda, value: `${el.codigo_empresa}-${el.codigo_tienda}` }))
        const flatTipoVisitas:any = listTipoVisita.data?.flatMap(el => ({ label: el.name, value: el.id_tipo_visita }))
        setOriginalTiendas(listTiendas?.data ?? [])
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
                            disable={isLodingForm}
                        />

                        <DropdownForm
                            label="Tipo Visita"
                            data={tipoVisitas}
                            control={control}
                            name="tipo_visita"
                            errors={errors}
                            disable={isLodingForm}
                        />

                        <InputFormHook 
                            control={control} 
                            maxLength={100}
                            name="comentario" 
                            placeholder="Ingrese un comentario" 
                            label="Comentario"
                            errors={errors}
                            disabled={isLodingForm}
                        />

                        <PickerFile disabled={isLodingForm}/>

                        <View className="w-full mt-3 mb-6">
                            <ButtonForm 
                                loading={isLodingForm} 
                                disabled={isLodingForm}
                                onPress={handleSubmit(submitFormNwVisita)} 
                                label="Guardar"
                            />
                        </View>

                    </View>

                </FormAdaptiveKeyBoard>                

            </ScrollViewContainer>
        </>

    )

}