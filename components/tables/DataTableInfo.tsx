import { DataTable, Searchbar, useTheme, IconButton, Text } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { GestureResponderEvent, View, ScrollView } from 'react-native'
import SearchInput from 'components/form/SearchInput';
import TableHeader from './TableHeader';
import RowsTable from './RowsTable';
import PaginationTable from './PaginationTable';
import GroupRowsTable from './GroupRowsTable';
import { groupByField } from 'helpers/Global/globalHelper';
import ConfigFile from 'types/tables/ConfigFile';

// export interface ConfigFile {
//   data?: any;
//   name?: string;
//   search?: boolean;
//   render?: any; 
//   numeric?: boolean | undefined;
// }

type DataTableInfoProps = {
    data?: any;
    search?: boolean;
    filter?: boolean;
    onPressFilter?: ((event: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void),
    pagination?: boolean; 
    configTable?: ConfigFile[];
    groupField?: string;
    buttons?: React.ReactNode;
    onPressRow?: (data:any) => void | undefined;
}

export default function DataTableInfo({
    data = [],
    search = false,
    filter = false,
    pagination = false,
    onPressFilter = () => {},
    configTable = [],
    groupField = '',
    buttons,
    onPressRow
} : DataTableInfoProps){

    const [dataSearch, setDataSearch] = useState<any[]>(data)

    const groupedData:object | null = groupField ? groupByField(dataSearch, groupField) : null;

    const entriesGroupedData = Object.entries((groupedData ?? {})) as [any, any[]][] 

    const [page, setPage] = useState<number>(0)

    const [numberOfItemsPerPageList] = useState([5, 10, 15])

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

    useEffect(() => {
      setPage(0)
      searchQuery ? onChangeSetSearch(searchQuery) : setDataSearch(data)
    }, [data])

    return (
        <View className='w-full'>
            <View className='flex w-full flex-row items-center gap-2 mb-5'>
                { search && <SearchInput 
                  style={{ flex: 1 }}
                  onChangeText={onChangeSetSearch} 
                  valueSearch={searchQuery}/> 
                }
                { filter && <IconButton
                    mode='outlined'
                    icon="filter"
                    iconColor={theme.colors.primary}
                    style={{ width: 50, height: 50, }}
                    onPress={onPressFilter}
                  /> 
                }
                {
                  buttons
                }
            </View>
            <DataTable>
              { !groupField && <TableHeader configTable={configTable}/> } 
              {/* FILAS */}
              { groupField ?
                <GroupRowsTable
                  configTable={configTable}
                  entriesGroupedData={entriesGroupedData}
                  from={from}
                  pagination={pagination}
                  to={to}
                  onPressRow={onPressRow}
                />
               : 
               <RowsTable 
                  configTable={configTable} 
                  dataSearch={dataSearch}
                  from={from}
                  to={to}
                  pagination={pagination}
                  onPressRow={onPressRow}
                />
              }       

            </DataTable>
            {/* Paginacion */}
            <PaginationTable
              page={page}
              setPage={setPage}

              dataSearch={dataSearch}
              entriesGroupedData={entriesGroupedData}
              groupField={groupField}

              from={from}
              itemsPerPage={itemsPerPage}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              onItemsPerPageChange={onItemsPerPageChange}
              pagination={pagination}
              to={to}
            />
        </View>
    )

}