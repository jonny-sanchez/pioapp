import { Linking } from 'react-native';
import { BOLETA_AGUINALDO_PDF_URL, BOLETA_BONO14_PDF_URL, BOLETA_PDF_BASE_URL, BOLETA_VACACION_PDF_URL } from 'constants/boletaConstants';
import { TipoPeriodoEnum } from 'types/BoletaType';

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

export const descargarBoletaPDFBono14AndAguinaldo = async(fechaFinPeriodo:string, aliasCodigo:string, tipo:number): Promise<boolean> => {
    try {
        const [YEAR, MONTH, DAY] = fechaFinPeriodo.split('/').map(Number)

        const url = `${TipoPeriodoEnum.BONO14 == tipo ? BOLETA_BONO14_PDF_URL : BOLETA_AGUINALDO_PDF_URL}?aliasCodigo=${aliasCodigo}&anio=${YEAR}`
        
        const supported = await Linking.canOpenURL(url);
        
        if (supported) {
            await Linking.openURL(url);
            return true;
        }
        
        return false;
    } catch (error) {
        return false;
    }
}

export const descargarBoletaVacacion = async(aliasEmpleado:string, idAusencia:number): Promise<boolean> => {
    try {
        const codEmpleado = Number(aliasEmpleado.substring(2))
        const url = `${BOLETA_VACACION_PDF_URL}?codEmpleado=${codEmpleado}&idAusencia=${idAusencia}`
        
        const supported = await Linking.canOpenURL(url);
        
        if (supported) {
            await Linking.openURL(url);
            return true;
        }
        
        return false;
    } catch (error) {
        return false;
    }
}