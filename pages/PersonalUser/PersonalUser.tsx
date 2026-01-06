import { DEFAULT_USER, LOGOAPP } from "assets/Providers/ImageProvider";
import AvatarImage from "components/Avatars/AvatarImage";
import ScrollViewContainer from "components/container/ScrollViewContainer";
import IconButtomForm from "components/form/IconButtomForm";
import PageLayout from "components/Layouts/PageLayout";
import ListItemComponent from "components/List/ListItemComponent";
import ListSubheader from "components/List/ListSubheader";
import SwitchComponent from "components/Switch/SwitchComponent";
import TouchRipple from "components/Touch/TouchRipple";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, SwitchChangeEvent, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Divider, List, Text, useTheme } from "react-native-paper";
import { AppTheme } from "types/ThemeTypes";
import ModalizeUser from "./Layouts/ModalizeUser";
import SkeletonUser from "./Layouts/SkeletonUser";
import { getCameraPermission, permissionCamera } from "helpers/camara/cameraHelper";
import { PermissionStatus as PermissionStatusCamara  } from 'expo-image-picker'
import { PermissionStatus as PermissionStatusLocation } from 'expo-location'
import { PermissionStatus as PermissionStatusNotification } from 'expo-notifications'
import { useForm } from "react-hook-form";
import { getLocationPermission, locationPermission } from "helpers/ubicacion/ubicacionHelper";
import { getNotificationPermission, notificationPermissionGranted } from "helpers/Notification/NotificationPushHelper";
import schemaPerfilUser from "helpers/validatesForm/schemaPerfilUser";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Linking from 'expo-linking';
import { useFocusEffect } from "@react-navigation/native";
import { onOpenModalize } from "helpers/Modalize/ModalizeHelper";
import ModalizeBiometric from "./Layouts/ModalizeBiometric";
import { checkBiometricStatus } from "helpers/Biometric/BiometricHelper";
import { BiometricStatus } from "types/Biometric/BiometricTypes";
import alertsState from "helpers/states/alertsState";
import { getValueStorage } from "helpers/store/storeApp";
import { UserSessionType } from "types/auth/UserSessionType";

