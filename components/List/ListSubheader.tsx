import { List } from "react-native-paper";

type ListSubheaderType = {
    label?: string;
}

export default function ListSubheader({
    label = ''
} : ListSubheaderType) {

    return (
        <>
            <List.Subheader>{ label }</List.Subheader>
        </>
    )
}