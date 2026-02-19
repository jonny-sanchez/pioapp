// import { useState } from "react";
import { Button, Text } from "react-native-paper";
import { openCamera, permissionCamera } from "helpers/camara/cameraHelper";
import { Image, View, Pressable, StyleSheet } from "react-native";
import { locationPermission, getLocation } from "helpers/ubicacion/ubicacionHelper";
import { useTheme, Icon, IconButton } from "react-native-paper";
import globalState from "helpers/states/globalState";
import fotografyState from "helpers/states/fotografyState";
import alertsState from "helpers/states/alertsState";
import TouchRipple from "components/Touch/TouchRipple";
import { ImageOptimizerService } from "helpers/Images/ImageOptimizerService";
import { AppTheme } from "types/ThemeTypes";
import Animated, { FadeIn } from "react-native-reanimated";
import ImageCarouselPortal from "components/Modals/ImageCarouselPortal";
import { useState } from "react";

type PickerFileProps = {
    disabled?: boolean;
    location?: boolean;
}

export default function PickerFile({
    disabled = false,
    location = true
} : PickerFileProps){

    const theme = useTheme() as AppTheme
    const { openVisibleSnackBar, closeVisibleSnackBar } = alertsState()
    const { setOpenScreenLoading, setCloseScreenLoading } = globalState()
    const { metadatosPicture, setMetadatosPicture, clearMetadatosPicture } = fotografyState()
    const [isOpenCarrousel, setIsOpenCorrousel] = useState<boolean>(false)

    // const getImgCamera = async () => {
    //     try {
    //         setOpenScreenLoading()
    //         const cameraPermisos = await permissionCamera()
    //         if(!cameraPermisos) throw new Error(`Ooops. ocurrio un error con los permisos de camara.`);
    //         const locationPermisos = await locationPermission()
    //         if(!locationPermisos) throw new Error(`Ooops. ocurrio un error con los permisos de ubicacion.`);
    //         const resultImg:any = await openCamera()
    //         if(!resultImg) throw new Error(`Ooops. ocurrio un error al obtener la imagen.`);
    //         const resultLocation:any = await getLocation()
    //         if(!resultImg || !resultLocation) throw new Error(`Ooops. ocurrio un error al obtener los datos de imagen.`);
    //         openVisibleSnackBar(`Optimizando imagen...`, 'normal')
    //         const resultImageOptimizaded = await ImageOptimizerService.optimize(resultImg?.uri)
    //         closeVisibleSnackBar()
    //         setMetadatosPicture(
    //             resultImageOptimizaded.uri,
    //             // resultImg?.uri || '',
    //             //fecha orginal cuando se tomo la foto {DateTimeOriginal}
    //             //para ubicacion usar {GPSLongitude} y {GPSLatitude}
    //             resultImg?.exif || null,
    //             //para mostrar ubicacion usar {longitude} y {latitude}
    //             resultLocation?.coords || null,
    //             // resultImg?.mimeType || '',
    //             resultImageOptimizaded.mimeType,
    //             resultImg?.uri?.split('/').pop() || ''
    //         )
    //     } catch (error) {
    //         return openVisibleSnackBar(`${error}`, 'error')
    //     } finally {
    //         setCloseScreenLoading()
    //     }
    // }

    const getImgCamera = async () => {
      try {
        setOpenScreenLoading()

        const cameraPermisos = await permissionCamera()
        if (!cameraPermisos) {
            throw new Error(`Ooops. ocurrió un error con los permisos de cámara.`)
        }

        //declarar fuera para que exista siempre
        let resultLocation: any = null

        if (location) {
            const locationPermisos = await locationPermission()
            if (!locationPermisos) {
                throw new Error(`Ooops. ocurrió un error con los permisos de ubicación.`)
            }
        }

        const resultImg: any = await openCamera()
        if (!resultImg) {
            throw new Error(`Ooops. ocurrió un error al obtener la imagen.`)
        }

        // obtener ubicación solo si está habilitado
        if (location) {
            resultLocation = await getLocation()
            if(!resultLocation) throw new Error(`Ooops. ocurrio un error al obtener datos de ubicacion.`);
        }

        openVisibleSnackBar(`Optimizando imagen...`, 'normal')

        const resultImageOptimizaded = await ImageOptimizerService.optimize(resultImg?.uri)

        closeVisibleSnackBar()

        setMetadatosPicture(
            resultImageOptimizaded.uri,
            resultImg?.exif || null,
            location ? resultLocation?.coords || null : null,
            resultImageOptimizaded.mimeType,
            resultImg?.uri?.split('/').pop() || ''
        )

      } catch (error) {
          openVisibleSnackBar(`${error}`, 'error')
      } finally {
          setCloseScreenLoading()
      }
    }

    return (
        <>
            <ImageCarouselPortal 
                images={[metadatosPicture.imgUri]} 
                onClose={() => setIsOpenCorrousel(false)} 
                visible={isOpenCarrousel}
            />

            <View
              style={{
                height: 200,
                borderRadius: 8,
                overflow: "hidden",
                backgroundColor: theme.colors.background,
                borderWidth: metadatosPicture.imgUri ? 0 : 2,
                borderStyle: metadatosPicture.imgUri ? "solid" : "dashed",
                borderColor: theme.colors.outlineVariant,
                opacity: disabled ? 0.5 : 1,
              }}
            >
              <TouchRipple
                disabled={disabled}
                onPress={disabled ? () => {} : getImgCamera}
                style={{ flex: 1 }}
              >
                {metadatosPicture.imgUri ? (
                  <Animated.View 
                    entering={FadeIn.duration(300)}
                    style={{ flex: 1 }}>
                    {/* Imagen */}
                    <Image
                      source={{ uri: metadatosPicture.imgUri }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                    <View
                      style={[{backgroundColor: "rgba(0,0,0,0.45)"}, stylesPicker.containerImage]}
                    >
                    
                      <View className="flex-1 flex-row items-center justify-between gap-1">
                        <View>
                            <Text style={{ color: "#fff" }}>
                                Fotografía capturada
                            </Text>
                            <Text style={{ color: "#ccc" }} variant="bodySmall">
                                Pulsa para reemplazar
                            </Text>
                        </View>
                        <Button 
                            mode="contained" 
                            icon={'eye'}
                            onPress={() => setIsOpenCorrousel(true)}
                            disabled={disabled}
                        >
                            Ver
                        </Button>
                      </View>
                    </View>
                    {/* Botón eliminar flotante */}
                    <IconButton
                      icon="trash-can-outline"
                      mode="contained"
                      containerColor="rgba(0,0,0,0.6)"
                      iconColor="#fff"
                      size={18}
                      style={stylesPicker.iconDeleteImage}
                      onPress={clearMetadatosPicture}
                      disabled={disabled}
                    />
                    {/* Indicador verde */}
                    <View
                      style={[{ backgroundColor: theme.colors.success }, stylesPicker.indicator]}
                    />
                  </Animated.View>
                ) : (
                  <View style={[stylesPicker.containerIcons]}>
                    <View style={[{backgroundColor: theme.colors.primary}, stylesPicker.iconCamera]}>
                      <Icon
                        source="camera-outline"
                        size={30}
                        color={theme.colors.background}
                      />
                    </View>
                    <View className="w-full items-center justify-center pt-1">
                        <Text style={{ color: theme.colors.onSurface}}>
                            Fotografía
                        </Text>
                        <Text style={{ color: theme.colors.secondary }} variant="bodySmall">
                          Pulsa para usar la cámara
                        </Text>
                    </View>
                  </View>
                )}
              </TouchRipple>
            </View>
        </>
    )
}

const stylesPicker = StyleSheet.create({
    iconCamera: {
        width: 62,
        height: 62,
        borderRadius: 31,
        alignItems: "center",
        justifyContent: "center",
    },
    containerIcons: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    indicator: {
        position: "absolute",
        top: 12,
        left: 12,
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    iconDeleteImage: {
        position: "absolute",
        top: 12,
        right: 12,
    },
    containerImage: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 16,
    }
})