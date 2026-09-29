import { type Categoria } from '@/components/mango/CategoriasChart';
import { type Estado } from '@/components/mango/EstadoBadge';
import { type ColorMiembro } from '@/components/mango/MiembroAvatar';

/**
 * DATOS DE MUESTRA — inventados, para ver la web armada con todos sus
 * componentes antes de que exista el modelo detrás. Todo lo hardcodeado vive
 * acá: para volver a los estados vacíos honestos se borra este archivo y lo
 * que lo importa.
 */

export interface Conviviente {
    nombre: string;
    color: ColorMiembro;
}

export const CONVIVIENTES = {
    manu: { nombre: 'Manu', color: 'mango' },
    sofi: { nombre: 'Sofi', color: 'verde' },
    tomi: { nombre: 'Tomi', color: 'ciruela' },
    lu: { nombre: 'Lu', color: 'ambar' },
} satisfies Record<string, Conviviente>;

type Quien = keyof typeof CONVIVIENTES;

// ─── Hogar ──────────────────────────────────────────────────────────────────

export interface TareaMuestra {
    id: number;
    texto: string;
    quien: Quien;
    hecha: boolean;
    cuando: string;
    estado: Estado;
}

export const TAREAS: TareaMuestra[] = [
    { id: 1, texto: 'Sacar la basura', quien: 'tomi', hecha: true, cuando: 'Hoy', estado: 'mia' },
    { id: 2, texto: 'Lavar los platos de la cena', quien: 'manu', hecha: false, cuando: 'Hoy', estado: 'mia' },
    { id: 3, texto: 'Regar las plantas del balcón', quien: 'sofi', hecha: false, cuando: 'Ayer', estado: 'vencida' },
    { id: 4, texto: 'Hacer las compras del súper', quien: 'lu', hecha: false, cuando: 'Mañana', estado: 'pronto' },
    { id: 5, texto: 'Limpiar el baño', quien: 'manu', hecha: true, cuando: 'Jueves', estado: 'ok' },
    { id: 6, texto: 'Cambiar las sábanas', quien: 'sofi', hecha: false, cuando: 'Domingo', estado: 'neutra' },
    { id: 7, texto: 'Pasar la aspiradora', quien: 'tomi', hecha: false, cuando: 'Domingo', estado: 'neutra' },
];

export interface NotaMuestra {
    id: number;
    quien: Quien;
    texto: string;
    cuando: string;
}

export const NOTAS: NotaMuestra[] = [
    { id: 1, quien: 'sofi', texto: 'El martes viene el plomero entre las 9 y las 12. ¿Alguien puede estar?', cuando: 'Hace 2 h' },
    { id: 2, quien: 'lu', texto: 'Se terminó el aceite y el detergente. Ya los anoté en la lista.', cuando: 'Ayer' },
    { id: 3, quien: 'manu', texto: 'La clave nueva del wifi está pegada en la heladera.', cuando: 'Lunes' },
    { id: 4, quien: 'tomi', texto: 'Este finde no estoy, me cambio la aspiradora con alguien.', cuando: 'Domingo pasado' },
];

/** Semanas seguidas en que la casa cerró todos los quehaceres. */
export const RACHA = { semanas: 9, total: 14 };

// ─── Finanzas ───────────────────────────────────────────────────────────────

export const BALANCE_MES = { ingresos: 1_850_000, gastos: 1_236_400 };

export const GASTOS_POR_CATEGORIA: Categoria[] = [
    { nombre: 'Alquiler y expensas', monto: 620_000, color: 'var(--chart-1)' },
    { nombre: 'Súper', monto: 284_300, color: 'var(--chart-2)' },
    { nombre: 'Servicios', monto: 176_900, color: 'var(--chart-3)' },
    { nombre: 'Delivery', monto: 92_700, color: 'var(--chart-4)' },
    { nombre: 'Limpieza', monto: 62_500, color: 'var(--chart-5)' },
];

export interface GastoMuestra {
    id: number;
    fecha: string;
    descripcion: string;
    categoria: string;
    quien: Quien;
    monto: number;
}

export const GASTOS: GastoMuestra[] = [
    { id: 1, fecha: '25 sep', descripcion: 'Compra grande del mes', categoria: 'Súper', quien: 'lu', monto: 148_200 },
    { id: 2, fecha: '24 sep', descripcion: 'Pizzas del viernes', categoria: 'Delivery', quien: 'tomi', monto: 38_500 },
    { id: 3, fecha: '22 sep', descripcion: 'Factura de luz', categoria: 'Servicios', quien: 'manu', monto: 71_300 },
    { id: 4, fecha: '20 sep', descripcion: 'Verdulería', categoria: 'Súper', quien: 'sofi', monto: 23_800 },
    { id: 5, fecha: '18 sep', descripcion: 'Lavandina, esponjas y bolsas', categoria: 'Limpieza', quien: 'sofi', monto: 17_900 },
    { id: 6, fecha: '10 sep', descripcion: 'Internet', categoria: 'Servicios', quien: 'tomi', monto: 42_600 },
    { id: 7, fecha: '05 sep', descripcion: 'Alquiler de septiembre', categoria: 'Alquiler y expensas', quien: 'manu', monto: 620_000 },
];

export interface DeudaMuestra {
    id: number;
    quien: Quien;
    texto: string;
    monto: number;
}

export const DEUDAS: DeudaMuestra[] = [
    { id: 1, quien: 'tomi', texto: 'Tomi le debe a Manu su parte del alquiler', monto: 155_000 },
    { id: 2, quien: 'sofi', texto: 'Sofi le debe a Lu la mitad del súper', monto: 37_050 },
    { id: 3, quien: 'lu', texto: 'Lu le debe a Tomi las pizzas del viernes', monto: 9_625 },
];

export interface PagoMuestra {
    id: number;
    fecha: string;
    nombre: string;
    monto: number;
    estado: Estado;
    cuando: string;
}

export const VENCIMIENTOS: PagoMuestra[] = [
    { id: 1, fecha: '24 sep', nombre: 'Gas', monto: 28_400, estado: 'vencida', cuando: 'Vencido' },
    { id: 2, fecha: '28 sep', nombre: 'Expensas', monto: 96_000, estado: 'pronto', cuando: 'En 2 días' },
    { id: 3, fecha: '01 oct', nombre: 'Alquiler', monto: 620_000, estado: 'neutra', cuando: 'En 5 días' },
    { id: 4, fecha: '10 oct', nombre: 'Internet', monto: 42_600, estado: 'ok', cuando: 'Débito' },
];

export interface AhorroMuestra {
    id: number;
    nombre: string;
    ahorrado: number;
    meta: number;
    fecha: string;
}

export const AHORROS: AhorroMuestra[] = [
    { id: 1, nombre: 'Heladera nueva', ahorrado: 540_000, meta: 900_000, fecha: 'Para diciembre' },
    { id: 2, nombre: 'Vacaciones en la costa', ahorrado: 1_120_000, meta: 2_400_000, fecha: 'Para enero' },
    { id: 3, nombre: 'Fondo de emergencia', ahorrado: 380_000, meta: 400_000, fecha: 'Sin fecha' },
];
