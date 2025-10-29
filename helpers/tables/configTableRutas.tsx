import ButtonForm from "components/form/ButtonForm"
import { NavigationService } from "helpers/navigator/navigationScreens"
import ChipDecoration from "components/decoration/ChipDecoration"
import { View } from 'react-native'
import IconButtomForm from "components/form/IconButtomForm"
import RutasListType from "types/Rutas/RutasListType"

const configTableRutas = [
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
    // {
    //     data: 'cantidad',
    //     name: 'Cantidad',
    // },
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
]

export default configTableRutas