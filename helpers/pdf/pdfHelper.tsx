import { Linking } from 'react-native';
import { BOLETA_PDF_BASE_URL } from 'constants/boletaConstants';

/**
 * Helper para descargar y abrir archivos PDF
 */

/**
 * Abre el PDF de la boleta firmada en el navegador del dispositivo
 * @param periodoId - ID del período
 * @param codigoEmpleado - Código del empleado
 * @returns Promise<boolean> - true si la descarga fue exitosa
 */
export const descargarBoletaPDF = async (periodoId: number, codigoEmpleado: string): Promise<boolean> => {
    try {
        const url = `${BOLETA_PDF_BASE_URL}?idPeriodo=${periodoId}&aliasCodigo=${codigoEmpleado}`;
        
        const supported = await Linking.canOpenURL(url);
        
        if (supported) {
            await Linking.openURL(url);
            return true;
        }
        
        return false;
    } catch (error) {
        return false;
    }
};

/**
 * Abre la URL del PDF directamente en el navegador
 * @param periodoId - ID del período 
 * @param codigoEmpleado - Código del empleado
 * @returns Promise<boolean> - true si se pudo abrir la URL
 */
export const abrirBoletaPDFEnNavegador = async (periodoId: number, codigoEmpleado: string): Promise<boolean> => {
    try {
        const url = `${BOLETA_PDF_BASE_URL}?idPeriodo=${periodoId}&aliasCodigo=${codigoEmpleado}`;
        
        const supported = await Linking.canOpenURL(url);
        
        if (supported) {
            await Linking.openURL(url);
            return true;
        }
        
        return false;
    } catch (error) {
        return false;
    }
};