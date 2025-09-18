import React, { useEffect, useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import AppBarHome from "components/container/AppBarHome"
import bottomNavigator, { getIndexByKey, BottomNavKey } from 'helpers/navigator/bottomNavigator';
import DrawerDashboard from 'components/container/DrawerDashboard';
import { useRoute, RouteProp } from '@react-navigation/native';
import globalState from 'helpers/states/globalState';

type RouteParams = {
    keyIndex?: BottomNavKey;
};

type BottomNavItem = typeof bottomNavigator[number];

export default function Inicio(){

    const { setIndexNavigation } = globalState()

    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();

    const keyIndex = route.params?.keyIndex;

    const keyNav = getIndexByKey(keyIndex ?? 'home');

    const [ index, setIndex ] = useState(keyNav)

    // const [ routes ] = useState<BottomNavItem[]>(bottomNavigator)
    const routes:BottomNavItem[] = [...bottomNavigator.slice(0, 4)]

    const renderScene = BottomNavigation.SceneMap(routes.reduce((acc:any, item)=>{ 
        acc[item.key] = item.element
        return acc
    }, {}))

    useEffect(()=> setIndexNavigation(index), [index])

    return (
        <>
            <DrawerDashboard/>  
            <AppBarHome title={routes[index]?.appBarTitle || ''}/>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            /> 
        </>       
    )
}