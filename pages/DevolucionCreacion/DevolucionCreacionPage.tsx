import FormAdaptiveKeyBoard from "components/container/FormAdaptiveKeyBoard";
import PickerFile from "components/container/PickerFile";
import ScrollViewContainer from "components/container/ScrollViewContainer";
import ButtonForm from "components/form/ButtonForm";
import DropdownForm from "components/form/DropdownForm";
import PageLayout from "components/Layouts/PageLayout";
import ListItemComponent from "components/List/ListItemComponent";
import ListRender from "components/List/ListRender";
import PickerVideo from "components/VideoPicker/PickerVideo";
import fotografyState from "helpers/states/fotografyState";
import videografyState from "helpers/states/videografyState";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { AppTheme } from "types/ThemeTypes";

export default function DevolucionCreacionPage() {
    const theme = useTheme() as AppTheme
    const { control, handleSubmit, reset, resetField, formState: { errors, isValid } } = useForm({
        // resolver: yupResolver(schemaNwVisitaFormValidate(
        //     isCantidadPersonas ? true : false,
        //     visitaEmergencia ? true : false
        // )),
        mode: 'all',
        shouldUnregister: true
    })
    const { metadatosPicture, clearMetadatosPicture } = fotografyState()
    const { clearMetadatosVideo } = videografyState()

    const clearHook = () => {
        clearMetadatosPicture()
        clearMetadatosVideo()
    }

    useEffect(() => { 
        clearHook() 
        return clearHook()
    }, [])

    return (
        <>
            <PageLayout 
                goBack 
                notification={false}
                titleAppBar="Nueva devolucion"
            >
                <ScrollViewContainer>
                    <View className="w-full my-6">
                        <FormAdaptiveKeyBoard>
                            <View className="w-full flex-col gap-3.5">
                                <DropdownForm
                                    label="Tienda"
                                    data={[]}
                                    control={control}
                                    name="tienda"
                                    errors={errors}
                                />
                                <DropdownForm
                                    label="Recepciones"
                                    data={[]}
                                    control={control}
                                    name="recepciones"
                                    errors={errors}
                                    disable
                                />
                                <ListItemComponent
                                    titleStyle={{ color: theme.colors.primary }}
                                    title="FOTOGRAFIA TEMPERATURA"
                                    description="Porfavor toma una fotografia clara de la temperatura."
                                    descriptionNumberOfLines={0}
                                />
                                <PickerFile location={false}/>
                                <ListItemComponent
                                    titleStyle={{ color: theme.colors.primary }}
                                    title="VIDEO COMPROBANTE"
                                    description="Porfavor captura un video de comprobante de baja y que cumpla los siguientes requisitos:"
                                    descriptionNumberOfLines={0}
                                />
                                <ListRender
                                    titleSubheader={''}
                                    items={[
                                        {
                                            title: 'Indicar tienda',
                                            left(props) {
                                                return (<Icon source="circle-small" size={20}/>)
                                            },
                                        },
                                        {
                                            title: 'Fecha de reclamo',
                                            left(props) {
                                                return (<Icon source="circle-small" size={20}/>)
                                            },
                                        },
                                        {
                                            title: 'Color de cinta',
                                            left(props) {
                                                return (<Icon source="circle-small" size={20}/>)
                                            },
                                        },
                                        {
                                            title: 'Motivo',
                                            left(props) {
                                                return (<Icon source="circle-small" size={20}/>)
                                            },
                                        },
                                        {
                                            title: 'Video claro',
                                            left(props) {
                                                return (<Icon source="circle-small" size={20}/>)
                                            },
                                        },
                                        {
                                            title: 'Pesas en buen estado',
                                            left(props) {
                                                return (<Icon source="circle-small" size={20}/>)
                                            },
                                        },
                                    ]}
                                />
                                <PickerVideo location={false}/>
                                <ButtonForm 
                                    className="mt-3 mb-5"
                                    label="Guardar" 
                                    icon="content-save"
                                    buttonColor={theme.colors.error}
                                />
                            </View>
                        </FormAdaptiveKeyBoard>
                    </View>
                </ScrollViewContainer>
            </PageLayout>
        </>
    )
}