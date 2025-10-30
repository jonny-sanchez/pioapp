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

    const getArticulos = async (id_pedido: number | null):Promise<ResponseService<ArticuloRutaType[]>> => {
        try {
            if(!id_pedido) return generateJsonError(`No id pedido.`, 'array')
            const result:ResponseService<ArticuloRutaType[]> = await AJAX(`${ URLPIOAPP }/articulos/ruta/list?id_pedido=${ id_pedido }`)
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
        setLoadingSkeletetonArticulos(true)
        const resultArticulos = await getArticulos(id_pedido)
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
                            { 
                                articulosRuta.map((el, index) => (
                                    <ListItemComponent 
                                        key={index}
                                        styleList={{ width: '100%' }}
                                        title={`${el.codigo_articulo} ${el.nombre_articulo}`} 
                                        description={`${el.description}`}
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