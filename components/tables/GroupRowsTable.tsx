import { DataTable } from "react-native-paper"
import React from "react"
import TableHeader from "./TableHeader"
// import { ConfigFile } from "./DataTableInfo"
import ConfigFile from "types/tables/ConfigFile"

type GroupRowsTableProps = {
    pagination?: boolean;
    entriesGroupedData?: [any, any[]][];
    from?:any;
    to?:any;
    configTable?: ConfigFile[];
}

export default function GroupRowsTable({
    pagination = false,
    entriesGroupedData = [],
    from,
    to,
    configTable = []
} : GroupRowsTableProps){

    return (
        <>{
          entriesGroupedData.length > 0 ?
            (pagination ? entriesGroupedData.slice(from, to) : entriesGroupedData).map(([key, items]) => (
                <React.Fragment key={key}>
                  {/* ENCABEZADO AGRUPADO */}
                  <DataTable.Row>
                    <DataTable.Cell style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>{ key }</DataTable.Cell>
                  </DataTable.Row>
                  <TableHeader configTable={configTable}/>
                  {
                    items.map((el, index) => (
                      <DataTable.Row key={index}>
                        {
                          configTable.map(({ data:field, render, numeric }, i)=>(
                            <DataTable.Cell style={{ paddingVertical: 4, paddingHorizontal: 4 }} key={i} numeric={numeric || false}>{ 
                              render ? 
                                render(
                                  (field || '') ? 
                                    el[field || ''] || '' : 
                                    el
                                ) : 
                                el[field || ''] || '' 
                              }
                            </DataTable.Cell>
                          ))
                      }
                      </DataTable.Row>
                    ))
                  }
                </React.Fragment>
            )) 
          :
          <>
            <TableHeader configTable={configTable}/>
            <DataTable.Row>
              <DataTable.Cell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No hay resultados</DataTable.Cell>
            </DataTable.Row>
          </>
        }</>
    )
}