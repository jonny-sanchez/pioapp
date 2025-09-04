import Login from "pages/auth/Login"
import Inicio from "pages/dashboard/Inicio"
import SaveVisitas from "pages/Fomularios/SaveVisitas"

const routers = [
    {
        name: 'Login',
        component: Login,
        default: false
    },
    {
        name: 'Home',
        component: Inicio,
        default: false
    },
    {
        name: 'SaveVisitas',
        component: SaveVisitas,
        default: true
    }
]

export default routers