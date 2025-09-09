import { Searchbar, useTheme } from 'react-native-paper';

type SearchInputProps = {
    onChangeText?: (((text: string) => void) & ((query: string) => void));
    valueSearch?: any;

}

export default function SearchInput({
    onChangeText,
    valueSearch
} : SearchInputProps){

    const theme = useTheme()

    return (
        <Searchbar
          mode='view'
          placeholder="Buscar"
          onChangeText={onChangeText}
          value={valueSearch}
          style={{ 
                // marginHorizontal: 15, 
                // marginBottom: 15, 
                backgroundColor: theme.colors.surfaceVariant,
            }}
        />
    )
}