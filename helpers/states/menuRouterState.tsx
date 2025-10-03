import { RouterName } from "helpers/navigator/routers";
import { create } from "zustand";

type RouterItem = {
  component: React.ComponentType<any>;
  default: boolean;
  hidden: boolean;
  icon: string;
  name: RouterName;
  name_category: string;
  title: string;
};

export type RouterGrouped = Record<string, RouterItem[]>;

type menuRouterStateProps = {
    routerMenu?: RouterGrouped;
    setRouterMenu: (nwRouterMenu:RouterGrouped)=>void; 
}

const menuRouterState = create<menuRouterStateProps>((set)=>({
    routerMenu: {},
    setRouterMenu: (nwRouterMenu) => set({ routerMenu: nwRouterMenu })
}))

export default menuRouterState