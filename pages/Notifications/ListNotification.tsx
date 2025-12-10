import Accordion from "components/Accordion/Accordion";
import ScrollViewContainer from "components/container/ScrollViewContainer";
import PageLayout from "components/Layouts/PageLayout";
import FlatListVirtualize from "components/List/FlatListVirtualize";
import ListItemComponent from "components/List/ListItemComponent";
import ListSubheader from "components/List/ListSubheader";
import TouchRipple from "components/Touch/TouchRipple";
import React, { useState } from "react";
import { View } from "react-native";
import { Badge, useTheme } from "react-native-paper";
import { AppTheme } from "types/ThemeTypes";
import ModalDetailNotification from "./Layouts/ModalDetailNotification";

export default function ListNotification () {

    const theme:AppTheme = useTheme() as AppTheme

    const [accordionHoy, setAccordionHoy] = useState<boolean>(true);

    const [portalModal, setPortalModal] = useState<boolean>(false);

    const handleToggleAccordionHoy = () => setAccordionHoy(!accordionHoy)

    const handleCloseTogglePortalModal = () => setPortalModal(false)

    const handleOpenTogglePortalModal = () => {
        setPortalModal(true)
    }

    return (
        <>
            <ModalDetailNotification 
                handleCloseTogglePortalModal={handleCloseTogglePortalModal} 
                portalModal={portalModal}
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

                        <Accordion title="Hoy (1)" expanded={accordionHoy} onPress={handleToggleAccordionHoy}>
                            <ListSubheader label="Tareas supervisor"/>
                            {/* Para cuando no ha leido una notificacion */}
                            <TouchRipple onPress={handleOpenTogglePortalModal}>
                                <View className="w-full flex flex-row">
                                    <View style={{
                                       width: 3,
                                       height: '100%',
                                       backgroundColor: theme.colors.primary 
                                    }}></View>
                                    <ListItemComponent 
                                        styleList={{ width: '100%' }}
                                        iconLeft="bell"
                                        title="SAN PEDRO SAN MARCOS" 
                                        titleStyle={{ color: theme.colors.primary }}
                                        description="Revision de insumos e inventario"
                                        rightElements={
                                            <View className="justify-center">
                                                <Badge size={15}/>
                                            </View>
                                        }
                                    />
                                </View>
                            </TouchRipple>

                            {/* para cuando ya leyo la notificacion */}
                            <ListSubheader label="Aviso"/>
                            <TouchRipple onPress={() => {}}>
                                <View className="w-full flex flex-row">
                                    <View style={{
                                       width: 3,
                                       height: '100%',
                                    //    backgroundColor: theme.colors.primary 
                                    }}></View>
                                    <ListItemComponent 
                                        styleList={{ width: '100%' }}
                                        iconLeft="bell"
                                        title="SAN PEDRO SAN MARCOS" 
                                        // titleStyle={{ color: theme.colors.primary }}
                                        description="Revision de insumos e inventario"
                                        rightElements={
                                            <View className="justify-center">
                                                <Badge size={15} style={{ backgroundColor: theme.colors.success }}/>
                                            </View>
                                        }
                                    />
                                </View>
                            </TouchRipple>

                        </Accordion>

                        <Accordion title="Anteriores (30)">
                            {
                                <FlatListVirtualize
                                    scrollEnabled={false}
                                    data={Array(30).fill(null)}
                                    keyExtractor={(_, i) => i.toString()}
                                    renderItem={({ item, index }) => (
                                        <TouchRipple key={index} onPress={() => {}}>
                                            <View className="w-full flex flex-row">
                                                <View style={{
                                                   width: 3,
                                                   height: '100%',
                                                   backgroundColor: theme.colors.primary 
                                                }}></View>
                                                <ListItemComponent 
                                                    styleList={{ width: '100%' }}
                                                    iconLeft="bell"
                                                    title="SAN PEDRO SAN MARCOS" 
                                                    titleStyle={{ color: theme.colors.primary }}
                                                    description="Revision de insumos e inventario"
                                                    rightElements={
                                                        <View className="justify-center">
                                                            <Badge size={15}/>
                                                        </View>
                                                    }
                                                />
                                            </View>
                                        </TouchRipple>
                                    )}
                                />
        
                            }
                        </Accordion>

                    </View>
                </ScrollViewContainer>
            </PageLayout>
        </>
    )
}