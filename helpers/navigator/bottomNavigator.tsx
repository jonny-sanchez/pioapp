import Home from 'pages/dashboard/Home';
import Visitas from 'pages/dashboard/Visitas';


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
        key: 'visitas', 
        title: 'Visitas', 
        focusedIcon: 'storefront',
        unfocusedIcon: 'storefront-outline',
        appBarTitle: 'Visitas',
        element: Visitas 
    },
]

export default bottomNavigation