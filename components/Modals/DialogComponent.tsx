import React from 'react';
import { Dialog, Portal, Button, Text, IconButton } from 'react-native-paper';
import { View } from 'react-native';
import { AppTheme } from 'types/ThemeTypes';
import { useTheme } from 'react-native-paper';

interface DialogComponentProps {
    visible: boolean;
    title: string;
    content: string;
    icon?: string;
    acceptText?: string;
    cancelText?: string;
    onAccept: () => void;
    onCancel: () => void;
    onDismiss?: () => void;
    hideCancel?: boolean;
    acceptButtonMode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
    cancelButtonMode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
    acceptIcon?: string;
    cancelIcon?: string;
    type?: 'confirmation' | 'warning' | 'error' | 'info' | 'success';
    disabledButtonAccept?: boolean;
    loadingButtonAccept?: boolean; 
}

const DialogComponent: React.FC<DialogComponentProps> = ({
    visible,
    title,
    content,
    icon,
    acceptText = 'Aceptar',
    cancelText = 'Cancelar',
    onAccept,
    onCancel,
    onDismiss,
    hideCancel = false,
    acceptButtonMode = 'contained',
    cancelButtonMode = 'outlined',
    acceptIcon = 'check',
    cancelIcon = 'close',
    type = 'confirmation',
    disabledButtonAccept = false,
    loadingButtonAccept = false
}) => {
    const theme = useTheme() as AppTheme;

    // Configuración de iconos y colores según el tipo
    const getDialogConfig = () => {
        switch (type) {
            case 'warning':
                return {
                    defaultIcon: 'alert',
                    iconColor: theme.colors.warning || '#FF9800',
                    titleColor: theme.colors.warning || '#FF9800'
                };
            case 'error':
                return {
                    defaultIcon: 'alert-circle',
                    iconColor: theme.colors.error,
                    titleColor: theme.colors.error
                };
            case 'success':
                return {
                    defaultIcon: 'check-circle',
                    iconColor: theme.colors.primary,
                    titleColor: theme.colors.primary
                };
            case 'info':
                return {
                    defaultIcon: 'information',
                    iconColor: theme.colors.primary,
                    titleColor: theme.colors.primary
                };
            default: // confirmation
                return {
                    defaultIcon: 'help-circle',
                    iconColor: theme.colors.primary,
                    titleColor: theme.colors.onSurface
                };
        }
    };

    const config = getDialogConfig();
    const dialogIcon = icon || config.defaultIcon;

    const handleDismiss = () => {
        if (onDismiss) {
            onDismiss();
        } else {
            onCancel();
        }
    };

    return (
        <Portal>
            <Dialog 
                visible={visible} 
                onDismiss={handleDismiss}
                style={{
                    backgroundColor: theme.colors.surface,
                }}
            >
                {/* Header con icono y título */}
                <Dialog.Title 
                    style={{ 
                        color: config.titleColor,
                        textAlign: 'center',
                        paddingBottom: 8
                    }}
                >
                    <View className="flex-row items-center justify-center gap-2">
                        {dialogIcon && (
                            <IconButton
                                icon={dialogIcon}
                                size={24}
                                iconColor={config.iconColor}
                                style={{ margin: 0 }}
                            />
                        )}
                        <Text 
                            variant="titleMedium" 
                            style={{ 
                                color: config.titleColor,
                                fontWeight: '600'
                            }}
                        >
                            {title}
                        </Text>
                    </View>
                </Dialog.Title>

                {/* Contenido del diálogo */}
                <Dialog.Content>
                    <Text 
                        variant="bodyMedium" 
                        style={{ 
                            color: theme.colors.onSurface,
                            textAlign: 'center',
                            lineHeight: 22
                        }}
                    >
                        {content}
                    </Text>
                </Dialog.Content>

                {/* Botones de acción */}
                <Dialog.Actions style={{ 
                    paddingHorizontal: 24, 
                    paddingBottom: 24,
                    gap: 8,
                    justifyContent: 'space-between'
                }}>
                    {!hideCancel && (
                        <Button
                            mode={cancelButtonMode}
                            onPress={onCancel}
                            icon={cancelIcon}
                            style={{ 
                                flex: 1,
                                marginRight: hideCancel ? 0 : 4
                            }}
                            buttonColor={
                                cancelButtonMode === 'contained' 
                                    ? theme.colors.surfaceVariant 
                                    : undefined
                            }
                            textColor={
                                cancelButtonMode === 'contained'
                                    ? theme.colors.onSurfaceVariant
                                    : theme.colors.onSurface
                            }
                        >
                            {cancelText}
                        </Button>
                    )}
                    
                    <Button
                        mode={acceptButtonMode}
                        onPress={onAccept}
                        icon={acceptIcon}
                        loading={loadingButtonAccept}
                        disabled={disabledButtonAccept}
                        style={{ 
                            flex: 1,
                            marginLeft: hideCancel ? 0 : 4
                        }}
                        buttonColor={
                            acceptButtonMode === 'contained'
                                ? (type === 'error' ? theme.colors.error : theme.colors.primary)
                                : undefined
                        }
                    >
                        {acceptText}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default DialogComponent;