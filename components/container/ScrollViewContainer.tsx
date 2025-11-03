import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from "react-native"
import { ReactNode } from "react"

type ScrollViewContainerProps = {
    children?: ReactNode; 
    paddingHorizontal?: number;
    onScroll?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | undefined;
}

export default function ScrollViewContainer({
    children,
    paddingHorizontal = 35,
    onScroll
} : ScrollViewContainerProps){

    return (
        <ScrollView 
            onScroll={onScroll}
            style={{ flex: 1, paddingHorizontal: paddingHorizontal, width: '100%'  }}
        >
            { children }
        </ScrollView>
        
    )
}