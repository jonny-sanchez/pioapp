import FabFloating from "components/container/FabFloating";
import ScrollViewContainer from "components/container/ScrollViewContainer";
import PageLayout from "components/Layouts/PageLayout";
import DataTableInfo from "components/tables/DataTableInfo";
import { NavigationService } from "helpers/navigator/navigationScreens";
import { View } from "react-native";

export default function DevolucionesListadoPage() {

    return (
        <>
            {/* flab floating */}
            <FabFloating 
                onPress={() => NavigationService.navigate('DevolucionCreacion')} 
                icon="plus" 
                label="Nueva devolucion" 
                visible
            />

            <PageLayout titleAppBar="Devoluciones">
                <ScrollViewContainer>
                    <View className="my-10">
                        <DataTableInfo
                            data={[]}
                            pagination
                            filter
                            search
                            configTable={[
                                {
                                    data: 'gfd',
                                    name: 'Hola'
                                }
                            ]}
                        />
                    </View>
                </ScrollViewContainer>
            </PageLayout>
        </>
    )
}