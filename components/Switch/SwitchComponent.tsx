import { useState } from "react";
import { Controller } from "react-hook-form";
import { SwitchChangeEvent } from "react-native";
import { Switch } from "react-native-paper";

type SwitchComponentProps = {
    control: any;
    name: string;
    onExternalChange?: ((value:boolean) => Promise<void> | void) | null | undefined;
}

export default function SwitchComponent ({
    control,
    name,
    onExternalChange
} : SwitchComponentProps) {

    // const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false)

    // const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

    return (
        <>
            <Controller 
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Switch 
                        value={value ?? false} 
                        onValueChange={(val) => {
                          onChange(val);          
                          onExternalChange?.(val);
                        }}
                        // onValueChange={onToggleSwitch} 
                    />
                )}
            />
        </>
    )
}