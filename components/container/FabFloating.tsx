import { StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

type FabFLoatingProps = {
    icon?: string; 
    onPress?: () => void;
}

export default function FabFloating({
    icon = 'plus',
    onPress = () => {}
} : FabFLoatingProps){

    const theme = useTheme()

    return (
        <FAB
          icon={icon}
          style={[
            styles.fab,
            {
                backgroundColor: theme.colors.secondaryContainer
            }
          ]}
          onPress={onPress}
        />
    )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 10
  },
})