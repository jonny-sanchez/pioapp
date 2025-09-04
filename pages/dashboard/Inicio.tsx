import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import AppBarHome from "components/container/AppBarHome"
import bottomNavigator from 'helpers/navigator/bottomNavigator';
import DrawerDashboard from 'components/container/DrawerDashboard';

export default function Inicio(){

    const [ index, setIndex ] = useState(0)

    const [ routes ] = useState(bottomNavigator)

    const renderScene = BottomNavigation.SceneMap(routes.reduce((acc:any, item)=>{ 
        acc[item.key] = item.element
        return acc
    }, {}))

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