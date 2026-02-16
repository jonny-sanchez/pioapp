import { NavigationService } from "helpers/navigator/navigationScreens"
import { View } from 'react-native'
import IconButtomForm from "components/form/IconButtomForm"
import RutasListType from "types/Rutas/RutasListType"
import ConfigFile from "types/tables/ConfigFile"
import AvatarIcon from "components/Avatars/AvatarIcon"
import { AppTheme } from "types/ThemeTypes"
import { IconButton } from "react-native-paper"

const configTableRutas = (
    theme: AppTheme,
    // reloadRutasController: () => Promise<any>,
    // reloadRutas: boolean,
    onPressBtnWaze: (ruta:RutasListType) => void,
    onPressRecepcion: () => void
) => [
    {
        data: 'no_ruta',
        name: 'Ruta',
    },
    {
        data: 'serie',
        name: 'Serie',
    },
    {
        data: null,
        name: 'Estado',
        // numericHeader: true,
        // onPressCell: (data:RutasListType) => { console.log(data) },
        render: (data:RutasListType) => {
            const isRecepcionada = data.recepccionada != 0
            return (
                <View className="flex-row gap-1 items-center">
                    <AvatarIcon 
                        icon={isRecepcionada ? 'truck-check' : 'truck-delivery'} 
                        style={{ 
                            backgroundColor: isRecepcionada ? theme.colors.success : theme.colors.warning, 
                        }}
                        size={33}
                        trigger={data?.animated??undefined}
                        // onPress={() => { console.log(data) }}
                    />
                    {/* { 
                        isRecepcionada &&
                            <IconButton 
                                icon={'chevron-up'}  
                                onPress={onPressRecepcion}
                                mode="outlined"
                                style={{ margin: 0 }}
                                size={12}
                                animated
                            />
                    } */}
                </View>
            )
        }
    },
    {
        data: null,
        name: 'Acciones',
        // numericHeader: true,
        // numeric: true,
        render: (data:RutasListType) => ( 
            <View className="flex flex-row gap-1">
                {/* qrcode */}
                <IconButtomForm 
                    style={{ margin: 0 }}
                    disabled={data.recepccionada != 0}
                    icon="qrcode-scan" 
                    onPress={ ()=> NavigationService.navigate('QrRutas', { rutas: data }) }
                />
                <IconButtomForm
                    style={{ margin: 0 }}
                    icon="navigation"
                    containerColor={theme.colors.skyBlue}
                    onPress={() => onPressBtnWaze(data)}
                />
                {/* <IconButtomForm
                    style={{ margin: 0 }}
                    icon="reload"  
                    onPress={ () => reloadRutasController() }
                    loading={reloadRutas}
                    disabled={reloadRutas || data.recepccionada != 0}
                /> */}
            </View>
        )
    }
] as ConfigFile[]

export default configTableRutas