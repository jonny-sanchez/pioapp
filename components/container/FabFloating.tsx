import { StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

type FabFLoatingProps = {
    icon?: string; 
    onPress?: () => void;
    label?: string;
    visible?: boolean;
    disabled?: boolean;
}

export default function FabFloating({
    icon = 'plus',
    onPress = () => {},
    label,
    visible = true,
    disabled = false
} : FabFLoatingProps){

    const theme = useTheme()

    return (
        <FAB
          disabled={disabled}
          icon={icon}
          color={theme.colors.surface}
          label={label}
          visible={visible}
          style={[
            styles.fab,
            {
              ...(disabled ? {} : { backgroundColor: theme.colors.primary }),
              padding: 5
            }
          ]}
          onPress={onPress}
        />
    )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0,
    zIndex: 10
  },
})