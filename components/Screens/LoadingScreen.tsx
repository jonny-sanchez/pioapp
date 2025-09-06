import { Modal, Portal, ActivityIndicator, useTheme } from 'react-native-paper';
import globalState from 'helpers/states/globalState';

export default function LoadingScreen(){

    const { screenLoading } = globalState()

    const theme = useTheme()

    return (
        <Portal>
            <Modal visible={screenLoading}>
                <ActivityIndicator animating={true} size={'large'} color={theme.colors.primary} />
            </Modal>
        </Portal>
    )
}