import { TextInput } from '@/components/formulario/TextInput';
import { type ColorMiembro } from '@/components/mango/MiembroAvatar';
import { ColorSelector } from '@/components/perfiles/ColorSelector';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { type usePerfiles } from '@/hooks/use-perfiles';

interface PerfilFormDialogProps {
    abierto: boolean;
    onCerrar: () => void;
    formulario: ReturnType<typeof usePerfiles>;
    coloresUsados: Set<ColorMiembro>;
}

/**
 * Alta y edición de un perfil en el mismo diálogo: si `formulario.editando`
 * tiene un perfil, edita ese. El PIN vacío al editar conserva el que tenía;
 * para sacarlo está el checkbox de `quitar_pin`.
 */
export function PerfilFormDialog({ abierto, onCerrar, formulario, coloresUsados }: PerfilFormDialogProps) {
    const { data, setData, processing, errors, editando, guardar } = formulario;

    return (
        <Dialog open={abierto} onOpenChange={(open) => !open && onCerrar()}>
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
                        label={editando?.tiene_pin ? 'PIN nuevo' : 'PIN'}
                        ayuda={
                            editando?.tiene_pin
                                ? '4 a 6 números. Dejalo vacío para mantener el PIN actual.'
                                : '4 a 6 números. Dejalo vacío para no usar PIN.'
                        }
                        value={data.pin}
                        onChange={(e) => setData('pin', e.target.value.replace(/\D/g, ''))}
                        error={errors.pin}
                        type="password"
                        inputMode="numeric"
                        maxLength={6}
                        autoComplete="new-password"
                        disabled={data.quitar_pin}
                    />

                    {editando?.tiene_pin && (
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="quitar_pin"
                                checked={data.quitar_pin}
                                onCheckedChange={(v) => setData((d) => ({ ...d, quitar_pin: v === true, pin: '' }))}
                            />
                            <Label htmlFor="quitar_pin" className="font-normal">
                                Quitar el PIN de {editando.nombre}
                            </Label>
                        </div>
                    )}

                    <ColorSelector valor={data.color} onElegir={(c) => setData('color', c)} usados={coloresUsados} error={errors.color} />

                    <DialogFooter>
                        <Button type="button" variant="pana" onClick={onCerrar}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {editando ? 'Guardar cambios' : 'Crear perfil'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
