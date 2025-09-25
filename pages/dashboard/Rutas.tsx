import ScrollViewContainer from "components/container/ScrollViewContainer"
import { View } from "react-native"
import DataTableInfo from "components/tables/DataTableInfo"
import configTableRutas from "helpers/tables/configTableRutas"
import { useRef, useState } from "react"
import { Modalize } from "react-native-modalize"
import ModalizeComponent from "components/Modals/ModalizeComponent"
import PageLayout from "components/Layouts/PageLayout"

export default function Rutas() {

    const [rutas, setRutas] = useState([
        {
            nombre_tienda: 'PANAJACHEL 1',
            status_ruta: 1
        },
        {
            nombre_tienda: 'PANAJACHEL 1',
            status_ruta: 1
        },
        {
            nombre_tienda: 'PANAJACHEL 1',
            status_ruta: 1
        },
    ])

    const modalizeRef = useRef<Modalize>(null)

    const onOpen = () => modalizeRef.current?.open()

    return (
        <>
            <ModalizeComponent 
                // onOpen={onOpen}
                title="Filtros"
                modalizeRef={modalizeRef}
            >

            </ModalizeComponent>

            <PageLayout titleAppBar="Rutas">
                <ScrollViewContainer paddingHorizontal={0}>
                    <View className="w-full mt-6">
                        <DataTableInfo
                            search={true}
                            filter={true}
                            pagination={false}
                            configTable={configTableRutas}
                            data={rutas}
                            onPressFilter={onOpen}
                        />
                    </View>
                </ScrollViewContainer>
            </PageLayout>
        </>
    )
}