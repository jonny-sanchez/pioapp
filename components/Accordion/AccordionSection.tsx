import React from "react";
import { List } from "react-native-paper";

type AccordionComponentType = {
  children?: React.ReactNode;
  title?: string;
}

export default function AccordionComponent({
  children,
  title = ''
} : AccordionComponentType) {

    return (
        <>
            <List.Section title={title}>
              { children }
            </List.Section>
        </>
    )
}