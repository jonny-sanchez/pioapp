import { imageConvivio2025, imageQrDefault, LOGOAPP } from "assets/Providers/ImageProvider";
import ListItemComponent from "components/List/ListItemComponent";
import { Pressable, View } from "react-native";
import { Icon, List, Text, useTheme } from "react-native-paper";
import { AppTheme } from "types/ThemeTypes";

type TypePicker = 'photos'|'files';

type FilePickerComponentProps = {
    disabled?: boolean;
    typePicker: TypePicker
}

type PickerItem = {
  icon: string;
  title: string;
  descripcion: string;
};

type ConfigPicker = Record<TypePicker, PickerItem>;

export default function FilePickerComponent({
    disabled = false,
    typePicker
} : FilePickerComponentProps) {

    const theme:AppTheme = useTheme() as AppTheme

    const configPicker:ConfigPicker = {
        photos: {
            icon: 'camera-outline',
            title: 'Fotografia',
            descripcion: 'pulsa para usar camara'
        },
        files: {
            icon: 'folder-open-outline',
            title: 'Archivos',
            descripcion: 'pulsa para explorar archivos'
        }
    }

    return (
        <>
            <Pressable>
                <View className={`w-full h-52 rounded-lg flex items-center justify-center p-2 ${ disabled && 'opacity-50' }`} style={{ backgroundColor: theme.colors.surfaceVariant }}>
                    <View className="flex flex-col items-center justify-center gap-1">
                        <Icon source={configPicker[typePicker].icon} size={35}/>
                        <Text style={{ color: theme.colors.primary }}>{configPicker[typePicker].title}</Text>
                        <Text style={{ color: theme.colors.secondary }} variant="bodySmall">{configPicker[typePicker].descripcion}</Text>
                    </View>
                </View>
            </Pressable>
            <View className="w-full flex-col">
                <ListItemComponent
                    title={<Text variant="bodyMedium">Hola435dsfd.png</Text>}
                    description={<Text variant="bodySmall" style={{ color: theme.colors.outline }}>34 mb</Text>}
                    leftElements={<List.Image source={imageConvivio2025} variant="image"/>}
                    rightElements={<List.Icon icon={'close'}/>}
                />
                <ListItemComponent
                    title={<Text variant="bodyMedium">Hola435dsfd.png</Text>}
                    description={<Text variant="bodySmall" style={{ color: theme.colors.outline }}>34 mb</Text>}
                    leftElements={<List.Image source={imageQrDefault} variant="image"/>}
                    rightElements={<List.Icon icon={'close'}/>}
                />
            </View>
        </>
    )
}