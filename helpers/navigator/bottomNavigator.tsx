import Home from 'pages/dashboard/Home';
import Visitas from 'pages/dashboard/Visitas';
import Rutas from 'pages/dashboard/Rutas';
import Boleta from 'pages/dashboard/Boleta';

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
        element: Visitas 
    },
    { 
        key: 'boleta', 
        title: 'Boleta', 
        focusedIcon: 'file-sign',
        // unfocusedIcon: 'storefront-outline',
        appBarTitle: 'Boleta',
        element: Boleta 
    },
]

export default bottomNavigation