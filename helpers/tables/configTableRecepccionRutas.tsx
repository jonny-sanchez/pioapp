import IconButtomForm from "components/form/IconButtomForm"
import { MD3Theme, Text } from "react-native-paper"
import { View } from "react-native"
import CheckBoxForm from "components/form/CheckBoxForm"
import ConfigFile from "types/tables/ConfigFile"
import { ArticuloDetalleType } from "types/RecepccionRutas/DataArticulosRutaType"

const configTableRecepccionRutas = (
    control:any,
    theme: MD3Theme,
    onOpenModalize: () => void,
    setArticuloRecepccion: (param:ArticuloDetalleType | null) => void
) => {

    return [
        {
            data: null,
            name: 'Producto',
            render: (data:ArticuloDetalleType) => (
                <View className="w-full flex flex-col items-start">
                    <Text variant="bodySmall" style={{ color: theme.colors.primary  }}>{data.itemCode}</Text>
                    <Text variant="bodySmall" numberOfLines={3}>{data.dscription}</Text>
                </View>
            )
        },
        {
            data: null,
            name: 'Cantidad',
            numeric: true,
            render: (data:ArticuloDetalleType) => { return (
                    <View className="flex flex-row justify-center items-center gap-3">
                        <Text>{ data.quantity }</Text>
                    </View>
                ) 
            }
        },
        {
            data: null,
            // name: '',
            render: (data:ArticuloDetalleType) => {
                return (
                    <IconButtomForm icon="pencil-outline" onPress={ () => {
                            // setMercancia && setMercancia(data ? { ...data } : null)
                            // openModalize && openModalize()
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
            render: (data:ArticuloDetalleType) => { return (
                    <View className="flex flex-row">
                        <CheckBoxForm 
                            control={control}
                            name={`${ data.itemCode }`}
                        />
                    </View>
                ) 
            }
        },
    ] as ConfigFile[]
}

export default configTableRecepccionRutas