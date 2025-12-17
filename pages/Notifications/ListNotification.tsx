import Accordion from "components/Accordion/Accordion";
import ScrollViewContainer from "components/container/ScrollViewContainer";
import PageLayout from "components/Layouts/PageLayout";
import FlatListVirtualize from "components/List/FlatListVirtualize";
import ListItemComponent from "components/List/ListItemComponent";
import ListSubheader from "components/List/ListSubheader";
import TouchRipple from "components/Touch/TouchRipple";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Badge, useTheme } from "react-native-paper";
import { AppTheme } from "types/ThemeTypes";
import ModalDetailNotification from "./Layouts/ModalDetailNotification";
import { getValueStorage } from "helpers/store/storeApp";
import { UserSessionType } from "types/auth/UserSessionType";
import { disconnectSocketNotification, initSocketNotification } from "Sockets/Notificaciones/NotificacionesSocket";
import notificationState from "helpers/states/notificationState";
import NotificacionAppType from "types/Notificaciones/NotificacionAppType";
import { generateJsonError, ResponseService } from "types/RequestType";
import alertsState from "helpers/states/alertsState";
import { AJAX, URLPIOAPP } from "helpers/http/ajax";

export default function ListNotification () {

    const theme:AppTheme = useTheme() as AppTheme

    const { openVisibleSnackBar } = alertsState()

    const { notificacionesToday } = notificationState()

    const [notificationSelectActual, setNotificationSelectActual] = useState<NotificacionAppType|null>(null)

    const [accordionHoy, setAccordionHoy] = useState<boolean>(true);

    const [portalModal, setPortalModal] = useState<boolean>(false);

    const notificacionesHoyNoLeidas:number = notificacionesToday?.filter(({ leido }) => !leido)?.length ?? 0

    const handleToggleAccordionHoy = () => setAccordionHoy(!accordionHoy)

    const handleCloseTogglePortalModal = () => setPortalModal(false)

    const postMarkedReadNotification = async (id_notificacion_app:number) : Promise<ResponseService<NotificacionAppType>> => {
        try {
            const result = await AJAX(`${URLPIOAPP}/notificaciones/read`, 'POST', {
                id_notificacion_app
            })
            return result
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
            return generateJsonError(`${error}`, 'object')
        }
    }

    const handleOpenTogglePortalModal = async (data:NotificacionAppType) => {
        setNotificationSelectActual({...data})
        setPortalModal(true)
        !data.leido && await postMarkedReadNotification(data.id_notificacion_app)
    }

    const getTokenAuth = () : string => {
        const user:UserSessionType = getValueStorage('user') as UserSessionType
        return `${user.token}`
    }

    const init = async() => {
        const token = getTokenAuth()
        initSocketNotification(token)
    }

    useEffect(() => {
        init()
        return () => disconnectSocketNotification()
    }, [])

    return (
        <>
            <ModalDetailNotification 
                handleCloseTogglePortalModal={handleCloseTogglePortalModal} 
                portalModal={portalModal}
                notificationSelectActual={notificationSelectActual}
            />

            <PageLayout 
                titleAppBar="Notificaciones" 
                menuApp={false} 
                notification={false} 
                themeApp={false} 
                goBack={true}
            >
                <ScrollViewContainer paddingHorizontal={25}>
                    <View className="w-full my-6">

                        <Accordion 
                            title={`Hoy ${notificacionesHoyNoLeidas > 0 ? `(${notificacionesHoyNoLeidas})` : ''}`} 
                            expanded={accordionHoy} 
                            onPress={handleToggleAccordionHoy}
                        >
                            
                            <FlatListVirtualize
                                data={notificacionesToday}
                                keyExtractor={(_, i) => i.toString()}
                                scrollEnabled={false}
                                renderItem={({ item, index }: { item: NotificacionAppType; index: number }) => (
                                    <>
                                        <ListSubheader label={item.AsuntoNotificacionModel.name_asunto}/>
                                        <TouchRipple onPress={() => handleOpenTogglePortalModal(item)}>
                                            <View className="w-full flex flex-row">
                                                <View style={{
                                                   width: 3,
                                                   height: '100%',
                                                   ...(item.leido ? {} : { backgroundColor: theme.colors.primary  })
                                                }}></View>
                                                <ListItemComponent 
                                                    styleList={{ width: '100%' }}
                                                    iconLeft="bell"
                                                    title={item.title} 
                                                    titleStyle={{ ...(item.leido ? { } : { color: theme.colors.primary }) }}
                                                    description={item.body}
                                                    rightElements={
                                                        <View className="justify-center">
                                                            <Badge 
                                                                size={15} 
                                                                style={{ 
                                                                    backgroundColor: 
                                                                        item.leido 
                                                                            ? theme.colors.success
                                                                            : theme.colors.error
                                                                }}
                                                            />
                                                        </View>
                                                    }
                                                />
                                            </View>
                                        </TouchRipple>
                                    </>
                                )}
                            />

                        </Accordion>

                        <Accordion title="Anteriores">
                        </Accordion>

                    </View>
                </ScrollViewContainer>
            </PageLayout>
        </>
    )
}