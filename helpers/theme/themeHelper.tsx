/**
 * Utilidades para temas y colores de la aplicación
 */
import { AppTheme } from 'types/ThemeTypes';

/**
 * Obtiene el color de estado basado en si algo está válido o no
 * @param theme - Tema de la aplicación
 * @param valido - Si el estado es válido
 * @returns Color correspondiente del tema
 */
export const getStatusColor = (theme: AppTheme, valido: boolean): string => {
    return valido ? theme.colors.success : theme.colors.warning;
};

/**
 * Obtiene el color de estado para texto basado en validez
 * @param theme - Tema de la aplicación
 * @param valido - Si el estado es válido
 * @returns Color de texto correspondiente
 */
export const getStatusTextColor = (theme: AppTheme, valido: boolean): string => {
    return valido ? theme.colors.onSuccess : theme.colors.onWarning;
};

/**
 * Obtiene texto de estado basado en validez
 * @param valido - Si el estado es válido
 * @returns Texto del estado
 */
export const getStatusText = (valido: boolean): string => {
    return valido ? 'FIRMADA' : 'PENDIENTE';
};