import { COLORES_MIEMBRO, FONDOS, MiembroAvatar } from '@/components/mango/MiembroAvatar';
import { TextInput } from '@/components/mango/TextInput';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { usePerfiles } from '@/hooks/use-perfiles';
import { cn } from '@/lib/utils';
import { type Perfil } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Pencil, Plus, TriangleAlert, Trash2 } from 'lucide-react';
import { useState } from 'react';

/**
 * La puerta de la casa una vez que ya entraste: elegís quién sos, como en
 * Netflix. Sin sidebar todavía — hasta no elegir perfil no hay "adentro".
 */
export default function PerfilesIndex({ perfiles }: { perfiles: Perfil[] }) {
    const [creando, setCreando] = useState(false);
    const { data, setData, processing, errors, editando, editar, cancelar, guardar, eliminar } = usePerfiles({
        alGuardar: () => setCreando(false),
    });

    const abierto = creando || editando !== null;
    const casaCompleta = perfiles.length >= COLORES_MIEMBRO.length;
    const coloresUsados = new Set(perfiles.filter((p) => p.id !== editando?.id).map((p) => p.color));

    const cerrarDialog = () => {
        setCreando(false);
        cancelar();
    };

    return (
        <>
            <Head title="Perfiles" />

            <div className="bg-background flex min-h-svh flex-col items-center gap-10 px-4 py-16">
                <div className="text-center">
                    <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em]">¿Quién anda por casa?</h1>
                    <p className="text-tinta-2 mt-1 text-sm">Elegí tu perfil para entrar.</p>
                </div>

                <ul className="flex flex-wrap items-start justify-center gap-8">
                    {perfiles.map((perfil) => (
                        <li key={perfil.id} className="flex flex-col items-center gap-2">
                            <Link
                                href={route('dashboard')}
                                aria-label={`Entrar como ${perfil.nombre}`}
                                className="rounded-hoja group focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-hidden"
                            >
                                <MiembroAvatar
                                    nombre={perfil.nombre}
                                    color={perfil.color}
                                    className="size-28 transition-transform duration-120 ease-out group-hover:scale-105"
                                />
                            </Link>

                            <span className="max-w-28 truncate text-sm font-semibold">{perfil.nombre}</span>

                            <div className="flex gap-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    aria-label={`Editar a ${perfil.nombre}`}
                                    onClick={() => editar(perfil)}
                                >
                                    <Pencil aria-hidden className="size-4" />
                                </Button>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button type="button" variant="ghost" size="icon" aria-label={`Eliminar a ${perfil.nombre}`}>
                                            <Trash2 aria-hidden className="size-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>¿Eliminar a {perfil.nombre}?</DialogTitle>
                                        <DialogDescription>Se borra el perfil de la casa. No se puede deshacer.</DialogDescription>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="button" variant="pana">
                                                    Cancelar
                                                </Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button type="button" variant="destructive" onClick={() => eliminar(perfil)}>
                                                    Eliminar
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </li>
                    ))}

                    {!casaCompleta && (
                        <li className="flex flex-col items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setCreando(true)}
                                aria-label="Crear un perfil nuevo"
                                className="rounded-hoja border-tinta-3/30 text-tinta-3 hover:border-mango-texto hover:text-mango-texto flex size-28 items-center justify-center border-2 border-dashed transition-colors duration-150"
                            >
                                <Plus aria-hidden className="size-8" />
                            </button>
                            <span className="text-tinta-2 text-sm font-semibold">Agregar perfil</span>
                        </li>
                    )}
                </ul>

                {casaCompleta && <p className="text-tinta-2 text-sm">Ya hay un perfil para cada color de la casa.</p>}

                <TextLink href={route('logout')} method="post">
                    Cerrar sesión
                </TextLink>
            </div>

            <Dialog open={abierto} onOpenChange={(open) => !open && cerrarDialog()}>
                <DialogContent>
                    <DialogTitle>{editando ? 'Editar perfil' : 'Crear perfil'}</DialogTitle>
                    <DialogDescription>
                        {editando ? `Cambiá los datos de ${editando.nombre}.` : 'Elegí un nombre, un color y, si querés, un PIN.'}
                    </DialogDescription>

                    <form onSubmit={guardar} className="grid gap-4">
                        <TextInput
                            id="nombre"
                            label="Nombre"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            error={errors.nombre}
                            autoComplete="off"
                            required
                        />

                        <TextInput
                            id="pin"
                            label="PIN"
                            ayuda="4 a 6 números. Dejalo vacío para no usar PIN."
                            value={data.pin}
                            onChange={(e) => setData('pin', e.target.value)}
                            error={errors.pin}
                            inputMode="numeric"
                            autoComplete="off"
                        />

                        <div className="grid gap-1.5">
                            <span className="text-sm font-medium">Color</span>

                            <div role="group" aria-label="Color del perfil" className="flex gap-2">
                                {COLORES_MIEMBRO.map((c) => {
                                    const disponible = !coloresUsados.has(c);

                                    return (
                                        <button
                                            key={c}
                                            type="button"
                                            disabled={!disponible}
                                            aria-pressed={data.color === c}
                                            aria-label={c}
                                            onClick={() => setData('color', c)}
                                            className={cn(
                                                'rounded-hoja size-11 ring-offset-2 ring-offset-background transition-transform disabled:cursor-not-allowed disabled:opacity-30',
                                                FONDOS[c],
                                                data.color === c ? 'ring-ring scale-105 ring-2' : 'ring-border ring-1',
                                            )}
                                        />
                                    );
                                })}
                            </div>

                            {errors.color && (
                                <p role="alert" className="text-mango-texto flex items-start gap-1.5 text-sm font-semibold">
                                    <TriangleAlert aria-hidden className="mt-px size-4 shrink-0" />
                                    {errors.color}
                                </p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="pana" onClick={cerrarDialog}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {editando ? 'Guardar cambios' : 'Crear perfil'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
