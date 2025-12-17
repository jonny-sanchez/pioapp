import Accordion from "components/Accordion/Accordion";
import ScrollViewContainer from "components/container/ScrollViewContainer";
import PageLayout from "components/Layouts/PageLayout";
import FlatListVirtualize from "components/List/FlatListVirtualize";
import ListItemComponent from "components/List/ListItemComponent";
import ListSubheader from "components/List/ListSubheader";
import TouchRipple from "components/Touch/TouchRipple";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Badge, Icon, Text, useTheme } from "react-native-paper";
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
import ChipDecoration from "components/decoration/ChipDecoration";
import TextInfo from "components/typografy/TextInfo";
import Title from "components/typografy/Title";
import NotificationLayout from "./Layouts/NotificationLayout";
import SkeletonNotifications from "./Layouts/SkeletonNotifications";

export default function ListNotification () {

    const theme:AppTheme = useTheme() as AppTheme
    const { openVisibleSnackBar } = alertsState()
    const { notificacionesToday, loadingNotificationToday, setloadingNotificationToday } = notificationState()
    const [notificationSelectActual, setNotificationSelectActual] = useState<NotificacionAppType|null>(null)
    // const [accordionHoy, setAccordionHoy] = useState<boolean>(true);
    const [portalModal, setPortalModal] = useState<boolean>(false);
    const notificacionesHoyNoLeidas:number = notificacionesToday?.filter(({ leido }) => !leido)?.length ?? 0
    const [chipSelect, setChipSelect] = useState<'hoy'|'anteriores'>('hoy')
    const notisNoLeidasText = notificacionesHoyNoLeidas > 0 ? `(${notificacionesHoyNoLeidas})` : ''

    // const handleToggleAccordionHoy = () => setAccordionHoy(!accordionHoy)

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
        setloadingNotificationToday(true)
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
                    {
                        loadingNotificationToday 
                            ? <SkeletonNotifications/>
                            :
                            <View className="w-full mt-6 mb-10">
                                {/* Chip filters */}
                                <View className="w-full flex-row gap-2 mb-8">
                                    <ChipDecoration 
                                        title="Hoy" 
                                        mode="flat" 
                                        icon={chipSelect === 'hoy' ? 'check' : ''} 
                                        onPress={() => setChipSelect('hoy')}
                                        style={{ backgroundColor: theme.colors.surfaceVariant }}
                                    />
                                    <ChipDecoration 
                                        title="Anteriores" 
                                        mode="flat" 
                                        icon={chipSelect === 'anteriores' ? 'check' : ''} 
                                        onPress={() => setChipSelect('anteriores')}
                                        style={{ backgroundColor: theme.colors.surfaceVariant }}
                                    />
                                </View>
                                <Text  
                                    variant="titleMedium"
                                    style={{ color: theme.colors.primary, marginBottom: 15, }}
                                >
                                    { chipSelect === 'hoy' && `Hoy ${ notisNoLeidasText }` }
                                    { chipSelect === 'anteriores' && `Anteriores` }
                                </Text>

                                { chipSelect === 'hoy' && 
                                    <NotificationLayout 
                                        notifications={notificacionesToday} 
                                        onPressNoti={(item) => handleOpenTogglePortalModal(item)}
                                    /> 
                                }

                                { chipSelect === 'anteriores' && 
                                    <NotificationLayout 
                                        notifications={[]} 
                                        onPressNoti={(item) => handleOpenTogglePortalModal(item)}
                                    /> 
                                }

                            </View>
                    }
                    
                </ScrollViewContainer>
            </PageLayout>
        </>
    )
}