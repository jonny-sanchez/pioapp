import { View } from 'react-native'
import ScrollViewContainer from "components/container/ScrollViewContainer"
import FabFloating from "components/container/FabFloating"
import { NavigationService } from "helpers/navigator/navigationScreens" 
import TextInfo from "components/typografy/TextInfo"
import CardTitle from 'components/Cards/CardTitle'

export default function Home(){

    return (
        <>  
            {/* <FabFloating onPress={() => NavigationService.navigate('SaveVisitas') }/> */}

            <ScrollViewContainer>

                <View className='w-full mt-6 flex flex-col gap-6'>

                    <TextInfo style={{ textAlign: 'justify' }}>La pioapp es una plataforma diseñada para brindarle una gestión administrativa eficiente, segura y organizada. Nuestro objetivo es facilitar sus procesos y optimizar la toma de decisiones.</TextInfo>
                    
                    <View className='flex flex-col w-full flex-wrap gap-2'>

                        <CardTitle style={{ width: '100%' }} icon='truck' title='Rutas'/>

                        <CardTitle style={{ width: '100%' }} icon='storefront' title='Visitas Tienda'/>
                        
                        <CardTitle style={{ width: '100%' }} icon='file-sign' title='Boleta de pago'/>
                        
                    </View>
                </View>

            </ScrollViewContainer>

        </>
    )
}