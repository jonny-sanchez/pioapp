import AppBarHome from "components/container/AppBarHome"
import DrawerDashboard from "components/container/DrawerDashboard"
import React from "react"

type PageLayoutProps = {
    children?: React.ReactNode,
    titleAppBar?: string;
    goBack?: boolean;
}

export default function PageLayout({
    children,
    titleAppBar = '',
    goBack = false
} : PageLayoutProps) {

    return (
        <>
            {/* <DrawerDashboard/> */}
            <AppBarHome title={titleAppBar} goBack={goBack}/>
            { children }
        </>
    )
}