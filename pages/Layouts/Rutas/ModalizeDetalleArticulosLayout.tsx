import CardTitle from "components/Cards/CardTitle";
import ScrollViewContainer from "components/container/ScrollViewContainer";
import ListItemComponent from "components/List/ListItemComponent";
import ModalizeComponent from "components/Modals/ModalizeComponent";
import ListArticulosDetalleSkeleton from "components/Skeletons/ListArticulosDetalleSkeleton";
import { AJAX, URLPIOAPP } from "helpers/http/ajax";
import alertsState from "helpers/states/alertsState";
import detalleArticulosState from "helpers/states/detalleArticulosState";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { generateJsonError, ResponseService } from "types/RequestType";
import ArticuloRutaType from "types/Rutas/ArticuloRutaType";

type ModalizeDetalleArticulosLayoutType = {
    modalizeRef?: any;
}

export default function ModalizeDetalleArticulosLayout({
    modalizeRef
} : ModalizeDetalleArticulosLayoutType) {

    const { openVisibleSnackBar } = alertsState()
    const  { rutaDetalle, loadingSkeletetonArticulos, setLoadingSkeletetonArticulos } = detalleArticulosState()
    const [articulosRuta, setArticulosRuta] = useState<ArticuloRutaType[]>([]);
    const [totalCantidadArticulos, setTotalCantidadArticulos] = useState<number>(0)
    const [isAtTop, setIsAtTop] = useState(true);

    const getArticulos = async (id_pedido: number | null, serie:string|null):Promise<ResponseService<ArticuloRutaType[]>> => {
        try {
            if(!id_pedido || !serie) return generateJsonError(`id Pedido o Serie no enviada`, 'array')
            const result:ResponseService<ArticuloRutaType[]> = await AJAX(`${ URLPIOAPP }/articulos/ruta/list?id_pedido=${ id_pedido }&serie=${serie}`)
            return result
        } catch (error) {
            openVisibleSnackBar(`${error}`, 'error')
            return generateJsonError(`${error}`, "array")
        }
    }

    const calcTotalArticulosRuta = ():number => {
        let total:number = 0
        articulosRuta.forEach(({ cantidad })=> total += cantidad)
        return total
    }

    const renderItemsArticulos = async() => {
        const id_pedido:number|null = rutaDetalle?.id_pedido || null
        const serie:string|null = rutaDetalle?.serie || null
        setLoadingSkeletetonArticulos(true)
        const resultArticulos = await getArticulos(id_pedido, serie)
        setArticulosRuta(resultArticulos.data as ArticuloRutaType[])
        setLoadingSkeletetonArticulos(false)
    }

    useEffect(() => {
        renderItemsArticulos()
    }, [rutaDetalle])

    useEffect(() => {
        const total:number = calcTotalArticulosRuta()
        setTotalCantidadArticulos(total)
    }, [articulosRuta])

    return (
        <>
            <ModalizeComponent
                panGestureEnabled={isAtTop}
                closeOnOverlayTap={true}
                scrollViewProps={{
                    onScroll: (e) => {
                        const y = e.nativeEvent.contentOffset.y;
                        setIsAtTop(y <= 0);
                    },
                    scrollEventThrottle: 16
                }}
                modalizeRef={modalizeRef}
                title="Detalle de ruta"
                footerComponent={
                    <View className="w-full flex flex-row items-center justify-between"> 
                        <Text>Total:</Text>
                        <Text>{ loadingSkeletetonArticulos ? '...cargando' : `${totalCantidadArticulos}`}</Text>
                    </View>
                }
            >
                <View className="">
                    {
                        loadingSkeletetonArticulos ?
                        <ListArticulosDetalleSkeleton/> :
                        <View>
                            <CardTitle icon="truck" title={`${rutaDetalle?.serie}`} subtitle={`${rutaDetalle?.id_pedido}`} style={{ width: '100%' }}/>
                            { 
                                articulosRuta.map((el, index) => (
                                    <ListItemComponent 
                                        key={index}
                                        styleList={{ width: '100%' }}
                                        title={`${el.nombre_articulo}`} 
                                        description={`${el.codigo_articulo} ${el.description}`}
                                        rightElements={ 
                                            <>
                                                <Text>{ el?.cantidad || 0 }</Text>
                                            </> 
                                        }
                                    />
                                )) 
                            }
                        </View>
                    }
                </View>
            </ModalizeComponent>
        </>
    )
}