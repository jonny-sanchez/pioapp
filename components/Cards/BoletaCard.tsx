import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Chip, Divider, useTheme, IconButton } from 'react-native-paper';
import { BoletaType } from 'types/BoletaType';
import { AppTheme } from 'types/ThemeTypes';
import ButtonForm from 'components/form/ButtonForm';
import { formatCurrency } from 'helpers/currency/currencyHelper';
import { getStatusColor, getStatusTextColor, getStatusText } from 'helpers/theme/themeHelper';

interface BoletaCardProps {
    boleta: BoletaType;
    onVerBoleta: (boleta: BoletaType) => void;
    onVerDetalle?: (boleta: BoletaType) => void;
}

export default function BoletaCard({ boleta, onVerBoleta, onVerDetalle }: BoletaCardProps) {
    
    const theme = useTheme() as AppTheme;
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-GT', {
            style: 'currency',
            currency: 'GTQ',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    const getStatusColor = (valido: boolean) => {
        return valido ? theme.colors.success : theme.colors.warning;
    };

    // Extraer el mes del período para mostrar
    const getMonthFromPeriod = (periodo: string) => {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        // Intentar extraer fecha del formato "14-9-2025 al 28-9-2025"
        const dateParts = periodo.split(' al ')[0].split('-');
        if (dateParts.length === 3) {
            const monthIndex = parseInt(dateParts[1]) - 1;
            return months[monthIndex] || 'N/A';
        }
        return 'N/A';
    };

    return (
        <Card className="mb-4 mx-2" style={{ backgroundColor: theme.colors.surface }}>
            <Card.Content className="p-4">
                {/* Mes y Total */}
                <View className="flex-row justify-between items-center mb-4">
                    <View>
                        <Text style={{ color: theme.colors.onSurface, fontSize: 24, fontWeight: 'bold' }}>
                            {boleta.periodo.nombre}
                        </Text>
                        <Text style={{ color: theme.colors.onSurface, fontSize: 18 }}>
                            Total: {formatCurrency(boleta.liquido || 0)}
                        </Text>
                        <Chip 
                            mode="flat" 
                            textStyle={{ 
                                color: boleta.firma?.valido ? theme.colors.onSuccess : theme.colors.onWarning, 
                                fontSize: 12 
                            }}
                            style={{ 
                                backgroundColor: getStatusColor(boleta.firma?.valido || false),
                                marginTop: 4,
                                alignSelf: 'flex-start'
                            }}
                        >
                            {boleta.firma?.valido ? 'FIRMADA' : 'PENDIENTE'}
                        </Chip>
                    </View>
                    {/* <View className="items-end">
                        <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14 }}>
                            Nº de boleta: {boleta.numeroBoleta || 'N/A'}
                        </Text>
                        <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14 }}>
                            Período: {boleta.periodo.rango || 'N/A'}
                        </Text>
                        <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14 }}>
                            Días trabajados: {boleta.diasTrabajados || 0}
                        </Text>
                    </View> */}
                </View>

                <Divider style={{ backgroundColor: theme.colors.outlineVariant }} />

                {/* Detalles de cobros */}
                <View className="mt-4">
                    {/* <View className="flex-row items-center mb-3">
                        <IconButton
                            icon="receipt"
                            iconColor={theme.colors.primary}
                            size={18}
                            style={{ margin: 0 }}
                        />
                        <Text style={{ color: theme.colors.onSurface, fontWeight: '600' }}>
                            Detalle de cobros:
                        </Text>
                    </View> */}
                    
                    {/* Ingresos */}
                    <View 
                        className="flex-row justify-between items-center mb-2 p-3 rounded-lg"
                        style={{ backgroundColor: theme.colors.primaryContainer }}
                    >
                        <View>
                            <Text style={{ color: theme.colors.onPrimaryContainer, fontWeight: '500' }}>
                                Salario Ordinario
                            </Text>
                            <Text style={{ color: theme.colors.onPrimaryContainer, fontSize: 12 }}>
                                {formatCurrency(boleta.ingresos?.salarioOrdinario || 0)}
                            </Text>
                            {boleta.ingresos?.bonificacion > 0 && (
                                <Text style={{ color: theme.colors.onPrimaryContainer, fontSize: 12 }}>
                                    Bonificación: {formatCurrency(boleta.ingresos.bonificacion)}
                                </Text>
                            )}
                        </View>
                        <View className="items-center">
                            <IconButton
                                icon="cash"
                                iconColor={theme.colors.onPrimary}
                                containerColor={theme.colors.primary}
                                size={20}
                            />
                        </View>
                    </View>

                    {/* Descuentos si existen */}
                    {(boleta.descuentos?.totalDescuentos > 0) && (
                        <View className="mt-3">
                            <View className="flex-row items-center mb-2">
                                <IconButton
                                    icon="credit-card-minus"
                                    iconColor={theme.colors.success}
                                    size={16}
                                    style={{ margin: 0 }}
                                />
                                <Text style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                                    Descuentos
                                </Text>
                            </View>
                            {boleta.descuentos.igss > 0 && (
                                <View className="flex-row justify-between">
                                    <Text style={{ color: theme.colors.onSurfaceVariant }}>IGSS</Text>
                                    <Text style={{ color: theme.colors.success }}>
                                        -{formatCurrency(boleta.descuentos.igss)}
                                    </Text>
                                </View>
                            )}
                            {boleta.descuentos.isr > 0 && (
                                <View className="flex-row justify-between">
                                    <Text style={{ color: theme.colors.onSurfaceVariant }}>ISR</Text>
                                    <Text style={{ color: theme.colors.success }}>
                                        -{formatCurrency(boleta.descuentos.isr)}
                                    </Text>
                                </View>
                            )}
                            {boleta.descuentos.ahorro > 0 && (
                                <View className="flex-row justify-between">
                                    <Text style={{ color: theme.colors.onSurfaceVariant }}>Ahorro</Text>
                                    <Text style={{ color: theme.colors.success }}>
                                        -{formatCurrency(boleta.descuentos.ahorro)}
                                    </Text>
                                </View>
                            )}
                            {boleta.descuentos.seguro > 0 && (
                                <View className="flex-row justify-between">
                                    <Text style={{ color: theme.colors.onSurfaceVariant }}>Seguro</Text>
                                    <Text style={{ color: theme.colors.success }}>
                                        -{formatCurrency(boleta.descuentos.seguro)}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}

                    {/* Total */}
                    <Divider style={{ backgroundColor: theme.colors.outlineVariant, marginVertical: 12 }} />
                    <View className="flex-row justify-between items-center">
                        <Text style={{ color: theme.colors.onSurface, fontWeight: 'bold', fontSize: 18 }}>Total Líquido:</Text>
                        <Text style={{ color: theme.colors.onSurface, fontWeight: 'bold', fontSize: 18 }}>
                            {formatCurrency(boleta.liquido || 0)}
                        </Text>
                    </View>
                </View>

                {/* Botones de acción */}
                <View className="flex-row justify-between mt-6">
                    <View className="flex-1 mr-2">
                        <ButtonForm
                            label="VER BOLETA"
                            icon="file-document-outline"
                            onPress={() => onVerBoleta(boleta)}
                            buttonColor={theme.colors.primary}
                        />
                    </View>
                </View>

                {/* Indicador de próximo vencimiento */}
                <View className="mt-4 flex-row items-center justify-center">
                    <IconButton
                        icon="alert-circle"
                        iconColor={theme.colors.onErrorContainer}
                        size={16}
                        style={{ margin: 0 }}
                    />
                    <Text style={{ color: theme.colors.onErrorContainer }} className="text-sm ml-1">
                        Ingresa para ver el documento completo
                    </Text>
                </View>
            </Card.Content>
        </Card>
    );
}