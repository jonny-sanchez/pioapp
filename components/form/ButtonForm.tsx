import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

type ButtonFormProps = {
    label?: string;
    icon?: string;
    onPress?: ((e: GestureResponderEvent) => void);
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

export default function ButtonForm({
    label = '',
    onPress = () => {},
    icon = '',
    loading = false,
    disabled = false,
    style = { paddingVertical: 8, borderRadius: 5 }
} : ButtonFormProps){

    return (
        <Button 
            loading={loading} 
            disabled={disabled}  
            mode='contained' 
            icon={`${icon}`} 
            onPress={onPress} 
            style={[ style ]}
        > 
            { label } 
        </Button>
    );
}