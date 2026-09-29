import { TextInput } from '@/components/formulario/TextInput';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { type useEntrarPerfil } from '@/hooks/use-entrar-perfil';

/** El pedido de PIN al elegir un perfil que lo tiene. Lo chequea el servidor, nunca el front. */
export function PinDialog({ entrada }: { entrada: ReturnType<typeof useEntrarPerfil> }) {
    return (
        <Dialog open={entrada.pidiendo !== null} onOpenChange={(open) => !open && entrada.cerrar()}>
            <DialogContent>
                <DialogTitle>Hola, {entrada.pidiendo?.nombre}</DialogTitle>
                <DialogDescription>Este perfil tiene PIN. Escribilo para entrar.</DialogDescription>

                <form onSubmit={entrada.entrar} className="grid gap-4">
                    <TextInput
                        id="pin-entrada"
                        label="PIN"
                        value={entrada.data.pin}
                        onChange={(e) => entrada.setData('pin', e.target.value.replace(/\D/g, ''))}
                        error={entrada.errors.pin}
                        type="password"
                        inputMode="numeric"
                        maxLength={6}
                        autoComplete="off"
                        autoFocus
                        required
                    />

                    <DialogFooter>
                        <Button type="button" variant="pana" onClick={entrada.cerrar}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={entrada.processing || entrada.data.pin.length < 4}>
                            Entrar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
