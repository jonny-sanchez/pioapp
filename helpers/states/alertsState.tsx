import { create } from "zustand";
import { OptionsTypeAlert } from "types/AlertsType";

// type TypeAlerts = 'error' | 'success' | 'warning' | 'normal'

type AlertsState= {
    visibleSnackBar: boolean;
    message?: string;
    typeAlert: OptionsTypeAlert;
    openVisibleSnackBar: (nwMessage:string, nwTypeAlert?:OptionsTypeAlert) => void;
    closeVisibleSnackBar: () => void;
}

const alertsState = create<AlertsState>((set) => ({
    visibleSnackBar: false,
    message: '',
    typeAlert: 'normal',
    openVisibleSnackBar: (nwMessage:string = '', nwTypeAlert:OptionsTypeAlert = 'normal') => set({ visibleSnackBar: true, message: nwMessage, typeAlert: nwTypeAlert }),
    closeVisibleSnackBar: () => set({ 
        visibleSnackBar: false, 
        // message: '', 
        // typeAlert: 'normal' 
    }),
}))

export default alertsState