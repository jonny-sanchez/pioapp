import { View } from 'react-native'
import ScrollViewContainer from "components/container/ScrollViewContainer"
import FabFloating from "components/container/FabFloating"
import { NavigationService } from "helpers/navigator/navigationScreens" 
import TextInfo from "components/typografy/TextInfo"
import CardTitle from 'components/Cards/CardTitle'

export default function Home(){

    return (
        <>  
            <FabFloating onPress={() => NavigationService.navigate('SaveVisitas') }/>

            <ScrollViewContainer>
                <View className='w-full mt-6'>
                    <TextInfo style={{ textAlign: 'justify' }}>La pioapp es una plataforma diseñada para brindarle una gestión administrativa eficiente, segura y organizada. Nuestro objetivo es facilitar sus procesos y optimizar la toma de decisiones.</TextInfo>
                    <CardTitle/>
                </View>
            </ScrollViewContainer>

        </>
    )
}