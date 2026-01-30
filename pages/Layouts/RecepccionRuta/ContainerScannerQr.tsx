import ToggleContainerAnimated from "components/Animaciones/ToggleContainerAnimated";
import CardContent from "components/Cards/CardContent";
import TouchRipple from "components/Touch/TouchRipple";
import { NavigationService } from "helpers/navigator/navigationScreens"
import { View, Pressable } from "react-native"
import { Icon, useTheme, Text } from "react-native-paper"
import DataArticulosRutaType from "types/RecepccionRutas/DataArticulosRutaType";

type ContainerScannerQrProps = {
    disabled?: boolean;
    listadoArticulosRuta?: DataArticulosRutaType | null | undefined;
}

export default function ContainerScannerQr({
    disabled = false,
    listadoArticulosRuta
} : ContainerScannerQrProps) {

    const theme = useTheme()

    return (
        // <Pressable onPress={disabled ? () => {} : () => NavigationService.navigate('ScannerQr') }>
        <View 
            className={`relative w-full h-[250] rounded-2xl ${ disabled && 'opacity-50' }`} 
            style={{ 
                backgroundColor: theme.colors.surfaceVariant,
                overflow: 'hidden'
            }}
        >
            <TouchRipple 
                onPress={disabled ? () => {} : () => NavigationService.navigate('ScannerQr') }
                style={{ flex: 1 }}
            >
                <View className="flex-1 flex items-center justify-center gap-4 p-4">
                    <Icon source='qrcode-scan' size={60}/>
                    <Text style={{ color: theme.colors.secondary }} variant="bodySmall">pulsa para usar camara</Text>
                    {/* contenedor encabezado qr */}
                    {
                        <ToggleContainerAnimated 
                            className="absolute w-full h-full rounded-xl flex flex-col justify-center items-center p-5" 
                            style={{ backgroundColor: theme.colors.outline }}
                            visible={(listadoArticulosRuta?.cabecera ?? null) ? true : false}
                        >
                            <Icon source={'store'} size={45} color={theme.colors.background}/>
                            <Text style={{ color: theme.colors.background, textAlign: 'center', marginBottom: 10 }}>{ listadoArticulosRuta?.tienda_nombre ?? '??' }</Text>
                            <Text variant="bodySmall" style={{ color: theme.colors.background, textAlign: 'center' }}>Serie - { listadoArticulosRuta?.cabecera?.serie ?? '??' }</Text>
                            <Text variant="bodySmall" style={{ color: theme.colors.background, textAlign: 'center' }}>Ticket - { listadoArticulosRuta?.cabecera?.id_pedido ?? '??' }</Text>
                            <Text variant="bodySmall" style={{ color: theme.colors.background, textAlign: 'center' }}>Fecha - { listadoArticulosRuta?.cabecera?.fecha_entrega ?? '??' }</Text>
                        </ToggleContainerAnimated>
                        // (listadoArticulosRuta?.cabecera ?? null) && (
                        //     <View 
                        //         className="absolute w-full h-full rounded-xl flex flex-col justify-center items-center p-5" 
                        //         style={{ backgroundColor: theme.colors.outline }}
                        //     >
                        //         <Icon source={'store'} size={45} color={theme.colors.background}/>
                        //         <Text style={{ color: theme.colors.background, textAlign: 'center', marginBottom: 10 }}>{ listadoArticulosRuta?.tienda_nombre ?? '??' }</Text>
                        //         <Text variant="bodySmall" style={{ color: theme.colors.background, textAlign: 'center' }}>Serie - { listadoArticulosRuta?.cabecera?.serie ?? '??' }</Text>
                        //         <Text variant="bodySmall" style={{ color: theme.colors.background, textAlign: 'center' }}>Ticket - { listadoArticulosRuta?.cabecera?.id_pedido ?? '??' }</Text>
                        //         <Text variant="bodySmall" style={{ color: theme.colors.background, textAlign: 'center' }}>Fecha - { listadoArticulosRuta?.cabecera?.fecha_entrega ?? '??' }</Text>
                        //     </View>
                        // )
                    }
                </View>
            </TouchRipple>
        </View>
        // </Pressable>
    )
}