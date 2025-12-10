import { FlatList, ListRenderItem } from "react-native";

type FlatListVirtualizeType = {
    data: ArrayLike<any> | null | undefined;
    renderItem: ListRenderItem<any> | null | undefined;
    keyExtractor?: ((item: any, index: number) => string) | undefined;
    scrollEnabled?: boolean | undefined;
}

export default function FlatListVirtualize({ 
    data, 
    renderItem, 
    keyExtractor,
    scrollEnabled
} : FlatListVirtualizeType) {

    return (
        <>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              scrollEnabled={scrollEnabled}
            />
        </>
    )

}