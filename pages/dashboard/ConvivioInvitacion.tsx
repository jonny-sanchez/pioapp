import CardContent from "components/Cards/CardContent";
import BoxImage from "components/container/BoxImage";
import ScrollViewContainer from "components/container/ScrollViewContainer";
import ButtonForm from "components/form/ButtonForm";
import PageLayout from "components/Layouts/PageLayout";
import ListItemComponent from "components/List/ListItemComponent";
import QrImgCode from "components/Qr/QrImgCode";
import Title from "components/typografy/Title";
import { View } from "react-native";
import { List, useTheme } from "react-native-paper";
import { imageConvivio2025 } from "assets/Providers/ImageProvider";
import { useEffect, useState } from "react";
import { getValueStorage, setValueStorage } from "helpers/store/storeApp";
import { UserSessionType } from "types/auth/UserSessionType";
import InfoAlert from "components/Alerts/InfoAlert";
import { AppTheme } from "types/ThemeTypes";
import TextInfo from "components/typografy/TextInfo";
import StorageConvivioType from "types/convivio/StorageConvivioType";

export default function ConvivioInvitacion() {

    const theme:AppTheme = useTheme() as AppTheme

    const [initialLoad, setInitialLoad] = useState(true)

    const [user, setUser] = useState<UserSessionType | null>(null)

    const payloadConvivio:StorageConvivioType = { asistenciaConfirmada: false, QrView: false } 

    const [convivio, setConvivio] = useState<StorageConvivioType>(payloadConvivio)

    const hadleGetUser = () => {
        const userStorage:UserSessionType = getValueStorage('user') as UserSessionType
        setUser(userStorage)
    }

    const handleGetConvivio = () => {
        let convivioStorage:StorageConvivioType = getValueStorage('convivio') as StorageConvivioType
        
        convivioStorage && setConvivio(convivioStorage)
    }

    useEffect(() => {
        if (!initialLoad) convivio && setValueStorage('convivio', convivio)
    }, [convivio])

    useEffect(() => {
        hadleGetUser()
        handleGetConvivio()
        setInitialLoad(false)
    }, [])

    return (
        <>
            <PageLayout titleAppBar="Convivio">
                <ScrollViewContainer>
                    <View className="flex flex-col items-center gap-5 mt-3">

                        <BoxImage img={imageConvivio2025} height={250} width={250}/>

                        <View>
                            <Title style={{ textAlign: 'center' }}>Convivio 2025</Title>
                            <TextInfo style={{ textAlign: 'center' }}>
                                ¡Estás cordialmente invitado al Convivio Anual 2025! ¡Te esperamos!
                            </TextInfo>
                        </View>

                        <CardContent className="w-full">
                            <ListItemComponent
                                className="w-full"
                                title="Fecha"
                                description="jueves 4 de diciembre"
                                rightElements={<List.Icon icon={'calendar'}/>}
                            />
                            <ListItemComponent
                                className="w-full"
                                title="Hora"
                                description="8:00 AM"
                                rightElements={<List.Icon icon={'clock'}/>}
                            />
                            <ListItemComponent
                                className="w-full"
                                title="Ubicacion"
                                description="Chalet bella vista villa canales"
                                rightElements={<List.Icon icon={'map'}/>}
                            />
                        </CardContent>         


                        <ButtonForm
                            className="w-full"
                            icon="check-circle"
                            buttonColor={theme.colors.success}
                            label="Confirmar asistencia."
                            onPress={() => setConvivio(prev => ({ ...prev, asistenciaConfirmada: true }))}
                        />                          

                        {/* <ButtonForm 
                            className="w-full"
                            icon="download" 
                            label="Descargar invitacion"
                        /> */}

                        {/* <View className="w-full flex flex-col items-center justify-center">
                            <View className="bg-white p-2">
                                {
                                    (user?.id_users || '') && 
                                    <QrImgCode 
                                        value={
                                            `${ user?.id_users || '' }`
                                        } 
                                        size={120}
                                    />
                                }
                            </View>
                            <InfoAlert label="Presente este Qr en el evento para consumir cualquiere tipo de alimento."/>
                        </View>  */}

                    </View>
                </ScrollViewContainer>
            </PageLayout>
        </>
    )
}