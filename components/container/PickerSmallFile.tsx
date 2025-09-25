import globalState from 'helpers/states/globalState'
import { View, Pressable } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'
import { openCamera, permissionCamera } from 'helpers/camara/cameraHelper'
import { useState } from 'react'

type PickerSmallFileProps = {
    disabled?: boolean;
}

export default function PickerSmallFile({
    disabled = false
} : PickerSmallFileProps) {

    const theme = useTheme()

    const { setOpenScreenLoading, setCloseScreenLoading } = globalState()

    const [ foto, setFoto ] = useState<any>(null)

    const getImgCamera = async () => {
    
        const cameraPermisos = await permissionCamera()

        if(!cameraPermisos) return

        setOpenScreenLoading()

        const resultImg:any = await openCamera()

        setCloseScreenLoading()

        if(!resultImg) return

        setFoto(resultImg)

    }

    return (
        <Pressable onPress={disabled ? () => {} : getImgCamera}>
            <View 
                className={`w-full rounded-lg flex justify-center items-start ${ disabled && 'opacity-50' }`}
                style={{ backgroundColor: theme.colors.surfaceVariant, padding: 15 }}
            >
                { foto ?  
                    <View className='w-full rounded-lg' style={{ padding: 10, backgroundColor: theme.colors.onSurfaceVariant }}>
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
        </Pressable>
    )
}