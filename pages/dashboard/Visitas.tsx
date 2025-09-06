import { Text } from "react-native-paper"
import ScrollViewContainer from "components/container/ScrollViewContainer"
import FabFloating from "components/container/FabFloating"
import { NavigationService } from "helpers/navigator/navigationScreens"
import DataTableInfo from "components/tables/DataTableInfo"
import { View } from 'react-native'

export default function Visitas(){

    const dataItemsTable = [
        {
          key: 1,
          name: 'Cupcake',
          calories: 356,
          fat: 16,
        },
        {
          key: 2,
          name: 'Eclair',
          calories: 262,
          fat: 16,
        },
        {
          key: 3,
          name: 'Frozen yogurt',
          calories: 159,
          fat: 6,
        },
        {
          key: 4,
          name: 'Gingerbread',
          calories: 305,
          fat: 3.7,
        },
    ]

    return (
        <>
            <FabFloating onPress={() => NavigationService.navigate('SaveVisitas') }/>

            <ScrollViewContainer paddingHorizontal={0}>

                <View className="w-full mt-6">
                    <DataTableInfo data={dataItemsTable}/>
                </View>                

            </ScrollViewContainer>
        </>
    )
}