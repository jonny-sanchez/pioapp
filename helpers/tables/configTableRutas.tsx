import ButtonForm from "components/form/ButtonForm"
import { NavigationService } from "helpers/navigator/navigationScreens"


const configTableRutas = [
    {
        data: 'nombre_tienda',
        name: 'Tienda'
    },
    {
        data: 'status_ruta',
        name: 'Estado',
        render: (data:any) => ( <></> )
    },
    {
        data: null,
        name: 'Acciones',
        render: (data:any) => ( 
            <ButtonForm 
                label="Validar" 
                icon="camera" 
                style={{ marginVertical: 8 }}
                onPress={ () => NavigationService.navigate('SaveVisitas', data) }
            /> 
        )
    }
]

export default configTableRutas