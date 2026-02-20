import ButtonForm from "components/form/ButtonForm"
import TextInfo from "components/typografy/TextInfo"
import Title from "components/typografy/Title"
import { NavigationService } from "helpers/navigator/navigationScreens"
import { View } from "react-native"
import { Icon } from "react-native-paper"

export default function UserDeactivated() {

    const handlePressButtonReturn = () => {
        NavigationService.reset('Login')
    }

    return (
        <View 
            className="flex-1 w-full h-full flex flex-col items-center justify-center gap-3" 
            style={{ padding: 35 }}
        >
            <Icon source={'account-cancel-outline'} size={90}/>

            <Title>Acceso Denegado</Title>

            <TextInfo style={{ textAlign: 'center' }}>
                Lo sentimos, tu usuario se encuentra de baja y ya no está activo.
            </TextInfo>

            <ButtonForm 
                icon="arrow-left" 
                label="Regresar al Login"
                onPress={handlePressButtonReturn}
            />
        </View>
    )
}
