import { create } from 'zustand'
import { getValueStorage, setValueStorage } from 'helpers/store/storeApp';

type GlobalState = {
  dark: boolean;
  setDark: () => void;
  drawer: boolean;
  setOpenDrawer: () => void;
  setCloseDrawer: () => void;
  screenLoading: boolean;
  setOpenScreenLoading: () => void;
  setCloseScreenLoading: () => void;
};

const globalState = create<GlobalState>((set)=>({
    dark: getValueStorage('theme')?.dark || false,
    // setDark: () => set((state) => ({ dark: !state.dark }))
    setDark: () => set((state) => {
        const newDark = !state.dark
        setValueStorage('theme', JSON.stringify({ dark: newDark }))
        return { dark: newDark }
    }),
    drawer: false,
    setOpenDrawer: () => set({ drawer: true }),
    setCloseDrawer: () => set({ drawer: false }),
    screenLoading: false,
    setOpenScreenLoading: () => set({ screenLoading: true }),
    setCloseScreenLoading: () => set({ screenLoading: false }),
}))

export default globalState