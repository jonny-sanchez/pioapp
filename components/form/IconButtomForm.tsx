import { IconButton, useTheme } from 'react-native-paper';

type IconButtomFormProps = {
    icon?: string;
    onPress?: () => void;
}

export default function IconButtomForm({
    icon = '',
    onPress = () => {}
} : IconButtomFormProps) {

    const theme = useTheme()
    
    return (
        <IconButton 
            icon={icon} 
            size={18} 
            mode='contained-tonal' 
            iconColor={theme.colors.onPrimary}  
            containerColor={theme.colors.primary}
            onPress={onPress}
            />
    )
}