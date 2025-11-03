/**
 * Helper para funciones relacionadas con la red y dispositivo
 */

import { Platform } from 'react-native';
import { TIMEOUTS } from 'constants/boletaConstants';

/**
 * Obtiene la dirección IP del dispositivo
 * @returns Promise<string | null> - La IP del dispositivo o null si no se puede obtener
 */
export const getDeviceIPAddress = async (): Promise<string | null> => {
    try {
        // Usar un servicio externo para obtener la IP pública
        return await getPublicIPAddress();
        
    } catch (error) {
        return null;
    }
};

/**
 * Obtiene la IP pública del dispositivo usando un servicio externo
 * @returns Promise<string | null> - La IP pública o null si no se puede obtener
 */
const getPublicIPAddress = async (): Promise<string | null> => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.IP_REQUEST);
        
        const response = await fetch('https://api.ipify.org?format=json', {
            method: 'GET',
            signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
            const data = await response.json();
            return data.ip || null;
        }
        
        return null;
    } catch (error) {
        return null;
    }
};

/**
 * Obtiene información básica del dispositivo
 * @returns Object con información del dispositivo
 */
export const getDeviceInfo = () => {
    return {
        platform: Platform.OS,
        version: Platform.Version,
    };
};