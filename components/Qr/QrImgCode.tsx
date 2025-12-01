import { ImageSourcePropType } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type QrImgCodeProps = {
    value?: string | undefined;
    size?: number | undefined;
    logo?: string | ImageSourcePropType | undefined;
    backgroundColor?: string | undefined;
    getRef?: ((c: any) => any) | undefined;
    quietZone?: number | undefined;
}

export default function QrImgCode({
    value,
    size,
    logo,
    backgroundColor,
    getRef,
    quietZone = 7
} : QrImgCodeProps) {

    return (
        <>
            <QRCode
                logo={logo}
                size={size}
                value={value}
                backgroundColor={backgroundColor}
                getRef={getRef}
                quietZone={quietZone}
            />
        </>
    )
}