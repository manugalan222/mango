import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { House, ListChecks, ShoppingBasket, Sofa, Wallet } from 'lucide-react';
import AppLogo from './app-logo';

/**
 * Cinco destinos. El límite no es estético: una barra sobrecargada obliga a
 * leerla cada vez en lugar de apuntar de memoria.
 */
const navPrincipal: NavItem[] = [
    { title: 'Inicio', url: '/dashboard', icon: House },
    { title: 'PlataText', url: '/plata', icon: Wallet },
    { title: 'Tareas', url: '/tareas', icon: ListChecks },
    { title: 'Compras', url: '/compras', icon: ShoppingBasket },
    { title: 'La casa', url: '/casa', icon: Sofa },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navPrincipal} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
