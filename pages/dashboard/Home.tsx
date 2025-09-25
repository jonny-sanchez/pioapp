import { View } from 'react-native'
import ScrollViewContainer from "components/container/ScrollViewContainer"
import FabFloating from "components/container/FabFloating"
import { NavigationService } from "helpers/navigator/navigationScreens" 
import TextInfo from "components/typografy/TextInfo"
import CardTitle from 'components/Cards/CardTitle'
// import { BottomNavKey from 'helpers/navigator/bottomNavigator'
import bottomNavigation from 'helpers/navigator/bottomNavigator'
import BoxImage from 'components/container/BoxImage'
import Title from 'components/typografy/Title'
import PageLayout from 'components/Layouts/PageLayout'

export default function Home(){

    return (
        <>  
            <PageLayout>
            {/* <FabFloating onPress={() => NavigationService.navigate('SaveVisitas') }/> */}

            {/* <ScrollViewContainer> */}

                <View className='w-full mt-6 flex flex-col gap-6 flex-1 items-center justify-center px-[35]'>

                    <BoxImage width={250} height={250} img={require('assets/images/LOGOPINULITOORIGINAL.png')}/>
                    {/* <Title>PIOAPP</Title>
                    <TextInfo style={{ textAlign: 'justify' }}>La pioapp es una plataforma diseñada para brindarle una gestión administrativa eficiente, segura y organizada.</TextInfo> */}

                    {/* <TextInfo style={{ textAlign: 'justify' }}>La pioapp es una plataforma diseñada para brindarle una gestión administrativa eficiente, segura y organizada. Nuestro objetivo es facilitar sus procesos y optimizar la toma de decisiones.</TextInfo>
                    
                    <View className='flex flex-col w-full flex-wrap gap-2'>

                        { 
                            (bottomNavigation.slice(1, 4) ?? []).map( (el, i) => (
                                <CardTitle 
                                    key={i} 
                                    style={{ width:'100%' }} 
                                    icon={el.focusedIcon} 
                                    title={el.title}
                                    onPress={ () => NavigationService.reset('Home', { keyIndex: el.key }) }
                                />
                            )) 
                        }
                        
                    </View> */}
                </View>

            {/* </ScrollViewContainer> */}
            </PageLayout>

        </>
    )
}