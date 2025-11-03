import RutasListType from "types/Rutas/RutasListType";
import { create } from "zustand";

type DetalleArticulosStateType = {
    rutaDetalle?: RutasListType | null;
    setRutaDetalle: (nwRutaDetalle:RutasListType) => void;
    loadingSkeletetonArticulos: boolean;
    setLoadingSkeletetonArticulos: (nwLoadingSkeletetonArticulos:boolean) => void;
}

const detalleArticulosState = create<DetalleArticulosStateType>((set)=>({
    rutaDetalle: null,
    setRutaDetalle: (nwRutaDetalle) => set({ rutaDetalle: nwRutaDetalle }),
    loadingSkeletetonArticulos: false,
    setLoadingSkeletetonArticulos: (nwLoadingSkeletetonArticulos) => set({ loadingSkeletetonArticulos: nwLoadingSkeletetonArticulos })
}))

export default detalleArticulosState