import { Controller } from "react-hook-form";
import { View } from 'react-native'
import { Checkbox } from 'react-native-paper'

type CheckBoxFormProps = {
    name: string;
    control: any;
    label?: string;
    onChangeExtra?: (value:boolean)=> void | undefined;
    disabled?: boolean;
}

export default function CheckBoxForm({
    name,
    control,
    label = '',
    onChangeExtra,
    disabled = false
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
                            disabled={disabled}
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