import { DataTable, Searchbar, useTheme, IconButton, Text } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { GestureResponderEvent, View } from 'react-native'
import SearchInput from 'components/form/SearchInput';

interface ConfigFile {
  data?: any;
  name?: string;
  search?: boolean;
  render?: any; 
}

type DataTableInfoProps = {
    data?: any;
    search?: boolean;
    filter?: boolean;
    onPressFilter?: ((event: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void),
    pagination?: boolean; 
    configTable?: ConfigFile[];
}

export default function DataTableInfo({
    data = [],
    search = false,
    filter = false,
    pagination = false,
    onPressFilter = () => {},
    configTable = []
} : DataTableInfoProps){

    const [dataSearch, setDataSearch] = useState<any[]>(data)

    const [page, setPage] = useState<number>(0)

    const [numberOfItemsPerPageList] = useState([2, 3, 4])

    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0])

    const from = page * itemsPerPage

    const to = Math.min((page + 1) * itemsPerPage, dataSearch.length)

    const theme = useTheme()

    const [searchQuery, setSearchQuery] = useState('')

    function getValueObj(obj:any, path:string) {
      //returna el valor del campo de un un json array (los parametros reciben el objeto ARRAY y el campo y lo encentra edentro del objeto Array)
      return path.split('.').reduce((acc, key) => acc && acc[key], obj);
    }

    const onChangeSetSearch = (valueSearch:any = '') => {
      setSearchQuery(valueSearch)

      const filterCamposSearch = configTable.filter((item) => item.search === undefined || item.search === true)

      const objectCampos:string[] = filterCamposSearch.flatMap(item => item?.data || '')

      const filasEncontradas = data.filter((item:any) => 
        objectCampos.some((campo:any) => {
          const value = getValueObj(item, campo)
          return value && value.toString().toLowerCase().includes(valueSearch.toLowerCase())
        })
      )

      valueSearch ? setDataSearch(filasEncontradas) : setDataSearch(data)
    }


    useEffect(() => setPage(0), [itemsPerPage])

    return (
        <View>
            <View className='w-full flex flex-col items-end px-5 gap-2'>
                { search && <SearchInput onChangeText={onChangeSetSearch} valueSearch={searchQuery}/> }
                <View>
                  { filter && <IconButton
                      mode='outlined'
                      icon="filter"
                      iconColor={theme.colors.primary}
                      style={{ width: 60, height: 60, }}
                      onPress={onPressFilter}
                    /> 
                  }
                </View>
            </View>
            <DataTable>
              <DataTable.Header>
                { 
                  configTable.map(({ name }, index) => (
                    // sortDirection='descending'
                    <DataTable.Title key={index} numeric={false}>{ name }</DataTable.Title>
                  )) 
                }
              </DataTable.Header>

              {
                dataSearch.length > 0 ? dataSearch.slice(from, to).map((item:any, index:any) => (
                  <DataTable.Row key={index}>
                    {
                      configTable.map(({ data:field, render }, i)=>(
                        <DataTable.Cell key={i} numeric={false}>{ 
                          render ? 
                            render(
                              (field || '') ? 
                                item[field || ''] || '' : 
                                item
                            ) : 
                            item[field || ''] || '' 
                          }
                        </DataTable.Cell>
                      ))
                    }
                  </DataTable.Row>
                )) : 
                <DataTable.Row>
                  <DataTable.Cell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No hay resultados</DataTable.Cell>
                </DataTable.Row>
              }

              { 
                pagination && <DataTable.Pagination
                  page={page}
                  numberOfPages={Math.ceil(dataSearch.length / itemsPerPage)}
                  onPageChange={(page) => setPage(page)}
                  label={`${from + 1}-${to} de ${dataSearch.length}`}
                  numberOfItemsPerPageList={numberOfItemsPerPageList}
                  numberOfItemsPerPage={itemsPerPage}
                  onItemsPerPageChange={onItemsPerPageChange}
                  showFastPaginationControls
                  selectPageDropdownLabel={'Filas por página'}
                  // style={{ transform: [{ scale: 0.8 }], display: 'flex', flexDirection: 'row', paddingVertical: 0 }}
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 6 }}
                /> 
              }
            </DataTable>
        </View>
    )

}