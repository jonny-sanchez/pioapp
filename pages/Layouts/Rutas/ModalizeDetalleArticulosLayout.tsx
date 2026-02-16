import { getArticulos } from "Apis/ArticulosRuta/ArticulosRutaApi";
import AnimatedListItem from "components/Animaciones/AnimatedListItem";
import CardTitle from "components/Cards/CardTitle";
import ScrollViewContainer from "components/container/ScrollViewContainer";
import FlatListVirtualize from "components/List/FlatListVirtualize";
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

    const calcTotalArticulosRuta = ():number => {
        let total:number = 0
        articulosRuta.forEach(({ cantidad })=> total += cantidad)
        return total
    }

    const renderItemsArticulos = async() => {
        const id_pedido:number|null = rutaDetalle?.id_pedido || null
        const serie:string|null = rutaDetalle?.serie || null
        if(!id_pedido || !serie) return
        setLoadingSkeletetonArticulos(true)
        const resultArticulos = await getArticulos(id_pedido, serie)
        setArticulosRuta(resultArticulos.data as ArticuloRutaType[])
        setLoadingSkeletetonArticulos(false)
    }

    const clearHook = () => {
        setIsAtTop(true)
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
                onOpen={clearHook}
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
                            <CardTitle 
                                icon="truck" 
                                title={`${rutaDetalle?.serie}`} 
                                subtitle={`${rutaDetalle?.id_pedido}`} 
                                style={{ width: '100%' }}
                            />
                            <FlatListVirtualize
                                data={articulosRuta}
                                keyExtractor={(_, i) => i.toString()}
                                scrollEnabled={false}
                                renderItem={({ item, index }: { item: ArticuloRutaType; index: number }) => (
                                    <AnimatedListItem key={index} index={index}>
                                        <ListItemComponent 
                                            styleList={{ width: '100%' }}
                                            title={`${item.nombre_articulo}`} 
                                            description={`${item.codigo_articulo} ${item.description}`}
                                            rightElements={ 
                                                <>
                                                    <Text>{ item?.cantidad || 0 }</Text>
                                                </> 
                                            }
                                        />
                                    </AnimatedListItem>
                                )}
                            />
                        </View>
                    }
                </View>
            </ModalizeComponent>
        </>
    )
}