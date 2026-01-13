import globalState from 'helpers/states/globalState'
import { View, Pressable } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'
import { openCamera, permissionCamera } from 'helpers/camara/cameraHelper'
import { useEffect, useState } from 'react'
import alertsState from 'helpers/states/alertsState'
import TouchRipple from 'components/Touch/TouchRipple'

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

    const { openVisibleSnackBar } = alertsState()

    const [ foto, setFoto ] = useState<any>(null)

    const getImgCamera = async () => {

        try {

            setOpenScreenLoading()

            const cameraPermisos = await permissionCamera()

            if(!cameraPermisos) throw new Error(`Ooops. ocurrio un error con los permisos de la camara.`);

            const resultImg:any = await openCamera()

            if(!resultImg) throw new Error(`Ooops. ocurrio un error al obtener la imagen.`);

            setFoto(resultImg)

            if(onSelectFile) onSelectFile(resultImg)
            
        } catch (error) {
            return openVisibleSnackBar(`${error}`, 'error')
        } finally {
            setCloseScreenLoading()
        }

    }

    useEffect(() => { 
        if(onSelectFile) onSelectFile(null) 
    }, [])

    return (
        // <Pressable onPress={disabled ? () => {} : getImgCamera}>
        <View 
            className={`w-full rounded-lg ${ disabled && 'opacity-50' }`} 
            style={{ 
                overflow: 'hidden',
                backgroundColor: theme.colors.surfaceVariant
            }}
        >
            <TouchRipple onPress={disabled ? () => {} : getImgCamera} style={{ flex: 1 }}>
                <View 
                    className={`flex-1 flex justify-center items-start`}
                    style={{ padding: 15 }}
                >
                    { foto ?  
                        <View className='w-full rounded-lg' style={{ padding: 10, backgroundColor: theme.colors.outline }}>
                            <View className='flex flex-row gap-3 items-center'>
                                <Icon  source={'image'} size={20}/>
                                <Text 
                                    style={{ 
                                        color: theme.colors.background,
                                        flexShrink: 1,
                                        flexWrap: 'wrap'
                                    }}
                                >{ foto?.uri?.split('/').pop() || '??????' }</Text>
                            </View>
                        </View>
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
            {/* </Pressable> */}
            </TouchRipple>
        </View>
    )
}