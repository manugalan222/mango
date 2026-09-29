import { SeccionHeader } from '@/components/ajustes/SeccionHeader';
import { EnviarButton } from '@/components/formulario/EnviarButton';
import { TextInput } from '@/components/formulario/TextInput';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

/**
 * Borrar la casa entera: la cuenta, los perfiles y todo lo anotado. Pide la
 * contraseña de la casa antes, porque no se puede deshacer.
 */
export function EliminarCasaDialog() {
    const inputContrasena = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });

    const eliminar: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => cerrar(),
            onError: () => inputContrasena.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const cerrar = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="flex flex-col gap-6">
            <SeccionHeader titulo="Eliminar la casa" descripcion="Se borra la cuenta con todos sus perfiles, tareas y gastos." />

            <div className="bg-mango-suave flex flex-col items-start gap-4 rounded-lg p-4">
                <p className="text-tinta text-sm">
                    <strong className="font-bold">Esto no se puede deshacer.</strong> Si alguien más vive en la casa, avisale antes.
                </p>

                <Dialog onOpenChange={(abierto) => !abierto && cerrar()}>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Eliminar la casa</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>¿Eliminar la casa?</DialogTitle>
                        <DialogDescription>
                            Se borran la cuenta, los perfiles y todo lo que anotaron. Escribí la contraseña de la casa para confirmar.
                        </DialogDescription>

                        <form className="grid gap-4" onSubmit={eliminar}>
                            <TextInput
                                id="password"
                                label="Contraseña de la casa"
                                type="password"
                                ref={inputContrasena}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="current-password"
                                error={errors.password}
                            />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="pana">
                                        Cancelar
                                    </Button>
                                </DialogClose>

                                <EnviarButton procesando={processing} textoProcesando="Eliminando" variant="destructive">
                                    Eliminar la casa
                                </EnviarButton>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
