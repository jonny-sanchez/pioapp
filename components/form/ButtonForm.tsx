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
    className?: string;
    textColor?: string | undefined;
}

export default function ButtonForm({
    label = '',
    onPress = () => {},
    icon = '',
    loading = false,
    disabled = false,
    style = { },
    buttonColor,
    className = '',
    textColor
} : ButtonFormProps){

    const theme = useTheme()

    return (
        <Button 
            className={className}
            loading={loading} 
            disabled={disabled}  
            mode='contained' 
            icon={`${icon}`} 
            onPress={onPress} 
            buttonColor={buttonColor}
            contentStyle={{ paddingVertical: 8 }}
            style={[ { 
                borderRadius: 5, 
                // paddingVertical: 8
            }, style ]}
            textColor={textColor}
        > 
            { label }
            {/* { marginVertical: 8, marginHorizontal: 8, padding: 0 } */}
            {/* { label ? label : <Icon source={icon} size={18} color={theme.colors.onPrimary}/> }  */}
        </Button> 
    );
}