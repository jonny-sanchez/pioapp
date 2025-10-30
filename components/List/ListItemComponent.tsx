import { List, Text } from "react-native-paper";
import ListItemComponentType from "types/List/ListItemComponentType";


export default function ListItemComponent({
    title = '',
    description = '',
    iconLeft,
    styleList,
    rightElements
} : ListItemComponentType) {

    return (
        <>
            <List.Item
              title={title}
              style={styleList}
              description={description}
              left={props => (iconLeft && <List.Icon {...props} icon={iconLeft}/>)}
              right={props => (
                <>
                    {/* <List.Icon {...props} icon={'camera'}/> */}
                    { rightElements }
                </>
              )}
            />
        </>
    )
}