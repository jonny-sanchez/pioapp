import { ScrollView } from "react-native"
import { ReactNode } from "react"

type ScrollViewContainerProps = {
    children?: ReactNode; 
    paddingHorizontal?: number;
}

export default function ScrollViewContainer({
    children,
    paddingHorizontal = 35
} : ScrollViewContainerProps){

    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: paddingHorizontal, width: '100%'  }}>
            { children }
        </ScrollView>
        
    )
}