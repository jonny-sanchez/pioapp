import * as ImagePicker from 'expo-image-picker';

export const openCameraVideo = async () => {

    const result = await ImagePicker.launchCameraAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        mediaTypes: ['videos'],
        videoMaxDuration: 180,
        quality: 0.7,
        exif: true
    });

    if(result.canceled) return null;

    return result.assets[0];
}
