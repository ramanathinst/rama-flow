"use client"
import { CreditCardIcon, FolderOpenIcon, KeyIcon, LogOutIcon, PlayCircleIcon, StarIcon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { usePathname, useRouter } from "next/navigation"

// Menu items.
const itemsMenu = [{
    title: "main",
    items: [
        {
            title: "Workflows",
            url: "/workflows",
            icon: FolderOpenIcon,
        },
        {
            title: "Executions",
            url: "/executions",
            icon: PlayCircleIcon,
        },
        {
            title: "Crendentials",
            url: "/credentials",
            icon: KeyIcon,
        }]
}]

export function AppSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="gap-x-4 px-4 py-4">
                        <Link href={"/workflows"}>
                            <Image src={"/logos/logo.svg"} height={30} width={30} alt="Rama-flow" />
                            <span className="text-orange-500 text-lg font-extrabold">Rama-Flow</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                {itemsMenu.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton 
                                            tooltip={item.title}
                                            isActive={pathname === "/" ? pathname === "/" : pathname.startsWith(item.url)}
                                        >
                                            <item.icon className="size-3"/>
                                            <Link href={item.url} prefetch>
                                                {item.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuButton onClick={() => {}} tooltip={"Upgrade to Pro"}>
                                    <StarIcon className="size-4" />
                                    Upgrade to Pro
                        </SidebarMenuButton>

                        <SidebarMenuButton onClick={() => {}} tooltip={"Billing Portal"}>
                                    <CreditCardIcon className="size-4" />
                                    Billing Portal
                        </SidebarMenuButton>

                        <SidebarMenuButton tooltip={"Logout"} onClick={() => authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    toast.success("Logout")
                                    router.push("/login")
                                },
                                onError: (ctx) => {
                                    toast.error(ctx.error.message)
                                }
                            }
                        })}>
                                    <LogOutIcon className="size-4" />
                                    Logout
                        </SidebarMenuButton>
                    </SidebarMenu>
                </SidebarContent>
            </SidebarFooter>
        </Sidebar>
    )
}