import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Modal, Portal, Card, Divider, Button, IconButton, useTheme } from 'react-native-paper';
import { BoletaType } from 'types/BoletaType';
import { AppTheme } from 'types/ThemeTypes';
import ButtonForm from 'components/form/ButtonForm';
import { formatCurrency } from 'helpers/currency/currencyHelper';
import { formatDateGT } from 'helpers/periods/periodHelper';
import { getStatusText } from 'helpers/theme/themeHelper';
import { descargarBoletaPDF } from 'helpers/pdf/pdfHelper';
import alertsState from 'helpers/states/alertsState';
import { BOLETA_MESSAGES } from 'constants/boletaConstants';

interface BoletaDetailModalProps {
    visible: boolean;
    boleta: BoletaType | null;
    onDismiss: () => void;
}

export default function BoletaDetailModal({ visible, boleta, onDismiss }: BoletaDetailModalProps) {

    const theme = useTheme() as AppTheme;
    const { openVisibleSnackBar } = alertsState();
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDescargarPDF = async () => {
        if (!boleta?.periodo?.id || !boleta?.empleado?.codigo) {
            openVisibleSnackBar(BOLETA_MESSAGES.ERROR.FALTAN_DATOS_PDF, 'error');
            return;
        }

        setIsDownloading(true);
        openVisibleSnackBar(BOLETA_MESSAGES.WARNING.DESCARGANDO_PDF, 'warning');

        try {
            const success = await descargarBoletaPDF(boleta.periodo.id, boleta.empleado.codigo);

            if (success) {
                openVisibleSnackBar(BOLETA_MESSAGES.SUCCESS.PDF_DESCARGADO, 'success');
            } else {
                openVisibleSnackBar(BOLETA_MESSAGES.ERROR.ERROR_DESCARGAR_PDF, 'error');
            }
        } catch (error) {
            openVisibleSnackBar(BOLETA_MESSAGES.ERROR.ERROR_DESCARGAR_PDF, 'error');
        } finally {
            setIsDownloading(false);
        }
    };

    if (!boleta) return null;

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                dismissable={true}
                contentContainerStyle={{
                    backgroundColor: theme.colors.surface,
                    margin: 20,
                    borderRadius: 12,
                    maxHeight: '90%'
                }}
            >
                <View className="p-4" style={{ maxHeight: '100%' }}>
                    {/* Header */}
                    <View className="flex-row justify-between items-center">
                        <Text style={{ color: theme.colors.onSurface, fontSize: 20, fontWeight: 'bold' }}>
                            Detalle de Boleta
                        </Text>
                        <IconButton
                            icon="close"
                            iconColor={theme.colors.onSurface}
                            onPress={onDismiss}
                        />
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Información general */}
                        <Card className="mb-4" style={{ backgroundColor: theme.colors.surfaceVariant }}>
                            <Card.Content className="p-4">
                                <View className="flex-row items-center mb-3">
                                    <IconButton
                                        icon="file-document-outline"
                                        iconColor={theme.colors.primary}
                                        size={20}
                                        style={{ margin: 0 }}
                                    />
                                    <Text style={{ color: theme.colors.onSurface, fontSize: 18, fontWeight: '600' }}>
                                        Información General
                                    </Text>
                                </View>

                                <View className="space-y-2">
                                    <View className="flex-row justify-between">
                                        <Text style={{ color: theme.colors.onSurfaceVariant }}>Número de Boleta:</Text>
                                        <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>{boleta.numeroBoleta || 'N/A'}</Text>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text style={{ color: theme.colors.onSurfaceVariant }}>Período:</Text>
                                        <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                            {boleta.periodo.rango || 'N/A'}
                                        </Text>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text style={{ color: theme.colors.onSurfaceVariant }}>Días Trabajados:</Text>
                                        <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>{boleta.diasTrabajados || 0}</Text>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text style={{ color: theme.colors.onSurfaceVariant }}>Estado:</Text>
                                        <Text style={{
                                            fontWeight: '500',
                                            color: boleta.firma?.valido ? theme.colors.success : theme.colors.error
                                        }}>
                                            {boleta.firma?.valido ? getStatusText(true) : 'NO FIRMADA'}
                                        </Text>
                                    </View>
                                    {boleta.firma?.valido && boleta.firma.fechaFirma && (
                                        <>
                                            <View className="flex-row justify-between">
                                                <Text style={{ color: theme.colors.onSurfaceVariant }}>Fecha de Firma:</Text>
                                                <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                                    {formatDateGT(boleta.firma.fechaFirma)}
                                                </Text>
                                            </View>
                                        </>
                                    )}
                                </View>
                            </Card.Content>
                        </Card>

                        {/* Ingresos */}
                        <Card className="mb-4" style={{ backgroundColor: theme.colors.surfaceVariant }}>
                            <Card.Content className="p-4">
                                <View className="flex-row items-center mb-3">
                                    <IconButton
                                        icon="cash-plus"
                                        iconColor={theme.colors.success}
                                        size={20}
                                        style={{ margin: 0 }}
                                    />
                                    <Text style={{ color: theme.colors.onSurface, fontSize: 18, fontWeight: '600' }}>
                                        Ingresos
                                    </Text>
                                </View>

                                <View className="space-y-2">
                                    <View className="flex-row justify-between">
                                        <Text style={{ color: theme.colors.onSurfaceVariant }}>Salario Ordinario:</Text>
                                        <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                            {formatCurrency(boleta.ingresos?.salarioOrdinario || 0)}
                                        </Text>
                                    </View>

                                    {boleta.ingresos?.horasSimples > 0 && (
                                        <View className="flex-row justify-between">
                                            <Text style={{ color: theme.colors.onSurfaceVariant }}>Horas Simples:</Text>
                                            <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                                {formatCurrency(boleta.ingresos.horasSimples)}
                                            </Text>
                                        </View>
                                    )}

                                    {boleta.ingresos?.horasDobles > 0 && (
                                        <View className="flex-row justify-between">
                                            <Text style={{ color: theme.colors.onSurfaceVariant }}>Horas Dobles:</Text>
                                            <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                                {formatCurrency(boleta.ingresos.horasDobles)}
                                            </Text>
                                        </View>
                                    )}

                                    {boleta.ingresos?.bonificacion > 0 && (
                                        <View className="flex-row justify-between">
                                            <Text style={{ color: theme.colors.onSurfaceVariant }}>Bonificación:</Text>
                                            <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                                {formatCurrency(boleta.ingresos.bonificacion)}
                                            </Text>
                                        </View>
                                    )}

                                    {boleta.ingresos?.otrosIngresos > 0 && (
                                        <View className="flex-row justify-between">
                                            <Text style={{ color: theme.colors.onSurfaceVariant }}>Otros Ingresos:</Text>
                                            <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                                {formatCurrency(boleta.ingresos.otrosIngresos)}
                                            </Text>
                                        </View>
                                    )}

                                    <Divider style={{ backgroundColor: theme.colors.outline, marginVertical: 8 }} />

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ color: theme.colors.onSurface, fontWeight: 'bold', flex: 1, flexShrink: 1 }}>Total Ingresos:</Text>
                                        <Text style={{ color: theme.colors.success, fontWeight: 'bold', marginLeft: 8 }}>
                                            {formatCurrency(boleta.ingresos?.totalIngresos || 0)}
                                        </Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>

                        {/* Descuentos */}
                        {boleta.descuentos?.totalDescuentos > 0 && (
                            <Card className="mb-4" style={{ backgroundColor: theme.colors.surfaceVariant }}>
                                <Card.Content className="p-4">
                                    <View className="flex-row items-center mb-3">
                                        <IconButton
                                            icon="credit-card-minus"
                                            iconColor={theme.colors.error}
                                            size={20}
                                            style={{ margin: 0 }}
                                        />
                                        <Text style={{ color: theme.colors.onSurface, fontSize: 18, fontWeight: '600' }}>
                                            Descuentos
                                        </Text>
                                    </View>

                                    <View className="space-y-2">
                                        {boleta.descuentos.igss > 0 && (
                                            <View className="flex-row justify-between">
                                                <Text style={{ color: theme.colors.onSurfaceVariant }}>IGSS:</Text>
                                                <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                                    -{formatCurrency(boleta.descuentos.igss)}
                                                </Text>
                                            </View>
                                        )}

                                        {boleta.descuentos.isr > 0 && (
                                            <View className="flex-row justify-between">
                                                <Text style={{ color: theme.colors.onSurfaceVariant }}>ISR:</Text>
                                                <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                                    -{formatCurrency(boleta.descuentos.isr)}
                                                </Text>
                                            </View>
                                        )}

                                        {boleta.descuentos.ahorro > 0 && (
                                            <View className="flex-row justify-between">
                                                <Text style={{ color: theme.colors.onSurfaceVariant }}>Ahorro:</Text>
                                                <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                                    -{formatCurrency(boleta.descuentos.ahorro)}
                                                </Text>
                                            </View>
                                        )}

                                        {boleta.descuentos.seguro > 0 && (
                                            <View className="flex-row justify-between">
                                                <Text style={{ color: theme.colors.onSurfaceVariant }}>Seguro:</Text>
                                                <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                                    -{formatCurrency(boleta.descuentos.seguro)}
                                                </Text>
                                            </View>
                                        )}

                                        {boleta.descuentos.otrosDescuentos > 0 && (
                                            <View className="flex-row justify-between">
                                                <Text style={{ color: theme.colors.onSurfaceVariant }}>Otros Descuentos:</Text>
                                                <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                                    -{formatCurrency(boleta.descuentos.otrosDescuentos)}
                                                </Text>
                                            </View>
                                        )}

                                        <Divider style={{ backgroundColor: theme.colors.outline, marginVertical: 8 }} />

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={{ color: theme.colors.onSurface, fontWeight: 'bold', flex: 1, flexShrink: 1 }}>Total Descuentos:</Text>
                                            <Text style={{ color: theme.colors.error, fontWeight: 'bold', marginLeft: 8 }}>
                                                -{formatCurrency(boleta.descuentos.totalDescuentos)}
                                            </Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        )}

                        {/* Resumen total */}
                        <Card style={{ backgroundColor: theme.colors.surfaceVariant }}>
                            <Card.Content className="p-4">
                                <View className="flex-row items-center mb-3">
                                    <IconButton
                                        icon="chart-line"
                                        iconColor={theme.colors.primary}
                                        size={20}
                                        style={{ margin: 0 }}
                                    />
                                    <Text style={{ color: theme.colors.onSurface, fontSize: 18, fontWeight: '600' }}>
                                        Resumen
                                    </Text>
                                </View>

                                <View className="space-y-2">
                                    <View className="flex-row justify-between">
                                        <Text style={{ color: theme.colors.onSurfaceVariant }}>Total Ingresos:</Text>
                                        <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                            {formatCurrency(boleta.ingresos?.totalIngresos || 0)}
                                        </Text>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text style={{ color: theme.colors.onSurfaceVariant }}>Total Descuentos:</Text>
                                        <Text style={{ color: theme.colors.error, fontWeight: '500' }}>
                                            -{formatCurrency(boleta.descuentos?.totalDescuentos || 0)}
                                        </Text>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text style={{ color: theme.colors.onSurfaceVariant }}>Subtotal Neto:</Text>
                                        <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                            {formatCurrency(boleta.neto || 0)}
                                        </Text>
                                    </View>

                                    <Divider style={{ backgroundColor: theme.colors.outline, marginVertical: 8 }} />

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ color: theme.colors.onSurface, fontSize: 18, fontWeight: 'bold', flex: 1, flexShrink: 1 }}>Total Líquido:</Text>
                                        <Text style={{ color: theme.colors.onSurface, fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>
                                            {formatCurrency(boleta.liquido || 0)}
                                        </Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    </ScrollView>

                    {/* Botones de acción */}
                    <View className="flex-row gap-3 mt-2">
                        <View className="flex-1">
                            <ButtonForm
                                label="Descargar PDF"
                                icon="download"
                                buttonColor={theme.colors.primary}
                                onPress={handleDescargarPDF}
                                loading={isDownloading}
                                disabled={isDownloading}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
}