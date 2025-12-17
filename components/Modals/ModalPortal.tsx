import { LOGOAPP } from "assets/Providers/ImageProvider";
import AvatarImage from "components/Avatars/AvatarImage";
import ScrollViewContainer from "components/container/ScrollViewContainer";
import React from "react";
import { View } from "react-native";
import { Divider, Modal, Portal, Text, useTheme } from "react-native-paper";
import { AppTheme } from "types/ThemeTypes";

type ModalPortalType = {
    children?: React.ReactNode;
    visible?: boolean;
    onDismiss?: (() => void) | undefined;
    paddingContainer?: number; 
    maxHeightContainer?: number;
    heightContainer?: number;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

export default function ModalPortal({
    children,
    visible = false,
    onDismiss,
    paddingContainer = 20,
    maxHeightContainer = 500,
    heightContainer = 500,
    header,
    footer
} : ModalPortalType) {

    const theme:AppTheme = useTheme() as AppTheme

    return (
        <>
            <Portal>
                <Modal 
                    visible={visible} 
                    onDismiss={onDismiss} 
                    contentContainerStyle={[
                        {
                            backgroundColor: theme.colors.background,
                            // padding: paddingContainer,
                            marginHorizontal: 20, 
                            borderRadius: 10,
                            maxHeight: maxHeightContainer,
                            height: heightContainer
                        }
                    ]}
                >
                    {
                        header && (
                            <>
                                <View className="w-full" style={{ padding: paddingContainer }}>
                                    { header }
                                </View>
                                <Divider/>
                            </>
                        )
                    }
                    <ScrollViewContainer paddingHorizontal={paddingContainer}>
                        { children }
                    </ScrollViewContainer>
                    {
                        footer && (
                            <>
                                <Divider/>
                                <View className="w-full" style={{ padding: paddingContainer }}>
                                    { footer }
                                </View>
                            </>
                        )
                    }
                </Modal>
            </Portal>  
        </>
    )
}