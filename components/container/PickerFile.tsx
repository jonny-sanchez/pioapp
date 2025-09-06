// import { useState } from "react";
import { Text } from "react-native-paper";
import { openCamera, permissionCamera } from "helpers/camara/cameraHelper";
import { Image, View, Pressable } from "react-native";
import { locationPermission, getLocation } from "helpers/ubicacion/ubicacionHelper";
import { useTheme, Icon, IconButton } from "react-native-paper";
import globalState from "helpers/states/globalState";
import fotografyState from "helpers/states/fotografyState";

export default function PickerFile(){

    const theme = useTheme()

    const { setOpenScreenLoading, setCloseScreenLoading } = globalState()

    const { metadatosPicture, setMetadatosPicture, clearMetadatosPicture } = fotografyState()

    const getImgCamera = async () => {

        const cameraPermisos = await permissionCamera()

        if(!cameraPermisos) return

        const locationPermisos = await locationPermission()

        if(!locationPermisos) return

        setOpenScreenLoading()

        const resultImg:any = await openCamera()

        const resultLocation:any = await getLocation()

        setCloseScreenLoading()

        if(!resultImg || !resultLocation) return

        setMetadatosPicture(
            resultImg?.uri || '',
            //fecha orginal cuando se tomo la foto {DateTimeOriginal}
            //para ubicacion usar {GPSLongitude} y {GPSLatitude}
            resultImg?.exif || null,
            //para mostrar ubicacion usar {longitude} y {latitude}
            resultLocation?.coords || null
        )

    }

    return (
        <Pressable onPress={getImgCamera}>
            <View className={`w-full h-52 rounded-lg flex items-center justify-center p-2`} style={{ backgroundColor: theme.colors.surfaceVariant }}>
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
        </Pressable>
    )
}