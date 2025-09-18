import { IconButton, useTheme } from 'react-native-paper';

type IconButtomFormProps = {
    icon?: string;
}

export default function IconButtomForm({
    icon = ''
} : IconButtomFormProps) {

    const theme = useTheme()
    
    return (
        <IconButton icon={icon} size={18} mode='contained-tonal' iconColor={theme.colors.onPrimary}  containerColor={theme.colors.primary}/>
    )
}