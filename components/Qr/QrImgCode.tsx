import { ImageSourcePropType } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type QrImgCodeProps = {
    value?: string | undefined;
    size?: number | undefined;
    logo?: string | ImageSourcePropType | undefined;
    backgroundColor?: string | undefined;
}

export default function QrImgCode({
    value,
    size,
    logo,
    backgroundColor
} : QrImgCodeProps) {

    return (
        <>
            <QRCode
                logo={logo}
                size={size}
                value={value}
                backgroundColor={backgroundColor}
            />
        </>
    )
}