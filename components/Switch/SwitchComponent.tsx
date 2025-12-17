import { useState } from "react";
import { SwitchChangeEvent } from "react-native";
import { Switch } from "react-native-paper";

type SwitchComponentProps = {
    onChange?: ((event: SwitchChangeEvent) => Promise<void> | void) | null | undefined;
}

export default function SwitchComponent ({
    onChange
} : SwitchComponentProps) {

    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false)

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

    return (
        <>
            <Switch 
                value={isSwitchOn} 
                onChange={onChange} 
                onValueChange={onToggleSwitch} 
            />
        </>
    )
}