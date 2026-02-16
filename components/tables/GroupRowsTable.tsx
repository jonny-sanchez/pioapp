import { DataTable } from "react-native-paper"
import React from "react"
import TableHeader from "./TableHeader"
// import { ConfigFile } from "./DataTableInfo"
import ConfigFile from "types/tables/ConfigFile"
import AnimatedListItem from "components/Animaciones/AnimatedListItem"
import FlatListVirtualize from "components/List/FlatListVirtualize"

type GroupRowsTableProps = {
    pagination?: boolean;
    entriesGroupedData?: [any, any[]][];
    from?:any;
    to?:any;
    configTable?: ConfigFile[];
    onPressRow?: (data:any) => void | undefined;
}

export default function GroupRowsTable({
    pagination = false,
    entriesGroupedData = [],
    from,
    to,
    configTable = [],
    onPressRow
} : GroupRowsTableProps){

    const dataRender = pagination ? entriesGroupedData.slice(from, to) : entriesGroupedData

    return (
        <>{
          entriesGroupedData.length > 0 ?
            <FlatListVirtualize
              data={dataRender}
              keyExtractor={(_, i) => i.toString()}
              scrollEnabled={false}
              renderItem={({ item, index }) => {
                const [key, items]:[any, any[]] = item
                return (
                  // (dataRender).map(([key, items], index) => (
                  <AnimatedListItem index={index} key={index}>
                    <React.Fragment>
                      {/* ENCABEZADO AGRUPADO */}
                      <DataTable.Row>
                        <DataTable.Cell style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>{ key }</DataTable.Cell>
                      </DataTable.Row>
                      <TableHeader configTable={configTable}/>
                      {
                        items.map((el, index) => (
                          <DataTable.Row onPress={() => onPressRow && onPressRow(el)} key={index}>
                            {
                              configTable.map(({ data:field, render, numeric, onPressCell }, i)=>(
                                <DataTable.Cell onPress={onPressCell ? () => onPressCell(el) : undefined} style={{ paddingVertical: 4, paddingHorizontal: 4 }} key={i} numeric={numeric || false}>{ 
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
                  </AnimatedListItem>
                  // )) 
                )
              }}
            />
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