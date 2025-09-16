import { Dropdown } from 'react-native-element-dropdown';
import { useTheme, HelperText } from 'react-native-paper'
import { Controller } from 'react-hook-form'
import { View } from 'react-native'

interface Option {
    label: string;
    value: any; 
}

type DropdownFormProps = {
    label?: string;
    data?: Option[];
    // value?: any;
    control: any;
    name: string;
    errors?: any;
}

export default function DropdownForm({
    label = '',
    data = [],
    // value = '',
    control,
    name,
    errors = {}
} : DropdownFormProps){
    
    const theme = useTheme()

    const errorMessage = errors[name || ""]?.message || ""

    return (
        <View>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Dropdown 
                        mode='modal'
                        data={data}
                        value={value ?? ""}
                        valueField='value'
                        placeholder={label}
                        labelField='label'
                        search
                        searchPlaceholder='Buscar...'
                        // onChange={onChange}
                        onChange={item => onChange(item.value)}
                        onBlur={onBlur}
                        // onChange={item => setValue(item?.value || "")}
                        containerStyle={{ backgroundColor: theme.colors.background }}
                        // itemContainerStyle={{ backgroundColor: theme.colors.surfaceVariant }}
                        itemTextStyle={{ color: theme.colors.onBackground }}
                        activeColor={theme.colors.surfaceVariant}
                        // inputSearchStyle
                        // searchPlaceholderTextColor={theme.colors.onBackground}
                        // searchPlaceholderTextColor
                        // backgroundColor
                        placeholderStyle={{ color: theme.colors.secondary }}
                        fontFamily='Inter_900Black'
                        // selectedStyle
                        selectedTextStyle={{ color: theme.colors.onBackground }}
                        inputSearchStyle={{ color: theme.colors.onBackground }}
                        style={{ 
                            backgroundColor: theme.colors.surfaceVariant, 
                            height: 55, 
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                            borderBottomWidth: 0.6,
                            borderColor: theme.colors.secondary,
                            borderTopEndRadius: 4,
                            borderTopStartRadius: 4,
                        }}
                    />
                )}
            />

            { errorMessage && <HelperText type="error" visible={errorMessage ? true : false}>{ errorMessage }</HelperText> }
        </View>
    )

}