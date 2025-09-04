import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Control, Controller, FieldValues } from 'react-hook-form'
import { View, TextInput as RNTextInput } from 'react-native'
import { Text, useTheme, HelperText } from 'react-native-paper';

type InputProps = {
    label?: string;
    placeholder?: string;
    maxLength?: number;
    // error?: boolean;
    isPassword?: boolean;
    control: any; 
    name: string;
    errors?: any;  
}

export default function InputFormHook({
    label = '',
    placeholder = '',
    maxLength = 50,
    // error = false,
    isPassword = false,
    control,
    name,
    errors = {}
} : InputProps){

    // const theme = useTheme()

    const [viewPassword, setViewPassword] = useState(isPassword)

    const maxLengthComponent = (value: any) => { return (<TextInput.Affix text={`${value?.length || 0 }/${maxLength}`}/>) }

    const passwordViewComponent = (<TextInput.Icon onPress={ () => setViewPassword(!viewPassword) } icon={ viewPassword ? 'eye-off' : 'eye' } />)

    const errorMessage = errors[name || ""]?.message || ""

    return (
        <View>
            <Controller 
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="flat"
                      label={label}
                      placeholder={placeholder}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={viewPassword}
                      right={isPassword ? passwordViewComponent : maxLengthComponent(value)}
                      maxLength={maxLength}
                      error={errorMessage ? true : false}
                    />
                )}
            />
            
            <HelperText type="error" style={{ display: errorMessage ? 'flex' : 'none' }} visible={errorMessage ? true : false}>{ errorMessage }</HelperText>
        </View>
    );
}