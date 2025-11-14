import IconButtomForm from "components/form/IconButtomForm"
import { MD3Theme, Text } from "react-native-paper"
import { View } from "react-native"
import CheckBoxForm from "components/form/CheckBoxForm"
import ConfigFile from "types/tables/ConfigFile"
// import { ArticuloDetalleType } from "types/RecepccionRutas/DataArticulosRutaType"
import ArticuloRutaType from "types/Rutas/ArticuloRutaType"

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
            render: (data:ArticuloRutaType) => { return (
                    <View className="flex flex-row justify-between w-full">

                        {/* texto cantidad */}
                        <View className="flex flex-row justify-center items-center gap-3">
                            <Text>{ data.cantidad }</Text>
                        </View>
                        
                        <View className="flex flex-row">
                            {/* icono boton para modalize de editar cantidad */}
                            <IconButtomForm disabled={loadingRecepcion} icon="pencil-outline" onPress={ () => {
                                    setArticuloRecepccion(data ? { ...data } : null)
                                    onOpenModalize()
                                }
                            }/>

                            {/* seleccionar articulo recibido */}
                            <CheckBoxForm 
                                disabled={loadingRecepcion}
                                control={control}
                                name={`${ data.codigo_articulo }`}
                            />
                        </View>

                    </View>
                ) 
            }
        },
    ] as ConfigFile[]
}

export default configTableRecepccionRutas