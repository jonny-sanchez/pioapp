import { useEffect } from "react";
import { BackHandler, StyleProp, View, ViewStyle } from "react-native";
import { Button, Divider, Menu } from "react-native-paper";

type MenuComponentType = {
    visible?: boolean; 
    onDismiss?: (() => void) | undefined;
    anchor?: React.ReactNode | {
        x: number;
        y: number;
    };
    children?: React.ReactNode;
    styleContainer?: StyleProp<ViewStyle>
}

export default function MenuComponent({
    visible = false,
    onDismiss,
    anchor,
    children,
    styleContainer
} : MenuComponentType) {

    const onBackPress = () => {
      if (visible) {
        // solo cambia el estado → la animación ya se ejecuta sola
        onDismiss?.()  
        return true; // bloquea navegación atrás
      }
      return false;
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
          )
          return () => backHandler.remove()
    }, [visible])

    return (
        <>
            <View
              style={[styleContainer]}
              >
              <Menu
                mode="elevated"
                visible={visible}
                onDismiss={onDismiss}
                anchor={anchor}
                >
                    { children }
              </Menu>
            </View>
        </>
    )
}