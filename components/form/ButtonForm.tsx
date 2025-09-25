import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { Button, Icon, useTheme, IconButton } from 'react-native-paper';

type ButtonFormProps = {
    label?: string;
    icon?: string;
    onPress?: ((e: GestureResponderEvent) => void);
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    buttonColor?: string;
}

export default function ButtonForm({
    label = '',
    onPress = () => {},
    icon = '',
    loading = false,
    disabled = false,
    style = { },
    buttonColor
} : ButtonFormProps){

    const theme = useTheme()

    return (
        <Button 
            loading={loading} 
            disabled={disabled}  
            mode='contained' 
            icon={`${icon}`} 
            onPress={onPress} 
            buttonColor={buttonColor}
            style={[ style, { borderRadius: 5, paddingVertical: 8 } ]}
        > 
            { label }
            {/* { marginVertical: 8, marginHorizontal: 8, padding: 0 } */}
            {/* { label ? label : <Icon source={icon} size={18} color={theme.colors.onPrimary}/> }  */}
        </Button> 
    );
}