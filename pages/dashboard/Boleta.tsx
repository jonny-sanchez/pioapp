import ScrollViewContainer from "components/container/ScrollViewContainer"
import { View } from "react-native"
import DataTableInfo from "components/tables/DataTableInfo"

export default function Boleta(){

    return (
        <>
            <ScrollViewContainer paddingHorizontal={0}>
                <View className="w-full mt-6">
                    <DataTableInfo
                        pagination={true}
                        filter={true} 
                    />
                </View>
            </ScrollViewContainer>
        </>
    )
}