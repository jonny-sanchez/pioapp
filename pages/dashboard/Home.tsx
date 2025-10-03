import { View } from 'react-native'
// import { BottomNavKey from 'helpers/navigator/bottomNavigator'
import BoxImage from 'components/container/BoxImage'
import PageLayout from 'components/Layouts/PageLayout'
import { useEffect } from 'react'
import { generateJsonError, ResponseService } from 'types/RequestType'
import { AJAX, URLPIOAPP } from 'helpers/http/ajax'
import alertsState from 'helpers/states/alertsState'
import globalState from 'helpers/states/globalState'
import { orderRoutersMenu } from 'helpers/Global/HomeGlobalHelper'
import menuRouterState from 'helpers/states/menuRouterState'

export type PermissionMenuType = {
    id_permission_menu?: number;
    id_categorias_menu?: number;
    id_menu_app?: number;
    id_rol?: number;
    id_type_menu?: number;
    name_category?: string;
    name_rol?: string;
    name_route?: string;
    name_type_menu?: string;
    title?: string;
}

export default function Home(){

    const { openVisibleSnackBar } = alertsState()
    const { setOpenScreenLoading, setCloseScreenLoading } = globalState()
    const { setRouterMenu } = menuRouterState()

    const getMenusPermisssion = async():Promise<ResponseService<PermissionMenuType[]>> => {
        try {
            const result:ResponseService<PermissionMenuType[]> = await AJAX(`${URLPIOAPP}/permissions/all`, 'GET')
            return result
        } catch (error:any) {
            openVisibleSnackBar(`${error}`, 'error')
            return generateJsonError(`${error}`, 'array')
        }
    }

    const initalize = async() => {
        setOpenScreenLoading()
        const resultPermisos = await getMenusPermisssion()
        const dataOrder:any = orderRoutersMenu(resultPermisos.data as PermissionMenuType[])
        // console.log(dataOrder)
        setRouterMenu(dataOrder)
        setCloseScreenLoading()
    }

    useEffect(() => { initalize() }, [])

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