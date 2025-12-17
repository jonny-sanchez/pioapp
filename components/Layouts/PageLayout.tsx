import AppBarHome from "components/container/AppBarHome"
import DrawerDashboard from "components/container/DrawerDashboard"
import React from "react"

type PageLayoutProps = {
    children?: React.ReactNode,
    titleAppBar?: string;
    goBack?: boolean;
    menuApp?: boolean;
    themeApp?: boolean;
    notification?: boolean;
}

export default function PageLayout({
    children,
    titleAppBar = '',
    goBack = false,
    menuApp = true,
    themeApp = true,
    notification = true
} : PageLayoutProps) {

    return (
        <>
            {/* <DrawerDashboard/> */}
            <AppBarHome 
                title={titleAppBar} 
                goBack={goBack}
                menuApp={menuApp}
                themeApp={themeApp}
                notification={notification}
            />
            { children }
        </>
    )
}