import { create } from "zustand";
import { OptionsTypeAlert } from "types/AlertsType";

// type TypeAlerts = 'error' | 'success' | 'warning' | 'normal'

type AlertsState= {
    visibleSnackBar: boolean;
    message?: string;
    typeAlert: OptionsTypeAlert;
    openVisibleSnackBar: (nwMessage:string, nwTypeAlert?:OptionsTypeAlert) => void;
    closeVisibleSnackBar: () => void;
    snackbarKey: number;
}

const alertsState = create<AlertsState>((set) => ({
    snackbarKey: 1,
    visibleSnackBar: false,
    message: '',
    typeAlert: 'normal',
    openVisibleSnackBar: (nwMessage:string = '', nwTypeAlert:OptionsTypeAlert = 'normal') => set(state => ({ 
        visibleSnackBar: true, 
        message: nwMessage, 
        typeAlert: nwTypeAlert,
        snackbarKey: state.snackbarKey + 1
    })),
    closeVisibleSnackBar: () => set({ 
        visibleSnackBar: false, 
        // message: '', 
        // typeAlert: 'normal' 
    }),
}))

export default alertsState