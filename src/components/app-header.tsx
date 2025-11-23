import { SidebarTrigger } from "./ui/sidebar"

export const AppHeader = () => {
    return(
        <header className="bg-accent px-3 py-3 border-b">
            <SidebarTrigger />
        </header>
    )
}