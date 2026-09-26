import { HojaBoard } from '@/components/mango/HojaBoard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        url: '/settings/profile',
    },
    {
        title: 'Password',
        url: '/settings/password',
    },
    {
        title: 'Appearance',
        url: '/settings/appearance',
    },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const currentPath = window.location.pathname;

    return (
        <div className="flex flex-1 flex-col p-4 pt-6 md:p-6 md:pt-8">
            <HojaBoard titulo="Settings" descripcion="Manage your profile and account settings">
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav className="flex flex-col space-y-1 space-x-0">
                            {sidebarNavItems.map((item) => (
                                <Button
                                    key={item.url}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn('w-full justify-start', {
                                        'bg-muted': currentPath === item.url,
                                    })}
                                >
                                    <Link href={item.url} prefetch>
                                        {item.title}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                    </aside>

                    <Separator className="my-6 md:hidden" />

                    <div className="flex-1 md:max-w-2xl">
                        <section className="max-w-xl space-y-12">{children}</section>
                    </div>
                </div>
            </HojaBoard>
        </div>
    );
}
