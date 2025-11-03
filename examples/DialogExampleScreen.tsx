import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import DialogComponent from 'components/Modals/DialogComponent';
import { AppTheme } from 'types/ThemeTypes';

const DialogExampleScreen = () => {
    const theme = useTheme() as AppTheme;
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showWarningDialog, setShowWarningDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showInfoDialog, setShowInfoDialog] = useState(false);

    return (
        <View style={{ padding: 20, gap: 16 }}>
            <Text variant="headlineMedium" style={{ color: theme.colors.onSurface, textAlign: 'center', marginBottom: 20 }}>
                Ejemplos de Dialog Component
            </Text>

            {/* Botones para mostrar diferentes tipos de diálogos */}
            <Button 
                mode="contained" 
                onPress={() => setShowConfirmDialog(true)}
                icon="help-circle"
            >
                Diálogo de Confirmación
            </Button>

            <Button 
                mode="contained" 
                onPress={() => setShowWarningDialog(true)}
                buttonColor={theme.colors.warning || '#FF9800'}
                icon="alert"
            >
                Diálogo de Advertencia
            </Button>

            <Button 
                mode="contained" 
                onPress={() => setShowErrorDialog(true)}
                buttonColor={theme.colors.error}
                icon="alert-circle"
            >
                Diálogo de Error
            </Button>

            <Button 
                mode="contained" 
                onPress={() => setShowSuccessDialog(true)}
                buttonColor="#4CAF50"
                icon="check-circle"
            >
                Diálogo de Éxito
            </Button>

            <Button 
                mode="contained" 
                onPress={() => setShowInfoDialog(true)}
                icon="information"
            >
                Diálogo de Información
            </Button>

            {/* Diálogo de Confirmación */}
            <DialogComponent
                visible={showConfirmDialog}
                title="Confirmar acción"
                content="¿Está seguro de que desea continuar con esta operación?"
                type="confirmation"
                acceptText="Confirmar"
                cancelText="Cancelar"
                onAccept={() => {
                    setShowConfirmDialog(false);
                    // Lógica de confirmación
                }}
                onCancel={() => setShowConfirmDialog(false)}
            />

            {/* Diálogo de Advertencia */}
            <DialogComponent
                visible={showWarningDialog}
                title="Advertencia"
                content="Esta acción puede tener consecuencias importantes. ¿Desea proceder?"
                type="warning"
                acceptText="Proceder"
                cancelText="Cancelar"
                acceptIcon="arrow-right"
                onAccept={() => {
                    setShowWarningDialog(false);
                    // Lógica de advertencia
                }}
                onCancel={() => setShowWarningDialog(false)}
            />

            {/* Diálogo de Error */}
            <DialogComponent
                visible={showErrorDialog}
                title="Error crítico"
                content="Ha ocurrido un error que requiere atención inmediata. ¿Desea reintentar?"
                type="error"
                acceptText="Reintentar"
                cancelText="Cancelar"
                acceptIcon="refresh"
                onAccept={() => {
                    setShowErrorDialog(false);
                    // Lógica de reintento
                }}
                onCancel={() => setShowErrorDialog(false)}
            />

            {/* Diálogo de Éxito */}
            <DialogComponent
                visible={showSuccessDialog}
                title="Operación exitosa"
                content="La operación se ha completado correctamente."
                type="success"
                acceptText="Entendido"
                hideCancel={true}
                acceptIcon="thumb-up"
                onAccept={() => setShowSuccessDialog(false)}
                onCancel={() => setShowSuccessDialog(false)}
            />

            {/* Diálogo de Información */}
            <DialogComponent
                visible={showInfoDialog}
                title="Información importante"
                content="Esta es información relevante que debe conocer antes de continuar."
                type="info"
                acceptText="Continuar"
                cancelText="Volver"
                acceptIcon="arrow-right"
                cancelIcon="arrow-left"
                onAccept={() => {
                    setShowInfoDialog(false);
                    // Lógica para continuar
                }}
                onCancel={() => setShowInfoDialog(false)}
            />
        </View>
    );
};

export default DialogExampleScreen;