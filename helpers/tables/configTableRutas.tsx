import { NavigationService } from "helpers/navigator/navigationScreens"
import { View } from 'react-native'
import IconButtomForm from "components/form/IconButtomForm"
import RutasListType from "types/Rutas/RutasListType"
import ConfigFile from "types/tables/ConfigFile"
import AvatarIcon from "components/Avatars/AvatarIcon"
import { AppTheme } from "types/ThemeTypes"

const configTableRutas = (
    theme: AppTheme
) => [
    // {
    //     data: 'status_ruta',
    //     name: 'Estado',
    //     render: (data:any) => ( <ChipDecoration icon="progress-clock" title="Pendiente"/> )
    // },
    {
        data: 'no_ruta',
        name: 'Ruta',
    },
    {
        data: 'id_pedido',
        name: 'Ticket',
    },
    {
        data: null,
        name: 'Estado',
        render: (data:RutasListType) => (
            <AvatarIcon 
                icon={data.recepccionada != 0 ? 'truck-check' : 'truck-delivery'} 
                style={{ backgroundColor: data.recepccionada != 0 ? theme.colors.success : theme.colors.warning }}
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
                <IconButtomForm icon="qrcode-scan" 
                    onPress={ ()=> NavigationService.navigate('QrRutas', { rutas: data }) }
                />
                {/* <IconButtomForm icon="eye"/> */}
            </View>
        )
    }
] as ConfigFile[]

export default configTableRutas