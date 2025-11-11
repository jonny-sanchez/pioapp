import { NavigationService } from "helpers/navigator/navigationScreens"
import { View } from 'react-native'
import IconButtomForm from "components/form/IconButtomForm"
import RutasListType from "types/Rutas/RutasListType"
import ConfigFile from "types/tables/ConfigFile"
import AvatarIcon from "components/Avatars/AvatarIcon"
import { AppTheme } from "types/ThemeTypes"

const configTableRutas = (
    theme: AppTheme,
    reloadRutasController: () => Promise<any>,
    reloadRutas: boolean
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
        render: (data:RutasListType) => (
            <AvatarIcon 
                icon={data.recepccionada != 0 ? 'truck-check' : 'truck-delivery'} 
                style={{ 
                    backgroundColor: data.recepccionada != 0 ? theme.colors.success : theme.colors.warning, 
                }}
                size={30}
            />
        )
    },
    {
        data: null,
        name: 'Acciones',
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
                    icon="reload"  
                    onPress={ () => reloadRutasController() }
                    loading={reloadRutas}
                    disabled={reloadRutas || data.recepccionada != 0}
                />
            </View>
        )
    }
] as ConfigFile[]

export default configTableRutas