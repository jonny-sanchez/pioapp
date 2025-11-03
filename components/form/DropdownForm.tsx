import { Dropdown } from 'react-native-element-dropdown';
import { useTheme, HelperText } from 'react-native-paper'
import { Controller } from 'react-hook-form'
import { View } from 'react-native'
import Option from 'types/Dropdown/Option';

type DropdownFormProps = {
    label?: string;
    data?: Option[];
    // value?: any;
    control: any;
    name: string;
    errors?: any;
    disable?: boolean;
    onChangeExtra?: (item: any) => void;
    onFocus?: (() => void) | undefined;
    loading?: boolean;
}

export default function DropdownForm({
    label = '',
    data = [],
    // value = '',
    control,
    name,
    errors = {},
    disable = false,
    onChangeExtra,
    onFocus,
    loading
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
                        disable={disable}
                        mode='modal'
                        // data={data}
                        data={loading ? [ { value: '', label: '...Cargando' } ] : data}
                        value={value ?? ""}
                        valueField='value'
                        placeholder={label}
                        labelField='label'
                        search
                        searchPlaceholder='Buscar...'
                        // onChange={onChange}
                        onChange={item => {
                            onChange(item.value)
                            if(onChangeExtra) onChangeExtra(item)
                        }}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        // onChange={item => setValue(item?.value || "")}
                        containerStyle={{ backgroundColor: theme.colors.background }}
                        // itemContainerStyle={{ backgroundColor: theme.colors.surfaceVariant }}
                        itemTextStyle={{ color: theme.colors.onBackground }}
                        activeColor={theme.colors.surfaceVariant}
                        // inputSearchStyle
                        // searchPlaceholderTextColor={theme.colors.onBackground}
                        // searchPlaceholderTextColor
                        backgroundColor='rgba(0,0,0,0.5)'
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
                            ...(disable && {opacity: 0.5})
                        }}
                    />
                )}
            />

            { errorMessage && <HelperText type="error" visible={errorMessage ? true : false}>{ errorMessage }</HelperText> }
        </View>
    )

}