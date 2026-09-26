import { COLORES_MIEMBRO, FONDOS, MiembroAvatar } from '@/components/mango/MiembroAvatar';
import { ManoIcon } from '@/components/mango/ManoIcon';
import { TextInput } from '@/components/mango/TextInput';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { usePerfiles } from '@/hooks/use-perfiles';
import { cn } from '@/lib/utils';
import { type Perfil } from '@/types';
import { Head, Link } from '@inertiajs/react';
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

                <ul className="flex flex-wrap items-start justify-center gap-6">
                    {perfiles.map((perfil) => (
                        <li key={perfil.id} className="mat-hoja rounded-placa flex w-40 flex-col items-center gap-3 p-5">
                            <Link
                                href={route('dashboard')}
                                aria-label={`Entrar como ${perfil.nombre}`}
                                className="rounded-hoja focus-visible:ring-ring flex flex-col items-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                            >
                                <MiembroAvatar nombre={perfil.nombre} color={perfil.color} className="size-20" />
                                <span className="max-w-28 truncate text-sm font-semibold">{perfil.nombre}</span>
                            </Link>

                            <div className="flex gap-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    aria-label={`Editar a ${perfil.nombre}`}
                                    onClick={() => editar(perfil)}
                                >
                                    <ManoIcon nombre="lapiz" className="size-4" />
                                </Button>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button type="button" variant="ghost" size="icon" aria-label={`Eliminar a ${perfil.nombre}`}>
                                            <ManoIcon nombre="papelera" className="size-4" />
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
                        <li className="rounded-placa border-tinta-3/30 text-tinta-3 hover:border-mango-texto hover:text-mango-texto flex w-40 flex-col items-center gap-3 border-2 border-dashed p-5 transition-colors duration-150">
                            <button
                                type="button"
                                onClick={() => setCreando(true)}
                                aria-label="Crear un perfil nuevo"
                                className="flex flex-col items-center gap-2"
                            >
                                <span className="rounded-hoja grid size-20 place-items-center border-2 border-dashed border-current">
                                    <ManoIcon nombre="mas" className="size-8" />
                                </span>
                                <span className="text-sm font-semibold">Agregar perfil</span>
                            </button>
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
                                    <ManoIcon nombre="alerta" className="mt-px size-4" />
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
