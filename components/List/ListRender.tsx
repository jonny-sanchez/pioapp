import React from "react";
import { List, useTheme } from "react-native-paper";
import { Style } from "react-native-paper/lib/typescript/components/List/utils";
import { EllipsizeProp } from "react-native-paper/lib/typescript/types";
import { AppTheme } from "types/ThemeTypes";

type ItemsListType = {
    title?: string|React.ReactNode;
    left?: ((props: { color: string; style: Style;}) => React.ReactNode) | undefined;
    description?: | React.ReactNode | ((props: {selectable: boolean;ellipsizeMode: EllipsizeProp | undefined;color: string;fontSize: number;}) => React.ReactNode)
}

type ListRenderType = {
    items: ItemsListType[];
    titleSubheader: React.ReactNode;
}

export default function ListRender({
    items = [],
    titleSubheader
} : ListRenderType) {

    return (
        <>
            <List.Section>
              { titleSubheader && (<List.Subheader>{titleSubheader}</List.Subheader>) }
              {
                items.map((el, index) => (
                    <List.Item 
                        key={index}
                        title={el.title} 
                        description={el.description}
                        left={el.left}
                    />
                ))
              }
            </List.Section>
        </>
    )
}