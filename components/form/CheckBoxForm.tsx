import { Controller } from "react-hook-form";
import { StyleProp, View, ViewStyle } from 'react-native'
import { Checkbox } from 'react-native-paper'

type CheckBoxFormProps = {
    name: string;
    control: any;
    label?: string;
    onChangeExtra?: (value:boolean)=> void | undefined;
    disabled?: boolean;
    color?: string;
    positionLabel?: "trailing" | "leading" | undefined;
    className?: string | undefined;
    style?: StyleProp<ViewStyle>;
    onPress?: (value:boolean) => void|undefined
}

export default function CheckBoxForm({
    name,
    control,
    label = '',
    onChangeExtra,
    disabled = false,
    color,
    positionLabel = 'trailing',
    className = 'w-full',
    style,
    onPress
} : CheckBoxFormProps) {

    return (
        <View>
            <Controller
                name={name}
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                    <View className={className}>
                        <Checkbox.Item 
                            style={style}
                            color={color}
                            disabled={disabled}
                            mode="android"
                            label={label} 
                            position={positionLabel}
                            status={value ? "checked" : "unchecked"}
                            onPress={() => {
                                const newValue = !value
                                onPress && onPress(newValue)
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