import { TiendaModuloType } from "Apis/TiendasModulo/TiendasModuloApi";
import ButtonForm from "components/form/ButtonForm";
import ListItemComponent from "components/List/ListItemComponent";
import ModalizeComponent from "components/Modals/ModalizeComponent";
import { openWazeNavigation } from "helpers/Waze/WazeHelper";
import { View } from "react-native";
import { LatLng } from "react-native-maps";
import { useTheme } from "react-native-paper";
import RutasListType from "types/Rutas/RutasListType";
import { AppTheme } from "types/ThemeTypes";

type ModalizeMapViewLayoutProps = {
    modalizeRef:any;
    rutaNav?:TiendaModuloType;
    location?:LatLng;
}

export default function ModalizeMapViewLayout({
    modalizeRef,
    rutaNav,
    location
} : ModalizeMapViewLayoutProps) {

    const theme = useTheme() as AppTheme

    const navigateWaze = () => {
        if(!location) return
        if(!rutaNav) return
        openWazeNavigation(
            { latitude: location.latitude, longitude: location.longitude }, 
            { latitude: Number(rutaNav.altitud) , longitude: Number(rutaNav.latitud) }
        )
    }

    return (
        <>
            <ModalizeComponent
                modalizeRef={modalizeRef}
                heightModalizeSreen={0.38}
                title="Navegacion"
            >
                <View className="w-full flex flex-col gap-3">
                    <ListItemComponent
                        title={`${rutaNav?.nombre_tienda??' -- '}`}
                        descriptionNumberOfLines={0}
                        description={`${rutaNav?.direccion_tienda??' -- '}`}
                    />
                    <ButtonForm 
                        buttonColor={theme.colors.skyBlue} 
                        icon="waze" 
                        label="ver en waze"
                        onPress={navigateWaze}
                        disabled={!location || !rutaNav}
                    />
                </View>
            </ModalizeComponent>
        </>
    )

}