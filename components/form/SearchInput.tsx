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
          inputStyle={{
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 17,
            paddingBottom: 17,
            // fontSize: 16,
            minHeight: 0, 
          }}
          style={[{ 
                // marginHorizontal: 15, 
                // marginBottom: 15, 
                borderTopLeftRadius: 4, 
                borderTopRightRadius: 4,
                backgroundColor: theme.colors.surfaceVariant,
            }, style]}
        />
    )
}