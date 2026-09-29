import { type ColorMiembro } from '@/components/compartidos/MiembroAvatar';

export interface Auth {
    user: User;
    /** El conviviente elegido en "¿Quién anda por casa?". `null` hasta elegir. */
    perfil: Perfil | null;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    url: string;
}

export interface SharedData {
    name: string;
    auth: Auth;
    [key: string]: unknown;
}

/**
 * OJO con el nombre: `User` **es la casa**, no la persona.
 *
 * Una cuenta por hogar, y adentro van los perfiles de cada conviviente, como
 * los perfiles de Netflix. `user.name` es el nombre de la casa y `user.email`
 * es el correo con el que entra la casa entera. La persona es `Perfil`, y
 * el que está usando la app viaja como `auth.perfil`.
 */
export type Casa = User;

/** Un conviviente dentro de la casa. El PIN nunca viaja al frontend: sólo si tiene uno. */
export interface Perfil {
    id: number;
    nombre: string;
    color: ColorMiembro;
    tiene_pin: boolean;
    user_id: number;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

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
