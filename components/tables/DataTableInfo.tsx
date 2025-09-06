import { DataTable, Searchbar, useTheme, IconButton } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native'
import SearchInput from 'components/form/SearchInput';

type DataTableInfoProps = {
    data?: any
}

export default function DataTableInfo({
    data = []
} : DataTableInfoProps){

    const [page, setPage] = useState<number>(0)

    const [numberOfItemsPerPageList] = useState([2, 3, 4])

    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0])

    const [items] = useState(data)

    const from = page * itemsPerPage

    const to = Math.min((page + 1) * itemsPerPage, items.length)

    const [searchQuery, setSearchQuery] = useState('')

    const theme = useTheme()

    useEffect(() => setPage(0), [itemsPerPage])

    return (
        <View>
            <View className='w-full flex flex-col items-end px-5 gap-2'>
                <SearchInput setSearchQuery={setSearchQuery} valueSearch={searchQuery}/>
                <View>
                    <IconButton
                      mode='outlined'
                      icon="filter"
                      iconColor={theme.colors.primary}
                      style={{ width: 60, height: 60, }}
                      onPress={() => console.log('Pressed')}
                    />
                </View>
            </View>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title sortDirection='descending'>Dessert</DataTable.Title>
                <DataTable.Title numeric>Calories</DataTable.Title>
                <DataTable.Title numeric>Fat</DataTable.Title>
              </DataTable.Header>

              {items.slice(from, to).map((item: any) => (
                <DataTable.Row key={item.key}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(items.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} de ${items.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Filas por página'}
                // style={{ transform: [{ scale: 0.8 }], display: 'flex', flexDirection: 'row', paddingVertical: 0 }}
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 6 }}
              />
            </DataTable>
        </View>
    )

}