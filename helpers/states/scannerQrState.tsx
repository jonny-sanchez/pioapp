import { create } from "zustand";

type scannerQrStateProps = {
    // openScannerQr?: boolean; 
    // setOpenScannerQr: ((nwOpenScannerQr:boolean) => void);
    valueScannedQr: any;
    setValueScannedQr: (nwValueScannedQr:any) => void;
    clearValueScannedQr: () => void;
}

const scannerQrState = create<scannerQrStateProps>((set)=>({
    valueScannedQr: null,
    setValueScannedQr: (nwValueScannedQr) => set({ valueScannedQr: nwValueScannedQr }),
    clearValueScannedQr: () => set({ valueScannedQr: null })
    // openScannerQr: false,
    // setOpenScannerQr: (nwOpenScannerQr) => set({ openScannerQr: nwOpenScannerQr })
}))

export default scannerQrState