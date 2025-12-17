import { DEFAULT_USER, LOGOAPP } from "assets/Providers/ImageProvider";
import AvatarImage from "components/Avatars/AvatarImage";
import ScrollViewContainer from "components/container/ScrollViewContainer";
import IconButtomForm from "components/form/IconButtomForm";
import PageLayout from "components/Layouts/PageLayout";
import ListItemComponent from "components/List/ListItemComponent";
import ListSubheader from "components/List/ListSubheader";
import SwitchComponent from "components/Switch/SwitchComponent";
import TouchRipple from "components/Touch/TouchRipple";
import { useEffect } from "react";
import { SwitchChangeEvent, View } from "react-native";
import { Divider, List, Text, useTheme } from "react-native-paper";
import { AppTheme } from "types/ThemeTypes";

export default function PersonalUser() {

    const theme:AppTheme = useTheme() as AppTheme

    const handleOnChangeUbicacionPermisos = (e:SwitchChangeEvent) => {
        console.log(e.nativeEvent.value)
    }

    const init = () => {
        
    }

    useEffect(() => { init() }, [])

    return (
        <>
            <PageLayout 
                titleAppBar="Perfil" 
                menuApp={false}
                notification={false}
                themeApp={false}
                goBack={true}
            >
                <ScrollViewContainer>
                    <View className="my-6 w-full flex-col gap-5">

                        <View className="w-full flex-col items-center">
                            <View style={{ position: 'relative' }}>
                                <IconButtomForm icon="pencil" size={10} style={{ position: 'absolute', zIndex: 2, right: -5, top: -5 }}/>
                                <AvatarImage style={{ marginBottom: 15 }} img={DEFAULT_USER} size={100}/>
                            </View>
                            <Text style={{ color: theme.colors.primary }}>AL5117</Text>
                            <Text>Diego Alejandro Guevar Cordon</Text>
                            <Text style={{ color: theme.colors.secondary }}>Desarrollador</Text>
                        </View>

                        <Divider/>

                        <View className="w-full">
                            <ListSubheader label="Personal"/>
                            <TouchRipple onPress={() => {}}>
                                <ListItemComponent
                                    iconLeft="google"
                                    title={"Cuenta google"}
                                    description={"vincular cuenta"}
                                    rightElements={<List.Icon icon={'chevron-right'}/>}
                                />
                            </TouchRipple>
                        </View>
                        
                        {/* Configurar permisso */}
                        <View className="w-full flex-col">
                            <ListSubheader label="Permisos"/>
                            <ListItemComponent
                                title="Ubicacion"
                                description={"Permisos de ubicacion"}
                                rightElements={<SwitchComponent onChange={handleOnChangeUbicacionPermisos}/>}
                            />
                            <ListItemComponent
                                title="Camara"
                                description={"Permisos de camara"}
                                rightElements={<SwitchComponent onChange={handleOnChangeUbicacionPermisos}/>}
                            />
                            <ListItemComponent
                                title="Notificaciones"
                                description={"Permisos de notificaciones"}
                                rightElements={<SwitchComponent onChange={handleOnChangeUbicacionPermisos}/>}
                            />
                        </View>

                    </View>
                </ScrollViewContainer>
            </PageLayout>
        </>
    )

}