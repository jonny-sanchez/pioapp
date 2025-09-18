import Home from 'pages/dashboard/Home';
import Visitas from 'pages/dashboard/Visitas';
import Rutas from 'pages/dashboard/Rutas';
import Boleta from 'pages/dashboard/Boleta';
import SaveVisitas from 'pages/Fomularios/SaveVisitas';

export type BottomNavKey = typeof bottomNavigation[number]['key'];

export function getIndexByKey(key: BottomNavKey): number {
    return bottomNavigation.findIndex(item => item.key === key);
}

const bottomNavigation = [
    { 
        key: 'home', 
        title: 'Inicio',
        focusedIcon: 'home', 
        unfocusedIcon: 'home-outline', 
        appBarTitle: 'Pinulito',
        element: Home
    },  
    {
        key: 'rutas', 
        title: 'Rutas',
        focusedIcon: 'truck', 
        unfocusedIcon: 'truck-outline', 
        appBarTitle: 'Rutas',
        element: Rutas
    },
    { 
        key: 'visitas', 
        title: 'Visitas', 
        focusedIcon: 'storefront',
        unfocusedIcon: 'storefront-outline',
        appBarTitle: 'Visitas',
        element: SaveVisitas 
    },
    { 
        key: 'boleta', 
        title: 'Boleta', 
        focusedIcon: 'file-sign',
        // unfocusedIcon: 'storefront-outline',
        appBarTitle: 'Boleta',
        element: Boleta 
    },
] as const

export default bottomNavigation