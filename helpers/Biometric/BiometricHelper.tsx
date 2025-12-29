import * as LocalAuthentication from 'expo-local-authentication';
import { Linking, Platform } from 'react-native';
import { BiometricStatus, BiometricType } from 'types/Biometric/BiometricTypes';

const mapTypeToString = (type: LocalAuthentication.AuthenticationType) : BiometricType => {
  // Los números son los que retorna Expo: 1 = Fingerprint, 2 = Facial, 3 = Iris (raro)
  switch (type) {
    case LocalAuthentication.AuthenticationType.FINGERPRINT:
      return 'Fingerprint';
    case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
      return 'FaceID';
    case LocalAuthentication.AuthenticationType.IRIS:
      return 'Iris';
    default:
      return 'Unknown';
  }
};

/**
 * return {
 * hasHardware (retorna boolean) // te dice si el dispositivio tiene algun biometrico
 * enrolled (retorna boolean) // te dice si el usario configuro en el telefono algun biometrico
 * supportedTypes (retorena un arreglo []) este te dice los biometricos que tiene disponible en el celular
 * }
*/
export const checkBiometricStatus = async (): Promise<BiometricStatus> => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();

  // supportedAuthenticationTypesAsync devuelve array de números
  const rawSupported = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const supportedTypes = Array.isArray(rawSupported)
    ? rawSupported.map(mapTypeToString)
    : [];

  return { hasHardware, enrolled, supportedTypes };
};

export const authenticateBiometric = async () : Promise<LocalAuthentication.LocalAuthenticationResult> =>  {
  const result = await LocalAuthentication.authenticateAsync(
    {
      promptMessage: 'Inicia sesión con biometría',
      fallbackLabel: 'Usar PIN',
      cancelLabel: 'Cancelar',
      disableDeviceFallback: true, // permite PIN si falla
    }
  );

  return result;
};
