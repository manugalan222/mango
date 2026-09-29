import { ManoIcon } from '@/components/mango/ManoIcon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { type Perfil } from '@/types';

/** El botón de la papelera y la confirmación: borrar un perfil no se deshace. */
export function EliminarPerfilDialog({ perfil, onEliminar }: { perfil: Perfil; onEliminar: (perfil: Perfil) => void }) {
    return (
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
                        <Button type="button" variant="destructive" onClick={() => onEliminar(perfil)}>
                            Eliminar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
