import TextInfo from 'components/typografy/TextInfo';
import { TouchableOpacity, Dimensions, View, Keyboard } from 'react-native';
import { Modalize } from 'react-native-modalize'
import { useTheme, Divider } from 'react-native-paper';

type ModalizeComponentProps= {
    children?: React.ReactNode;
    modalizeRef?: any;
    title?: string;
    footerComponent?: React.ReactNode
    // onOpen?: () => void;
}

export default function ModalizeComponent({
    children,
    modalizeRef,
    title = '',
    footerComponent
    // onOpen = () => {}
} : ModalizeComponentProps){

    const theme = useTheme()

    const { height } = Dimensions.get('window');

    return (
        <>  
            {/* <TouchableOpacity onPress={onOpen}/> */}
            <Modalize 
                handlePosition='inside'
                ref={modalizeRef}
                modalHeight={height * 0.60}
                modalStyle={{ backgroundColor: theme.colors.background }}
                handleStyle={{ backgroundColor: theme.colors.outline }}
                scrollViewProps={{ 
                    contentContainerStyle: { padding: 25 },
                    keyboardShouldPersistTaps: 'handled',
                    keyboardDismissMode: 'on-drag'
                }}
                HeaderComponent={
                    <>
                        <View className='w-full p-9'>
                            <TextInfo>{ title }</TextInfo>
                        </View>
                        <Divider/>
                    </>
                }
                FooterComponent={  
                    <>
                        { 
                            footerComponent && 
                            <>
                                <Divider/>
                                <View style={{ padding: 25 }}>
                                    { footerComponent }
                                </View>
                            </>
                        } 
                    </>
                }
            >
                { children }
            </Modalize>
        </>
    )
}