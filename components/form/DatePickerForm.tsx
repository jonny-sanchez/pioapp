import { useState } from "react";
import { Controller } from "react-hook-form"
import { View, Platform } from "react-native"
import DatePicker from 'react-native-date-picker'
import { TextInput, HelperText, useTheme } from "react-native-paper";
import { formatDate } from "helpers/fechas/fechasHelper";
import globalState from "helpers/states/globalState";

type DatePickerFormProps= {
    control: any;
    name: string;
    errors?: any;
    disabled?: boolean;
    mode?: "date" | "time" | "datetime" | undefined
}

export default function DatePickerForm({
    control,
    name = '',
    errors = {},
    disabled = false,
    mode = 'date'
} : DatePickerFormProps) {

    const { dark } = globalState()

    const [ open, setOpen ] = useState<boolean>(false)

    const errorMessage = errors[name || ""]?.message || ""

    return (
        <View>
            <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                    <View>
                        {
                            Platform.OS == 'web' ?
                             <TextInput
                                mode="flat"
                                disabled={disabled}
                                label="Selecciona fecha"
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                // right={<TextInput.Icon disabled={disabled} icon="calendar" onPress={() => setOpen(true)}/>}
                            />
                             :
                            <>
                                <TextInput
                                    mode="flat"
                                    disabled={disabled}
                                    label="Selecciona fecha"
                                    value={value ? formatDate(value) : ''}
                                    onFocus={() => setOpen(true)} 
                                    showSoftInputOnFocus={false} 
                                    onBlur={onBlur}
                                    right={<TextInput.Icon disabled={disabled} icon="calendar" onPress={() => setOpen(true)}/>}
                                />
                                <DatePicker
                                    modal
                                    open={open}
                                    date={value || new Date()}
                                    mode={mode}
                                    locale="es"
                                    onConfirm={(date)=>{
                                        onChange(date)
                                        setOpen(false)
                                    }}
                                    onCancel={()=> setOpen(false)}
                                    theme={ dark ? 'dark' : 'light'}
                                />
                            </>
                        }
                       
                    </View>
                )}
            />
            { errorMessage && <HelperText type="error" visible={errorMessage ? true : false}>{ errorMessage }</HelperText> }
        </View>
    )
}