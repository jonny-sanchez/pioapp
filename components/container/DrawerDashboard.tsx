import React, { useEffect, useRef, useState } from 'react';
import { Modal, Portal, Text, useTheme, Avatar, Drawer } from 'react-native-paper';
import globalState from 'helpers/states/globalState';
import { View, Animated, Dimensions, StyleSheet, TouchableWithoutFeedback  } from 'react-native';
import ButtonForm from 'components/form/ButtonForm';
// import bottomNavigation from 'helpers/navigator/bottomNavigator';
// import { NavigationService, currentRouteName } from 'helpers/navigator/navigationScreens';
// import routers from 'helpers/navigator/routers';
import { logout } from 'helpers/authHelper/authHelper';
import { getValueStorage } from 'helpers/store/storeApp';
import menuRouterState, { RouterGrouped } from 'helpers/states/menuRouterState';
import { currentRouteName, NavigationService } from 'helpers/navigator/navigationScreens';
// import { useRoute } from '@react-navigation/native';

export default function DrawerDashboard () {

    const { drawer, setCloseDrawer, indexNavigation } = globalState()
    
    const { routerMenu } = menuRouterState()

    const [ visible, setVisible ] = useState<boolean>(drawer)

    const screenWidth = Dimensions.get('window').width

    const translateX = useRef(new Animated.Value(screenWidth)).current

    const theme = useTheme()

    const userSession = getValueStorage('user')

    // const router = useRoute()

    useEffect(() => {
      drawer && setVisible(drawer)
      Animated.timing(translateX, {
        toValue: drawer ? 0 : screenWidth,
        duration: 200,
        useNativeDriver: true,
      }).start(() => { !drawer && setVisible(drawer) })
    }, [drawer])

    if(!visible) return null

    return (
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={setCloseDrawer}><View style={styles.overlay} /></TouchableWithoutFeedback>
            <Animated.View
                style={[
                  styles.drawer,
                  {
                    backgroundColor: theme.colors.background,
                    transform: [{ translateX }],
                  },
                ]}
            >
              <View>
                <View className='w-full flex flex-row gap-4 items-center py-[30] px-[25]'>
                    <Avatar.Image size={80} source={require('assets/images/default-user.jpg')} />
                    <View>
                        <Text variant='bodyLarge'>{ `${userSession?.first_name || ''} ${userSession?.first_last_name || ''}` }</Text>
                        <Text variant='bodySmall' style={{ color: theme.colors.primary }}>{ userSession?.puesto_trabajo || ' -- ' }</Text>
                        <Text variant='labelSmall' style={{ color: theme.colors.secondary }}>{ userSession?.codigo_user || '--' }</Text>
                    </View>
                </View>
                
                {/* Section menu bootom */}
                {
                  Object.entries(routerMenu as RouterGrouped).map(([key, value], index) => (
                    <Drawer.Section key={index} className='w-full' title={key}>
                      {
                        value.map((elRouter, i) => (
                          <Drawer.Item
                            key={i}
                            label={elRouter?.title || ''}
                            icon={elRouter?.icon}
                            disabled={elRouter.name === currentRouteName}
                            active={elRouter.name === currentRouteName}
                            onPress={() => {
                              setCloseDrawer()
                              setTimeout(() => NavigationService.reset(elRouter.name), 200)
                            }}
                          />
                        ))
                      }
                    </Drawer.Section>
                  ))
                }

              </View>      
              <View className='w-full py-[30] px-[25]'>
                <ButtonForm 
                  onPress={()=>{
                    setCloseDrawer()
                    logout()
                    // setTimeout(() => NavigationService.reset('Login'), 200)
                  }}
                  label='Cerrar sesion'
                />
              </View>    
            </Animated.View>
          </View>
    )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999, 
    // flex: 1,
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '75%',
    height: '100%',
    // paddingHorizontal: 25,
    // paddingVertical: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
});