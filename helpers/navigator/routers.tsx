import Login from "pages/auth/Login"
// import Inicio from "pages/dashboard/Inicio"
import SaveVisitas from "pages/Fomularios/SaveVisitas"
import ScannnerQr from "pages/dashboard/ScannnerQr"
import Home from "pages/dashboard/Home"
import Rutas from "pages/dashboard/Rutas"
import Boleta from "pages/dashboard/Boleta"
import ShowQrRuta from "pages/dashboard/ShowQrRuta"

type RoutersType = {
    name: string;
    component?: any;
    default?: boolean;
    hidden?: boolean;
    icon?: string;
    title?: string;
}

const routers = [
    {
        name: 'Login',
        component: Login,
        default: true,
        hidden: true,
        icon: '',
        title: ''
    },
    {
        name: 'Home',
        component: Home,
        default: false,
        icon: 'home',
        title: 'Home',
        hidden: true
    },
    {
        name: 'Rutas',
        component: Rutas,
        default: false,
        icon: 'truck',
        title: 'Rutas',
        hidden: false
    },
    {
        name: 'SaveVisitas',
        component: SaveVisitas,
        default: false,
        icon: 'storefront',
        title: 'Visitas',
        hidden: false
    },
    {
        name: 'Boleta',
        component: Boleta,
        default: false,
        icon: 'file-sign',
        title: 'Boleta',
        hidden: false
    },
    {
        name: 'ScannerQr',
        component: ScannnerQr,
        default: false,
        hidden: true,
        icon: '',
        title: ''
    },
    {
        name: 'QrRutas',
        component: ShowQrRuta,
        default: false,
        hidden: true,
        icon: '',
        title: ''
    }
] as const satisfies readonly RoutersType[]

export type RouterName = typeof routers[number]['name']

export default routers