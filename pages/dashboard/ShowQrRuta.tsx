import BoxImage from "components/container/BoxImage";
import PageLayout from "components/Layouts/PageLayout";
import TextInfo from "components/typografy/TextInfo";
import Title from "components/typografy/Title";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

export default function ShowQrRuta() {

    const theme = useTheme()

    return (
        <>
            <PageLayout titleAppBar="Qr Ruta" goBack={true}>

                <View className="flex-1 justify-center items-center gap-10" style={{ paddingHorizontal: 35 }}>

                    <BoxImage width={250} height={250} img={require('assets/images/QRPrueba.jpg')}/>

                    <View className="flex flex-col items-center justify-center">
                        <Title>ZACAPA 1</Title>
                        <TextInfo style={{ padding: 10, textAlign: "center" }}>Muestra este QR al colaborador de Tienda</TextInfo>
                    </View>

                </View>

            </PageLayout>
        </>
    )
}