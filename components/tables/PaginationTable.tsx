import { useEffect } from "react";
import { DataTable } from "react-native-paper"

type PaginationTableProps = {
    pagination?: boolean;
    page: number;
    dataSearch?: any[];
    itemsPerPage?: any;
    setPage: (page:number) => void;
    from?:any;
    to?:any;
    numberOfItemsPerPageList?: any;
    onItemsPerPageChange?: any;
    entriesGroupedData?: [any, any[]][];
    groupField?: string;
}

export default function PaginationTable({
    pagination = false,
    page,
    dataSearch = [],
    itemsPerPage,
    setPage,
    from,
    to,
    numberOfItemsPerPageList,
    onItemsPerPageChange,
    entriesGroupedData,
    groupField
} : PaginationTableProps) {

    const dataLenght:number = groupField ? Object.keys(entriesGroupedData ?? {}).length : dataSearch.length

    return (
        <>
            { 
              pagination && <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(dataLenght / itemsPerPage)}
                // numberOfPages={Math.ceil(dataSearch.length / itemsPerPage)}
                onPageChange={(page:any) => setPage(page)}
                // label={`${from + 1}-${to} de ${dataSearch.length}`}
                label={`${from + 1}-${to} de ${dataLenght}`}

                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Filas por página'}
                // style={{ transform: [{ scale: 0.8 }], display: 'flex', flexDirection: 'row', paddingVertical: 0 }}
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 6 }}
              /> 
            }
        </>
    )
}