import { List, Text } from "react-native-paper";
import ListItemComponentType from "types/List/ListItemComponentType";


export default function ListItemComponent({
    title = '',
    description = '',
    iconLeft,
    styleList,
    rightElements,
    titleStyle,
    descriptionStyle,
    className = '',
    rippleColor,
    leftElements,
    descriptionNumberOfLines,
    onPress
} : ListItemComponentType) {

    return (
        <>
            <List.Item
              onPress={onPress}
              rippleColor={rippleColor}
              className={className}  
              title={title}
              style={styleList}
              titleStyle={[ titleStyle ]}
              description={description}
              descriptionStyle={[ descriptionStyle ]}
              descriptionNumberOfLines={descriptionNumberOfLines}
              left={props => (
                <>
                    {iconLeft && <List.Icon {...props} icon={iconLeft}/>}
                    {leftElements}
                </>
              )}
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