export default function PersonalUser() {

    const theme:AppTheme = useTheme() as AppTheme
    const appState = useRef(AppState.currentState);
    const modalizeRefUser = useRef<Modalize>(null)
    const modalizeRefBiometric = useRef<Modalize>(null)
    const [loadingUser, setLoadingUser] = useState<boolean>(false)
    const [biometricStatus, setBiometricStatus] = useState<BiometricStatus|null>(null)
    const [userSession, setUserSession] = useState<UserSessionType>()
    const { openVisibleSnackBar } = alertsState()
    const { control, handleSubmit, reset, resetField, formState: { errors, isValid }, watch } = useForm({
        resolver: yupResolver(schemaPerfilUser),
        mode: 'all'
    })
    const [permisos, setPermisos] = useState({
        camera: null as PermissionStatusCamara | null,
        location: null as PermissionStatusLocation | null,
        notification: null as PermissionStatusNotification | null,
        ts: Date.now(),
    })

    const onPressIconButtonEditImage = () => {
        onOpenModalize(modalizeRefUser)
    }

    const onPressListBiometric = () => {
        if(!biometricStatus?.enrolled) 
            return openVisibleSnackBar(`Ooops. primero debes configurar un biometrico en tu dispositivo.`, 'warning')
        onOpenModalize(modalizeRefBiometric)
    }

    const openSettings = () => Linking.openSettings()

    const onChangeSwitchPermissions = async (value:boolean, type:'location'|'camera'|'notification') => {
        openSettings()
        // if(!value) return openSettings()
        // if(value && type === 'location') await locationPermission()
        // if(value && type === 'camera') await permissionCamera()
        // if(value && type === 'notification') await notificationPermissionGranted()
        // await init()
    }

    const getUserStorage = () => {
        const user = getValueStorage('user') as UserSessionType
        setUserSession(user)
    }

    const init = async() => {
        setLoadingUser(true)
        getUserStorage()
        const statusBiometric = await checkBiometricStatus()
        const camera = await getCameraPermission()
        const location = await getLocationPermission()
        const notification = await getNotificationPermission()
        setPermisos({camera,location,notification, ts: Date.now()})
        setBiometricStatus(statusBiometric)
        setLoadingUser(false)
    }

    useEffect(() => {
        resetField('switch_camara', { defaultValue: permisos.camera === 'granted' })
        resetField('switch_ubicacion', { defaultValue: permisos.location === 'granted' })
        resetField('switch_notificaciones', { defaultValue: permisos.notification === 'granted' })
    }, [permisos.ts])

    useEffect(() => {
      const sub = AppState.addEventListener('change', nextState => {
        if (appState.current.match(/inactive|background/) && nextState === 'active') init()
        appState.current = nextState
      })
      return () => sub.remove()
    }, []);

    useEffect(() => { init() }, [])

    return (
        <>
            {/* Modalize para usuario */}
            <ModalizeUser
                modalizeRefUser={modalizeRefUser}
            />

            {/* Modalize para biometrico */}
            <ModalizeBiometric
                modalizeRefBiometric={modalizeRefBiometric}
            />

            <PageLayout 
                titleAppBar="Perfil" 
                menuApp={false}
                notification={false}
                themeApp={false}
                goBack={true}
            >
                <ScrollViewContainer>
                    {
                        loadingUser 
                        ? <SkeletonUser/>
                        :
                        <View className="mt-6 mb-12 w-full flex-col gap-5">
                            <View className="w-full flex-col items-center">
                                <View style={{ position: 'relative' }}>
                                    {/* <IconButtomForm 
                                        icon="pencil" 
                                        size={13} 
                                        style={{ position: 'absolute', zIndex: 2, right: -5, top: -5 }}
                                        onPress={onPressIconButtonEditImage}
                                    /> */}
                                    <AvatarImage 
                                        style={{ marginBottom: 15 }} 
                                        img={DEFAULT_USER} 
                                        size={100}
                                    />
                                </View>
                                <Text style={{ color: theme.colors.primary }}>{ userSession?.codigo_user ?? " -- " }</Text>
                                <Text>
                                    { 
                                        `${userSession?.first_name??""} ${userSession?.second_name??""} ${userSession?.first_last_name??""} ${userSession?.second_last_name??""}` 
                                    }
                                </Text>
                                <Text style={{ color: theme.colors.secondary }}>{ userSession?.puesto_trabajo??"--" }</Text>
                            </View>

                            <Divider/>

                            <View className="w-full">
                                <ListSubheader label="Personal"/>

                                <ListItemComponent
                                    onPress={() => {
                                        openVisibleSnackBar(`Proximamente en actualizaciones mas recientes.`, 'normal')
                                    }}
                                    iconLeft="microsoft"
                                    title={"Cuenta office 365"}
                                    description={"vincular cuenta"}
                                    rightElements={<List.Icon icon={'chevron-right'}/>}
                                />
                                {
                                    biometricStatus?.hasHardware && (
                                        <ListItemComponent
                                            onPress={onPressListBiometric}
                                            iconLeft="fingerprint"
                                            title={"Biometrico"}
                                            description={"Configurar biometrico"}
                                            rightElements={<List.Icon icon={'chevron-right'}/>}
                                        />
                                    )
                                }

                            </View>

                            {/* Configurar permisso */}
                            <View className="w-full flex-col">
                                <ListSubheader label="Permisos"/>
                                <ListItemComponent
                                    title="Ubicacion"
                                    description={"Permisos de ubicacion"}
                                    rightElements={
                                        <SwitchComponent 
                                            control={control} 
                                            name="switch_ubicacion"
                                            onExternalChange={(value) => onChangeSwitchPermissions(value, 'location')}
                                        />
                                    }
                                />
                                <ListItemComponent
                                    title="Camara"
                                    description={"Permisos de camara"}
                                    rightElements={
                                        <SwitchComponent 
                                            control={control} 
                                            name="switch_camara"
                                            onExternalChange={(value) => onChangeSwitchPermissions(value, 'camera')}
                                        />
                                    }
                                />
                                <ListItemComponent
                                    title="Notificaciones"
                                    description={"Permisos de notificaciones"}
                                    rightElements={
                                        <SwitchComponent 
                                            control={control} 
                                            name="switch_notificaciones"
                                            onExternalChange={(value) => onChangeSwitchPermissions(value, 'notification')}
                                        />
                                    }
                                />
                            </View>

                        </View>

                    }

                </ScrollViewContainer>
            </PageLayout>
        </>
    )

}