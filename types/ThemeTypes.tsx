import { MD3Theme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

interface CustomColors {
  success: string;
  onSuccess: string;
  successContainer: string;
  onSuccessContainer: string;
  warning: string;
  onWarning: string;
  warningContainer: string;
  onWarningContainer: string;
}

// Tipado final: combina los colores de MD3 + los personalizados
type AppColors = MD3Colors & CustomColors;

// Tipado para tu tema completo
export interface AppTheme extends MD3Theme {
  colors: AppColors;
}
