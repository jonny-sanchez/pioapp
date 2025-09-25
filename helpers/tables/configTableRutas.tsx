import ButtonForm from "components/form/ButtonForm"
import { NavigationService } from "helpers/navigator/navigationScreens"
import ChipDecoration from "components/decoration/ChipDecoration"
import { View } from 'react-native'
import IconButtomForm from "components/form/IconButtomForm"

const configTableRutas = [
    {
        data: 'nombre_tienda',
        name: 'Tienda'
    },
    {
        data: 'status_ruta',
        name: 'Estado',
        render: (data:any) => ( <ChipDecoration icon="progress-clock" title="Pendiente"/> )
    },
    {
        data: null,
        name: 'Acciones',
        render: (data:any) => ( 
            <View className="flex flex-row gap-1">
                {/* qrcode */}
                <IconButtomForm icon="qrcode-scan" 
                onPress={ ()=> NavigationService.navigate('ScannerQr') }
                />
                <IconButtomForm icon="eye"/>
            </View>
        )
    }
]

export default configTableRutas