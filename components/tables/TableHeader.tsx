// import { ConfigFile } from "./DataTableInfo"
import ConfigFile from "types/tables/ConfigFile";
import { DataTable } from "react-native-paper"

type TableHeaderProps = {
    configTable?: ConfigFile[];
}

export default function TableHeader({
    configTable = []
} : TableHeaderProps) {

    return (
        <DataTable.Header>
            { 
              configTable.map(({ name, renderEncabezado, numericHeader }, index) => (
                // sortDirection='descending'
                <DataTable.Title key={index} style={{ paddingHorizontal: 1 }} numeric={numericHeader}>{ 
                    renderEncabezado ? renderEncabezado() : name 
                }</DataTable.Title>
              )) 
            }
        </DataTable.Header>
    )
}