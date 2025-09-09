import ScrollViewContainer from "components/container/ScrollViewContainer"
import { View } from "react-native"
import DataTableInfo from "components/tables/DataTableInfo"
import configTableRutas from "helpers/tables/configTableRutas"
import { useState } from "react"

export default function Rutas() {

    const [rutas, setRutas] = useState([
        {
            nombre_tienda: 'PANAJACHEL 1',
            status_ruta: 1
        }
    ])

    return (
        <>
            <ScrollViewContainer paddingHorizontal={0}>
                <View className="w-full mt-6">
                    <DataTableInfo
                        search={true}
                        filter={true}
                        pagination={true}
                        configTable={configTableRutas}
                        data={rutas}
                    />
                </View>
            </ScrollViewContainer>
        </>
    )
}