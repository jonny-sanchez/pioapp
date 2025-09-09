import Home from 'pages/dashboard/Home';
import Visitas from 'pages/dashboard/Visitas';
import Rutas from 'pages/dashboard/Rutas';

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
]

export default bottomNavigation