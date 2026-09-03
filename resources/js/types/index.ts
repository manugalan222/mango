import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

/**
 * OJO con el nombre: `User` **es la casa**, no la persona.
 *
 * Una cuenta por hogar, y adentro van los perfiles de cada conviviente, como
 * los perfiles de Netflix. `user.name` es el nombre de la casa y `user.email`
 * es el correo con el que entra la casa entera. Cuando exista la tabla de
 * perfiles, la persona pasa a ser `Perfil`, no `User`.
 */
export type Casa = User;

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
