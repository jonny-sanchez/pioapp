import { ScrollView } from "react-native"
import { ReactNode } from "react"

type ScrollViewContainerProps = {
    children?: ReactNode; 
}

export default function ScrollViewContainer({
    children
} : ScrollViewContainerProps){

    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 35, width: '100%'  }}>
            { children }
        </ScrollView>
        
    )
}