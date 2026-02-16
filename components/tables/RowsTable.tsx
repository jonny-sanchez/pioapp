import AnimatedListItem from "components/Animaciones/AnimatedListItem";
import FlatListVirtualize from "components/List/FlatListVirtualize";
import { DataTable } from "react-native-paper"
// import { ConfigFile } from "./DataTableInfo"
import ConfigFile from "types/tables/ConfigFile"

type RowsTableProps = {
    dataSearch?: any[];
    configTable?: ConfigFile[];
    pagination?:boolean;
    from?:any;
    to?:any;
    onPressRow?: (data:any) => void | undefined;
}

export default function RowsTable({
    dataSearch = [],
    configTable = [],
    pagination = false,
    from,
    to,
    onPressRow
} : RowsTableProps) {
    const dataRender = pagination ? dataSearch.slice(from, to) : dataSearch
    return (
        <>
            {
              dataSearch.length > 0 ?
                <FlatListVirtualize
                  data={dataRender}
                  keyExtractor={(_, i) => i.toString()}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => (
                  // dataSearch.length > 0 ? (dataRender).map((item:any, index:any) => (
                    <AnimatedListItem index={index} key={index}>
                      <DataTable.Row onPress={() => onPressRow && onPressRow(item)}  key={index}>
                        {
                          configTable.map(({ data:field, render, numeric, onPressCell }, i)=>(
                            <DataTable.Cell onPress={onPressCell ? () => onPressCell(item) : undefined} style={{ paddingVertical: 4, paddingHorizontal: 4 }} key={i} numeric={numeric || false}>{ 
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
                    </AnimatedListItem>
                  // )) 
                  )}
                />
                :
                <DataTable.Row>
                  <DataTable.Cell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No hay resultados</DataTable.Cell>
                </DataTable.Row>
            }
        </>
    )
}