import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';

type SearchInputProps = {
    onChangeText?: (((text: string) => void) & ((query: string) => void));
    valueSearch?: any;
    style?: StyleProp<ViewStyle | TextStyle>
}

export default function SearchInput({
    onChangeText,
    valueSearch,
    style = {}
} : SearchInputProps){

    const theme = useTheme()

    return (
        <Searchbar
          mode='view'
          placeholder="Buscar"
          onChangeText={onChangeText}
          value={valueSearch}
        //   inputStyle={{ flex: 1 }}
          style={[{ 
                // marginHorizontal: 15, 
                // marginBottom: 15, 
                backgroundColor: theme.colors.surfaceVariant,
            }, style]}
        />
    )
}