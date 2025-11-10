// import { ArticuloDetalleType } from "types/RecepccionRutas/DataArticulosRutaType";
import ArticuloRutaType from "types/Rutas/ArticuloRutaType";
import { create } from "zustand";

type RecepccionRutaStateType = {
    articuloRecepccion: ArticuloRutaType | null;
    setArticuloRecepccion: (newArticuloRecepccion:ArticuloRutaType | null) => void;
}

const recepccionRutaState = create<RecepccionRutaStateType>((set) => ({
    articuloRecepccion: null,
    setArticuloRecepccion: (newArticuloRecepccion) => set({ articuloRecepccion: newArticuloRecepccion })
}))

export default recepccionRutaState