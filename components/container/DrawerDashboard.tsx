import React, { useEffect, useRef } from 'react';
import { Modal, Portal, Text, useTheme, Avatar  } from 'react-native-paper';
import globalState from 'helpers/states/globalState';
import { View, Animated, Dimensions, StyleSheet, TouchableWithoutFeedback  } from 'react-native';
import ButtonForm from 'components/form/ButtonForm';

export default function DrawerDashboard () {

    const { drawer, setCloseDrawer } = globalState()

    const screenWidth = Dimensions.get('window').width

    const translateX = useRef(new Animated.Value(screenWidth)).current

    const theme = useTheme()

    useEffect(() => {
      Animated.timing(translateX, {
        toValue: drawer ? 0 : screenWidth,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }, [drawer])


    return (
        <Portal>
            <Modal
                visible={drawer}
                onDismiss={setCloseDrawer}
                contentContainerStyle={styles.container}>

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
                    <View className='w-full flex flex-row gap-4 items-center'>

                        <Avatar.Image size={80} source={require('assets/images/default-user.jpg')} />

                        <View>
                            <Text variant='bodyLarge'>Diego Guevara</Text>
                            <Text variant='labelSmall' style={{ color: theme.colors.secondary }}>AL5117</Text>
                        </View>

                    </View>
                    
                        
                    <View className='w-full'><ButtonForm label='Cerrar sesion'/></View>    


                </Animated.View>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '75%',
    height: '100%',
    paddingHorizontal: 25,
    paddingVertical: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  overlay: {
    flex: 1,
  },
});