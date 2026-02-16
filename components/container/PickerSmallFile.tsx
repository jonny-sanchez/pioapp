import globalState from 'helpers/states/globalState'
import { View, Pressable } from 'react-native'
import { Icon, IconButton, Text, useTheme } from 'react-native-paper'
import { openCamera, permissionCamera } from 'helpers/camara/cameraHelper'
import { useEffect, useState } from 'react'
import alertsState from 'helpers/states/alertsState'
import TouchRipple from 'components/Touch/TouchRipple'
import { ImageOptimizerService } from 'helpers/Images/ImageOptimizerService'
import Animated, { FadeIn } from 'react-native-reanimated'
import ImageCarouselPortal from 'components/Modals/ImageCarouselPortal'
import MenuComponent from 'components/Menus/MenuComponent'
import IconButtomForm from 'components/form/IconButtomForm'
import MenuItem from 'components/Menus/MenuItem'

type PickerSmallFileProps = {
    disabled?: boolean;
    onSelectFile?: (file:any) => void;
}

export default function PickerSmallFile({
    disabled = false,
    onSelectFile
} : PickerSmallFileProps) {

    const theme = useTheme()
    const { setOpenScreenLoading, setCloseScreenLoading } = globalState()
    const { openVisibleSnackBar, closeVisibleSnackBar } = alertsState()
    const [ foto, setFoto ] = useState<any>(null)
    const [isOpenCarrousel, setIsOpenCorrousel] = useState<boolean>(false)
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)

    const getImgCamera = async () => {
        try {
            setOpenScreenLoading()
            const cameraPermisos = await permissionCamera()
            if(!cameraPermisos) throw new Error(`Ooops. ocurrio un error con los permisos de la camara.`);
            const resultImg:any = await openCamera()
            if(!resultImg) throw new Error(`Ooops. ocurrio un error al obtener la imagen.`);
            openVisibleSnackBar(`Optimizando imagen...`, 'normal')
            const resultImageOptimizaded = await ImageOptimizerService.optimize(resultImg?.uri)
            closeVisibleSnackBar()
            resultImg.uri = resultImageOptimizaded.uri
            resultImg.mimeType = resultImageOptimizaded.mimeType
            setFoto(resultImg)
            if(onSelectFile) onSelectFile(resultImg)
        } catch (error) {
            return openVisibleSnackBar(`${error}`, 'error')
        } finally {
            setCloseScreenLoading()
        }
    }

    const openCarousel = () => {
        setIsOpenCorrousel(true)
        setIsOpenMenu(false)
    }

    const removeImage = () => {
        setFoto(null)
        onSelectFile?.(null)
        setIsOpenMenu(false)
    }

    useEffect(() => { 
        if(onSelectFile) onSelectFile(null) 
    }, [])

    return (
        <>
            <ImageCarouselPortal 
                images={[foto?.uri??""]} 
                onClose={() => setIsOpenCorrousel(false)} 
                visible={isOpenCarrousel}
            />

            <View 
                className={`w-full rounded-lg ${ disabled && 'opacity-50' }`} 
                style={{ overflow: 'hidden', backgroundColor: theme.colors.surfaceVariant }}
            >
                <TouchRipple disabled={disabled} onPress={disabled ? () => {} : getImgCamera} style={{ flex: 1 }}>
                    <View 
                        className={`flex-1 flex justify-center items-start`}
                        style={{ padding: 15 }}
                    >
                        { foto ?  
                            <Animated.View 
                                entering={FadeIn.duration(300)} 
                                className='w-full' 
                                style={{ 
                                    paddingHorizontal: 10, paddingVertical: 12, backgroundColor: theme.colors.outline, borderRadius: 6 
                                }}
                            >
                                <View className='flex flex-row gap-2 items-center'>
                                    <Icon  source={'image'} size={20}/>
                                    <Text 
                                        numberOfLines={1}
                                        ellipsizeMode="middle"
                                        className="ml-2 flex-1"
                                        style={{ color: theme.colors.background,
                                            flexShrink: 1,
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        { foto?.uri?.split('/').pop() || '??????' }
                                    </Text>
                                    {/* menu item */}
                                    <View className='flex-row'>
                                        <MenuComponent
                                            visible={isOpenMenu}
                                            onDismiss={() => setIsOpenMenu(false)}
                                            anchor={
                                                <IconButton
                                                    disabled={disabled}
                                                    onPress={() => setIsOpenMenu(true)}
                                                    icon={'dots-vertical'}
                                                    size={22}
                                                    style={{ margin: 0, padding: 0 }}
                                                /> 
                                            }
                                        >
                                            <MenuItem title="Ver" onPress={openCarousel} leadingIcon={'eye'}/>
                                            <MenuItem title="Eliminar" onPress={removeImage} leadingIcon={'trash-can-outline'}/>
                                        </MenuComponent>
                                    </View>
                                </View>
                            </Animated.View>
                            : 
                            <View className="flex flex-row gap-3 items-center">
                                <Icon source={'camera-outline'} size={35}/>
                                <View className="flex-col justify-center">
                                    <Text style={{ color: theme.colors.primary }}>Fotografia</Text>
                                    <Text style={{ color: theme.colors.secondary }} variant="bodySmall">pulsa para usar camara</Text>
                                </View>
                            </View> 
                        }
                    </View>
                </TouchRipple>
            </View>
        </>
    )
}