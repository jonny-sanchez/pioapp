import * as LocalAuthentication from 'expo-local-authentication';
import { Linking, Platform } from 'react-native';

type BiometricStatus = {
  hasHardware: boolean;
  enrolled: boolean;
  supportedTypes: string[]; // ej: ["Fingerprint", "FaceID"]
};

const mapTypeToString = (type: number) => {
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