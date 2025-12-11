import { DimensionValue, StyleProp, ViewStyle } from "react-native";
import { ProgressBar, useTheme } from "react-native-paper";
import { AppTheme } from "types/ThemeTypes";

type ProgressBarItemProps = {
    style?: StyleProp<ViewStyle>;
    color?: string | undefined;
    width?: DimensionValue | undefined;
    height?: DimensionValue | undefined;
    progress?: number | undefined;
}

export default function ProgressBarItem ({
    style,
    color,
    width,
    height,
    progress
} : ProgressBarItemProps) {

    const theme:AppTheme = useTheme() as AppTheme

    return (
        <>
            <ProgressBar 
                progress={progress} 
                style={[
                    style, 
                    {
                        width,
                        height
                    }
                ]} 
                color={color ? color : theme.colors.primary}
            />
        </>
    )
}