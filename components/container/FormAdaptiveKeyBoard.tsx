import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type FormAdaptiveKeyBoardProps = {
    children: React.ReactNode
}

export default function FormAdaptiveKeyBoard({
    children
} : FormAdaptiveKeyBoardProps){

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={{ flex: 1 }}
            // enableOnAndroid={true}    
            keyboardShouldPersistTaps="handled" 
            // extraScrollHeight={60}        
            enableAutomaticScroll={true} 
        >
            { children }
        </KeyboardAwareScrollView>
    )
}