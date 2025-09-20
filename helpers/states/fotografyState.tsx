import { create } from "zustand";

interface Attributos {
    imgUri: string;
    exif: any;
    coords: any;
    mimeType: string;
    nameImg: string;
}

type FotografyState = {
    metadatosPicture: Attributos;
    setMetadatosPicture: (nwImgUri: string, nwExif:any, nwCoords:any, mimeType:string, nameImg:string) => void;
    clearMetadatosPicture: () => void;
}

const fotografyState = create<FotografyState>((set)=>({
    metadatosPicture: { imgUri: '', exif: null, coords: null, mimeType: '', nameImg: '' },
    setMetadatosPicture: (nwImgUri, nwExif, nwCoords, mimeType, nameImg) => set({ metadatosPicture: { imgUri: nwImgUri, exif: nwExif, coords: nwCoords, mimeType: mimeType, nameImg: nameImg } }),
    clearMetadatosPicture: () => set({ metadatosPicture: { imgUri: '', exif: null, coords: null, mimeType: '', nameImg: '' } }) 
}))

export default fotografyState