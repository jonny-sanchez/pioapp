import { Controller } from "react-hook-form";
import { View } from 'react-native'
import { Checkbox } from 'react-native-paper'

type CheckBoxFormProps = {
    name: string;
    control: any;
    label?: string;
    onChangeExtra?: (value:boolean)=> void | undefined;
    disabled?: boolean;
    color?: string;
}

export default function CheckBoxForm({
    name,
    control,
    label = '',
    onChangeExtra,
    disabled = false,
    color
} : CheckBoxFormProps) {

    return (
        <View>
            <Controller
                name={name}
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                    <View className="w-full">
                        <Checkbox.Item 
                            color={color}
                            disabled={disabled}
                            mode="android"
                            label={label} 
                            status={value ? "checked" : "unchecked"}
                            onPress={() => {
                                const newValue = !value
                                onChange(newValue)
                                if(onChangeExtra) onChangeExtra(newValue)
                            }}
                        />
                    </View>
                )}
            />
        </View>
    )

}