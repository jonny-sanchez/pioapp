import { List, Text } from "react-native-paper";
import ListItemComponentType from "types/List/ListItemComponentType";


export default function ListItemComponent({
    title = '',
    description = '',
    iconLeft,
    styleList,
    rightElements,
    titleStyle,
    descriptionStyle
} : ListItemComponentType) {

    return (
        <>
            <List.Item
              title={title}
              style={styleList}
              titleStyle={[ titleStyle ]}
              description={description}
              descriptionStyle={[ descriptionStyle ]}
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