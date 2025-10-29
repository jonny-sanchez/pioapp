import { MercanciaType } from "pages/dashboard/RecepcionRutas"
import IconButtomForm from "components/form/IconButtomForm"
import { Text } from "react-native-paper"
import { View } from "react-native"
import CheckBoxForm from "components/form/CheckBoxForm"
import ConfigFile from "types/tables/ConfigFile"

const configTableRecepccionRutas = (
    control:any,
    openModalize?: () => void,
    setMercancia?: (nwValue:MercanciaType | null) => void
) => {

    return [
        {
            data: 'name',
            name: 'Producto'
        },
        {
            data: null,
            name: 'Cantidad',
            numeric: true,
            render: (data:MercanciaType) => { return (
                    <View className="flex flex-row justify-center items-center gap-3">
                        <Text>{ data.cantidadUpload }</Text>
                    </View>
                ) 
            }
        },
        {
            data: null,
            // name: '',
            render: (data:MercanciaType) => {
                return (
                    <IconButtomForm icon="pencil-outline" onPress={ () => {
                            setMercancia && setMercancia(data ? { ...data } : null)
                            openModalize && openModalize()
                        }
                    }/>
                )
            }
        },
        {
            data: null,
            name: '',
            render: (data:MercanciaType) => { return (
                    <View className="flex flex-row">
                        <CheckBoxForm 
                            control={control}
                            name={`${ data.name }`}
                        />
                    </View>
                ) 
            }
        },
    ] as ConfigFile[]
}

export default configTableRecepccionRutas