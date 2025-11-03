/**
 * Utilidades para formateo de moneda
 */

/**
 * Formatea un número como moneda guatemalteca (GTQ)
 * @param amount - El monto a formatear
 * @returns String formateado como moneda GTQ
 */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: 'GTQ',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};

/**
 * Formatea un número como moneda sin símbolo
 * @param amount - El monto a formatear
 * @returns String formateado como número con separadores de miles
 */
export const formatNumber = (amount: number): string => {
    return new Intl.NumberFormat('es-GT', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};