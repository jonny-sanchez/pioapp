export type BiometricType = |'Fingerprint'|'FaceID'|'Iris'| 'Unknown'

export type BiometricStatus = {
  hasHardware: boolean;
  enrolled: boolean;
  supportedTypes: BiometricType[]; // ej: ["Fingerprint", "FaceID"]
};