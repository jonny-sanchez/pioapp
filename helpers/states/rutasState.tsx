import RutasListType from "types/Rutas/RutasListType";
import { create } from "zustand";

type RutasStateType = {
    rutas: RutasListType[];
    setRutas: (newRutas: RutasListType[]) => void;
    setRecepcionadaRuta: (idPedido:any, serie:any) => void;
}

const rutasState = create<RutasStateType>((set) => ({
    rutas: [],
    setRutas: (newRutas) => set({ rutas: newRutas }),
    setRecepcionadaRuta: (idPedido:any, serie:any) => set(
        (state) => ({
            rutas: state.rutas.map(
                ruta => (ruta.id_pedido == idPedido && ruta.serie == serie) ? { ...ruta, recepccionada: 1, animated: true } : ruta
            )
        })
    )
}))

export default rutasState

