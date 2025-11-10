import IconButtomForm from "components/form/IconButtomForm"
import { MD3Theme, Text } from "react-native-paper"
import { View } from "react-native"
import CheckBoxForm from "components/form/CheckBoxForm"
import ConfigFile from "types/tables/ConfigFile"
// import { ArticuloDetalleType } from "types/RecepccionRutas/DataArticulosRutaType"
import ArticuloRutaType from "types/Rutas/ArticuloRutaType"
import { boolean } from "yup"

const configTableRecepccionRutas = (
    control:any,
    theme: MD3Theme,
    onOpenModalize: () => void,
    setArticuloRecepccion: (param:ArticuloRutaType | null) => void,
    loadingRecepcion: boolean = false
) => {

    return [
        {
            data: null,
            name: 'Producto',
            render: (data:ArticuloRutaType) => (
                <View className="w-full flex flex-col items-start">
                    <Text variant="bodySmall" style={{ color: theme.colors.primary  }}>{data.codigo_articulo}</Text>
                    <Text variant="bodySmall" numberOfLines={3}>{data.nombre_articulo}</Text>
                </View>
            )
        },
        {
            data: null,
            name: 'Cantidad',
            numeric: true,
            render: (data:ArticuloRutaType) => { return (
                    <View className="flex flex-row justify-center items-center gap-3">
                        <Text>{ data.cantidad }</Text>
                    </View>
                ) 
            }
        },
        {
            data: null,
            // name: '',
            render: (data:ArticuloRutaType) => {
                return (
                    <IconButtomForm disabled={loadingRecepcion} icon="pencil-outline" onPress={ () => {
                            setArticuloRecepccion(data ? { ...data } : null)
                            onOpenModalize()
                        }
                    }/>
                )
            }
        },
        {
            data: null,
            name: '',
            render: (data:ArticuloRutaType) => { return (
                    <View className="flex flex-row">
                        <CheckBoxForm 
                            disabled={loadingRecepcion}
                            control={control}
                            name={`${ data.codigo_articulo }`}
                        />
                    </View>
                ) 
            }
        },
    ] as ConfigFile[]
}

export default configTableRecepccionRutas