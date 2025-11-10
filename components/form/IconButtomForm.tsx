import { IconButton, useTheme } from 'react-native-paper';

type IconButtomFormProps = {
    icon?: string;
    onPress?: () => void;
    modeButton?: "outlined" | "contained" | "contained-tonal",
    containerColor?: string;
    disabled?:boolean;
    loading?: boolean;
}

export default function IconButtomForm({
    icon = '',
    onPress = () => {},
    modeButton = 'contained-tonal',
    containerColor,
    disabled = false,
    loading = false
} : IconButtomFormProps) {

    const theme = useTheme()
    
    return (
        <IconButton 
            loading={loading}
            disabled={disabled}
            icon={icon} 
            size={18} 
            mode={modeButton} 
            iconColor={theme.colors.onPrimary}  
            containerColor={containerColor ? containerColor : theme.colors.primary}
            onPress={onPress}
        />
    )
}