import { View } from "react-native"
import ModalizeComponent from "components/Modals/ModalizeComponent"
import InputFormHook from "components/form/InputFormHook"
import { useForm } from "react-hook-form"
import ButtonForm from "components/form/ButtonForm"
import FormAdaptiveKeyBoard from "components/container/FormAdaptiveKeyBoard"
import { useKeyboardVisible } from "helpers/keyboard/keyboardHelper"
import { useEffect, useState } from "react"
import schemaModalizeEditMercanciaForm from "helpers/validatesForm/schemaModalizeEditMercanciaForm"
import { yupResolver } from "@hookform/resolvers/yup"
import recepccionRutaState from "helpers/states/recepccionRutaState"

type ModalizeProductCantidadProps = {
    modalizeRef?: any;
    closeModalize?: () => void;
    // mercancia?: MercanciaType | null
}

export default function ModalizeProductCantidad({
    modalizeRef,
    closeModalize,
    // mercancia = null
} : ModalizeProductCantidadProps) {

    const [ disabledBtn, setDisabledBtn ] = useState<boolean>(true) 

    const { articuloRecepccion } = recepccionRutaState()

    // const keyboardVisible = useKeyboardVisible()

    const { control, handleSubmit, reset, resetField, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schemaModalizeEditMercanciaForm),
        mode: 'all'
    })

    const valueCantidadWatch = watch('cantidad_update')

    const submitFormUpdateCantidad = async() => {
        closeModalize && closeModalize()
        reset()
    }

    useEffect(()=>{
        articuloRecepccion && resetField('cantidad_update', { defaultValue: `${ Number(articuloRecepccion.quantity || 0) }` })
    }, [articuloRecepccion])

    useEffect(()=> {
        const validErrors =  (Object.keys(errors).length > 0 ? true : false)
        setDisabledBtn((valueCantidadWatch == (Number(articuloRecepccion?.quantity ?? '0').toString())) || validErrors ? true : false)
    }, [valueCantidadWatch])

    return (
        <>
            <ModalizeComponent 
                modalizeRef={modalizeRef} 
                title="Editar"
                footerComponent={
                        <ButtonForm 
                            disabled={disabledBtn}
                            label="Editar" 
                            icon="pencil-outline"
                            onPress={handleSubmit(submitFormUpdateCantidad)}
                        /> 
                }
            >
                <FormAdaptiveKeyBoard>
                    <View className="flex flex-col gap-3">
                        <InputFormHook 
                            control={control} 
                            errors={errors}
                            name="cantidad_update" 
                            inputType="numeric" 
                            placeholder="Ingrese una cantidad" 
                            maxLength={4}
                            label="Cantidad"
                            // onSubmitEditing={handleSubmit(submitFormUpdateCantidad)}
                        />
                    </View>
                </FormAdaptiveKeyBoard>
            </ModalizeComponent>
        </>
    )
}