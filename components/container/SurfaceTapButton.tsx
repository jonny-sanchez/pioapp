import { Surface, Icon, Text } from "react-native-paper"
import { GestureResponderEvent, Pressable } from "react-native"

type SurfaceTapButtonProps = {
    icon?: string;
    title?: string;
    onPress?: ((event: GestureResponderEvent) => void) | null,
    disabled?: boolean;
}

export default function SurfaceTapButton({
    icon,
    title,
    onPress,
    disabled = false
} : SurfaceTapButtonProps){

    return (
      <>
        <Pressable onPress={disabled ? ()=>{} : onPress}>
          <Surface 
            style={{ 
              padding: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 5,
              borderRadius: 5,
              opacity: disabled ? 0.6 : 1
            }} 
            elevation={disabled ? 0 : 1}
          >
            <Icon source={icon} size={25}/>
            <Text>{ title }</Text>
          </Surface>
        </Pressable>
      </>
    )
}