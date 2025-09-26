import { DataTable } from "react-native-paper"
import { ConfigFile } from "./DataTableInfo"

type RowsTableProps = {
    dataSearch?: any[];
    configTable?: ConfigFile[];
    pagination?:boolean;
    from?:any;
    to?:any
}

export default function RowsTable({
    dataSearch = [],
    configTable = [],
    pagination = false,
    from,
    to
} : RowsTableProps) {

    return (
        <>
            {
                dataSearch.length > 0 ? (pagination ? dataSearch.slice(from, to) : dataSearch).map((item:any, index:any) => (
                  <DataTable.Row key={index}>
                    {
                      configTable.map(({ data:field, render }, i)=>(
                        <DataTable.Cell style={{ paddingVertical: 4, paddingHorizontal: 4 }} key={i} numeric={false}>{ 
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