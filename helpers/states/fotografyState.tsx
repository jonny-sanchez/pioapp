import { create } from "zustand";

interface Attributos {
    imgUri: string;
    exif: any;
    coords: any;
}

type FotografyState = {
    metadatosPicture: Attributos;
    setMetadatosPicture: (nwImgUri: string, nwExif:any, nwCoords:any) => void;
    clearMetadatosPicture: () => void;
}

const fotografyState = create<FotografyState>((set)=>({
    metadatosPicture: { imgUri: '', exif: null, coords: null },
    setMetadatosPicture: (nwImgUri, nwExif, nwCoords) => set({ metadatosPicture: { imgUri: nwImgUri, exif: nwExif, coords: nwCoords } }),
    clearMetadatosPicture: () => set({ metadatosPicture: { imgUri: '', exif: null, coords: null } }) 
}))

export default fotografyState