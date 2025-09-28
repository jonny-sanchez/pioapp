import { View } from "react-native"
import ModalizeComponent from "components/Modals/ModalizeComponent"
import InputFormHook from "components/form/InputFormHook"
import { useForm } from "react-hook-form"
import ButtonForm from "components/form/ButtonForm"
import FormAdaptiveKeyBoard from "components/container/FormAdaptiveKeyBoard"
import { useKeyboardVisible } from "helpers/keyboard/keyboardHelper"

type ModalizeProductCantidadProps = {
    modalizeRef?: any;
    closeModalize?: () => void;
}

export default function ModalizeProductCantidad({
    modalizeRef,
    closeModalize
} : ModalizeProductCantidadProps) {

    const keyboardVisible = useKeyboardVisible()

    const { control, handleSubmit, reset, resetField, formState: { errors } } = useForm({
        // resolver: yupResolver(schemaListRutasForm),
        mode: 'all'
    })

    const submitFormUpdateCantidad = async() => {
        closeModalize && closeModalize()
        reset()
    }

    return (
        <>
            <ModalizeComponent 
                modalizeRef={modalizeRef} 
                title="Editar"
                footerComponent={
                    !keyboardVisible && (
                        <ButtonForm 
                            label="Editar" 
                            icon="pencil-outline"
                            onPress={handleSubmit(submitFormUpdateCantidad)}
                        /> 
                    )
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
                            onSubmitEditing={handleSubmit(submitFormUpdateCantidad)}
                        />
                    </View>
                </FormAdaptiveKeyBoard>
            </ModalizeComponent>
        </>
    )
}