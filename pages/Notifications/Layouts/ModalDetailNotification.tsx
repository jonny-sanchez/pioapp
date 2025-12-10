import { LOGOAPP } from "assets/Providers/ImageProvider";
import AvatarImage from "components/Avatars/AvatarImage";
import ButtonForm from "components/form/ButtonForm";
import ListItemComponent from "components/List/ListItemComponent";
import ModalPortal from "components/Modals/ModalPortal";
import { NavigationService } from "helpers/navigator/navigationScreens";
import { useState } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { AppTheme } from "types/ThemeTypes";
import { Linking } from "react-native";
import { getUbicacionActual } from "helpers/ubicacion/ubicacionHelper";
import alertsState from "helpers/states/alertsState";
import { openWazeNavigation } from "helpers/Waze/WazeHelper";

type ModalDetailNotificationType = {
    portalModal: boolean;
    handleCloseTogglePortalModal: (() => void)
}

export default function ModalDetailNotification({
    portalModal,
    handleCloseTogglePortalModal
}: ModalDetailNotificationType) {

    const theme:AppTheme = useTheme() as AppTheme
    const { openVisibleSnackBar } = alertsState()
    const [rutaIniciada, setRutaIniciada] = useState<boolean>(false)
    const [loadindRutaIniciada, setLoadindRutaIniciada] = useState<boolean>(false);

    const handleOnpressRutaWaze = async () => {
        setLoadindRutaIniciada(true)
        const ubicacionActual = await getUbicacionActual()
        setLoadindRutaIniciada(false)
        if(!ubicacionActual) return openVisibleSnackBar(`Ooops ocurrio un error al obtener la Ubicacion porfavor verifice permisos y que la ubicacion este activa.`, 'error')
        setRutaIniciada(true)
        openWazeNavigation(ubicacionActual,{ latitude: 14.597003, longitude: -90.546725 })

    }

    const handleOnpressIngresoVisitaEmergencia = () => {
        handleCloseTogglePortalModal()
        NavigationService.navigate('SaveVisitas', { idVisitaEmergencia: 1  })
    }

    return (
        <>
            <ModalPortal 
                visible={portalModal} 
                onDismiss={handleCloseTogglePortalModal}
                heightContainer={600}
                maxHeightContainer={600}
                header={
                    <View className="flex flex-row items-center justify-start gap-4">
                        <AvatarImage size={50} img={LOGOAPP}/>
                        <View className="w-full flex-col">
                            <Text style={{ color: theme.colors.primary }}>PIOAPP</Text>
                            <Text variant="bodySmall">Visita emergencia.</Text>
                        </View>                        
                    </View>
                }
                footer={
                    <View className="w-full flex-col gap-2">
                        <ButtonForm 
                            label="Iniciar Ruta" 
                            icon="waze" 
                            loading={loadindRutaIniciada}
                            disabled={loadindRutaIniciada}
                            buttonColor={theme.colors.skyBlue}
                            onPress={handleOnpressRutaWaze}
                        />
                        <ButtonForm 
                            label="Ingresar visita" 
                            icon="clipboard-check" 
                            disabled={!rutaIniciada}
                            onPress={handleOnpressIngresoVisitaEmergencia}
                        />
                    </View>
                }
            >
                <View className="w-full my-6">
                    <ListItemComponent 
                        title="Tienda" 
                        description="RABINAL 1"
                    />
                    <ListItemComponent 
                        title="Direccion" 
                        description="2A. AVENIDA 9-04   ZONA 1  VILLA CANALES GUATEMALA"
                    />
                    <ListItemComponent
                        title="Descripcion"
                        description="Visita a la tienda Monte rico"
                    />
                    <ListItemComponent 
                        title="Comentario" 
                        description=" -- "
                    />
                </View> 
            </ModalPortal>
        </>
    )
}