import { StyleProp, ViewStyle } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

type IconButtomFormProps = {
    icon?: string;
    onPress?: () => void;
    modeButton?: "outlined" | "contained" | "contained-tonal",
    containerColor?: string;
    disabled?:boolean;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
    size?: number | undefined;
}

export default function IconButtomForm({
    icon = '',
    onPress = () => {},
    modeButton = 'contained-tonal',
    containerColor,
    disabled = false,
    loading = false,
    style,
    size = 18
} : IconButtomFormProps) {

    const theme = useTheme()
    
    return (
        <IconButton 
            style={[style]}
            loading={loading}
            disabled={disabled}
            icon={icon} 
            size={size} 
            mode={modeButton} 
            iconColor={theme.colors.onPrimary}  
            containerColor={containerColor ? containerColor : theme.colors.primary}
            onPress={onPress}
        />
    )
}