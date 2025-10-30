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

    return (
        <>
            {
                dataSearch.length > 0 ? (pagination ? dataSearch.slice(from, to) : dataSearch).map((item:any, index:any) => (
                  <DataTable.Row onPress={() => onPressRow && onPressRow(item)}  key={index}>
                    {
                      configTable.map(({ data:field, render, numeric }, i)=>(
                        <DataTable.Cell style={{ paddingVertical: 4, paddingHorizontal: 4 }} key={i} numeric={numeric || false}>{ 
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
        </>
    )
}