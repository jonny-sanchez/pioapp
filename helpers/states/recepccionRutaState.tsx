import { ArticuloDetalleType } from "types/RecepccionRutas/DataArticulosRutaType";
import { create } from "zustand";

type RecepccionRutaStateType = {
    articuloRecepccion: ArticuloDetalleType | null;
    setArticuloRecepccion: (newArticuloRecepccion:ArticuloDetalleType | null) => void;
}

const recepccionRutaState = create<RecepccionRutaStateType>((set) => ({
    articuloRecepccion: null,
    setArticuloRecepccion: (newArticuloRecepccion) => set({ articuloRecepccion: newArticuloRecepccion })
}))

export default recepccionRutaState