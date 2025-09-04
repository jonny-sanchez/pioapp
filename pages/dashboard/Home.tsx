import { Text } from "react-native-paper"
import ScrollViewContainer from "components/container/ScrollViewContainer"
import FabFloating from "components/container/FabFloating"
import { NavigationService } from "helpers/navigator/navigationScreens" 

export default function Home(){

    return (
        <>  
            <FabFloating onPress={() => NavigationService.navigate('SaveVisitas') }/>

            <ScrollViewContainer>
                <Text>fdsfdfdsf</Text>
                <Text>fdsfdfdsf</Text>
            </ScrollViewContainer>

        </>
    )
}