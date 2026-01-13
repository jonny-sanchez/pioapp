// import { useState } from "react";
import { Text } from "react-native-paper";
import { openCamera, permissionCamera } from "helpers/camara/cameraHelper";
import { Image, View, Pressable } from "react-native";
import { locationPermission, getLocation } from "helpers/ubicacion/ubicacionHelper";
import { useTheme, Icon, IconButton } from "react-native-paper";
import globalState from "helpers/states/globalState";
import fotografyState from "helpers/states/fotografyState";
import alertsState from "helpers/states/alertsState";
import TouchRipple from "components/Touch/TouchRipple";

type PickerFileProps = {
    disabled?: boolean;
}

export default function PickerFile({
    disabled = false
} : PickerFileProps){

    const theme = useTheme()

    const { openVisibleSnackBar } = alertsState()

    const { setOpenScreenLoading, setCloseScreenLoading } = globalState()

    const { metadatosPicture, setMetadatosPicture, clearMetadatosPicture } = fotografyState()

    const getImgCamera = async () => {

        try {

            setOpenScreenLoading()

            const cameraPermisos = await permissionCamera()

            if(!cameraPermisos) throw new Error(`Ooops. ocurrio un error con los permisos de camara.`);

            const locationPermisos = await locationPermission()

            if(!locationPermisos) throw new Error(`Ooops. ocurrio un error con los permisos de ubicacion.`);

            const resultImg:any = await openCamera()

            if(!resultImg) throw new Error(`Ooops. ocurrio un error al obtener la imagen.`);

            const resultLocation:any = await getLocation()

            if(!resultImg || !resultLocation) throw new Error(`Ooops. ocurrio un error al obtener los datos de imagen.`);
            
            setMetadatosPicture(
                resultImg?.uri || '',
                //fecha orginal cuando se tomo la foto {DateTimeOriginal}
                //para ubicacion usar {GPSLongitude} y {GPSLatitude}
                resultImg?.exif || null,
                //para mostrar ubicacion usar {longitude} y {latitude}
                resultLocation?.coords || null,
                resultImg?.mimeType || '',
                resultImg?.uri?.split('/').pop() || ''
            )
            
        } catch (error) {

            return openVisibleSnackBar(`${error}`, 'error')
            
        } finally {

            setCloseScreenLoading()

        }
    }

    return (
        <View
            className={`w-full h-52 rounded-lg ${disabled && 'opacity-50'}`}
            style={{
            //   borderRadius: 8,
              overflow: 'hidden',
              backgroundColor: theme.colors.surfaceVariant,
            }}
        >
            <TouchRipple 
                onPress={disabled ? () => {} : getImgCamera}
                style={{ flex: 1 }}
            >
            {/* className={`w-full h-52 rounded-lg flex items-center justify-center p-2 ${ disabled && 'opacity-50' }`} style={{ backgroundColor: theme.colors.surfaceVariant }} */}
            {/* <Pressable onPress={disabled ? () => {} : getImgCamera}> */}
                <View className="flex-1 flex items-center justify-center p-2">
                    { 
                        metadatosPicture.imgUri ?
                            <View className="relative w-full h-full">
                                <IconButton 
                                    mode="outlined"
                                    style={{ position: 'absolute', top: '0%', right: '0%', zIndex: 2 }} 
                                    icon="trash-can-outline" 
                                    iconColor={theme.colors.error} 
                                    size={20} 
                                    onPress={() => clearMetadatosPicture()}
                                />
                                <Image style={{ width: '100%', height: '100%' }} resizeMode="contain" source={{ uri: metadatosPicture.imgUri }} />
                            </View>
                                : 
                            <View className="flex flex-col items-center justify-center gap-1">
                                <Icon source={'camera-outline'} size={35}/>
                                <Text style={{ color: theme.colors.primary }}>Fotografia</Text>
                                <Text style={{ color: theme.colors.secondary }} variant="bodySmall">pulsa para usar camara</Text>
                            </View> 
                    }
                </View>
                {/* <ButtonForm label="Subir" onPress={getImgCamera}/>
                { imageUrl && <Image style={{ width: '100%', height: 200 }} resizeMode="contain" source={{ uri: imageUrl }} />} */}
                {/* <Text>{ metadatos?.DateTimeOriginal || "" }</Text> */}
                {/* <Text>{ location?.longitude } - { location?.latitude }</Text>
                <Text>{ metadatos?.GPSLongitude } - { metadatos?.GPSLatitude }</Text> */}            
            {/* </Pressable> */}
            </TouchRipple>
        </View>
    )
}