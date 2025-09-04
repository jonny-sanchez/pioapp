import { View, Image, ImageSourcePropType } from 'react-native';

type BoxImagesProps = {
    img: ImageSourcePropType,
    width?: number,
    height?: number
}

export default function BoxImage({
    img,
    width = 50,
    height = 50
} : BoxImagesProps){

    return (
        <View style={{ width: width, height: height }}>
            <Image style={{ width: '100%', height: '100%' }} resizeMode='contain' source={img}/>
        </View>
    );
}