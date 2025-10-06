import ButtonForm from "components/form/ButtonForm";
import PageLayout from "components/Layouts/PageLayout";
import { View } from "react-native";
import { useTheme, Icon, Text, Badge } from "react-native-paper";
import { useEffect, useState } from "react";
import TextInfo from "components/typografy/TextInfo";
import Title from "components/typografy/Title";
import { locationPermission, getLocation } from "helpers/ubicacion/ubicacionHelper";
import { AppTheme } from "types/ThemeTypes";

export default function Marcaje() {

    const theme = useTheme() as AppTheme
    const [ loadingMarcaje, setLoadingMarcaje ] = useState<boolean>(false)
    const [ tipoMarcaje, setTipoMarcaje ] = useState<'entrada' | 'salida'>('entrada')
    const isEntrada = tipoMarcaje === 'entrada'

    const handlePressBtnMarcar = async()=>{
        const locationPermisos = await locationPermission()

        if(!locationPermisos) return

        setLoadingMarcaje(true)

        const location = await getLocation()

        setLoadingMarcaje(false)

        if(!location) return

        setTipoMarcaje('salida')
    }

    return (
        <>
            <PageLayout goBack={true} titleAppBar="Marcaje" menuApp={false}>
                <View className="flex-1 flex justify-center items-center px-[35]">

                    <View 
                        className="w-full flex flex-col items-center justify-content-center"
                        style={{ gap: 10 }}
                    >
                        <Icon 
                            size={100} 
                            source={isEntrada ? 'gesture-tap-button' : 'exit-run'}
                        />
                        <View className="relative">
                            <Title>
                                { isEntrada ? 'Entrada' : 'Salida'}
                            </Title>
                            <Badge 
                                size={15} 
                                style={{ backgroundColor: isEntrada ? theme.colors.success : theme.colors.error }} 
                                className='absolute top-[1] right-[-17]'
                            />
                        </View>

                        <TextInfo>
                            Pulsa para marcar la { tipoMarcaje }.
                        </TextInfo>
                        <ButtonForm 
                            loading={loadingMarcaje}
                            disabled={loadingMarcaje}
                            label="Marcar"
                            onPress={handlePressBtnMarcar}
                        />
                    </View>

                </View>
            </PageLayout>
        </>
    )
}