import { create } from "zustand";

type scannerQrStateProps = {
    // openScannerQr?: boolean; 
    // setOpenScannerQr: ((nwOpenScannerQr:boolean) => void);
}

const scannerQrState = create<scannerQrStateProps>((set)=>({
    // openScannerQr: false,
    // setOpenScannerQr: (nwOpenScannerQr) => set({ openScannerQr: nwOpenScannerQr })
}))

export default scannerQrState