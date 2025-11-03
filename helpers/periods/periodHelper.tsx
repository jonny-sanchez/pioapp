/**
 * Utilidades para manejo de períodos y fechas
 */

/**
 * Extrae el mes de un período en formato "DD-MM-YYYY al DD-MM-YYYY"
 * @param periodo - String del período
 * @returns Nombre del mes en español
 */
export const getMonthFromPeriod = (periodo: string): string => {
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

/**
 * Formatea una fecha ISO a formato local guatemalteco
 * @param isoDate - Fecha en formato ISO
 * @returns Fecha formateada para Guatemala
 */
export const formatDateGT = (isoDate: string): string => {
    return new Date(isoDate).toLocaleDateString('es-GT');
};

/**
 * Obtiene el año de un período
 * @param periodo - String del período
 * @returns Año como número
 */
export const getYearFromPeriod = (periodo: string): number => {
    const dateParts = periodo.split(' al ')[0].split('-');
    if (dateParts.length === 3) {
        return parseInt(dateParts[2]) || new Date().getFullYear();
    }
    return new Date().getFullYear();
};