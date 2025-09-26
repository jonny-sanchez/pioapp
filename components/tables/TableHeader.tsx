import { ConfigFile } from "./DataTableInfo"
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
              configTable.map(({ name }, index) => (
                // sortDirection='descending'
                <DataTable.Title key={index} style={{ paddingHorizontal: 1 }} numeric={false}>{ name }</DataTable.Title>
              )) 
            }
        </DataTable.Header>
    )
}