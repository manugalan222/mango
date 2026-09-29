import { ManoIcon } from '@/components/marca/ManoIcon';
import { Transition } from '@headlessui/react';

/** El "Guardado" que aparece al lado del botón cuando el formulario se mandó bien, y se va solo. */
export function GuardadoText({ visible }: { visible: boolean }) {
    return (
        <Transition show={visible} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
            <p role="status" className="text-verde-dato flex items-center gap-1.5 text-sm font-semibold">
                <ManoIcon nombre="tilde" className="size-4" aria-hidden />
                Guardado
            </p>
        </Transition>
    );
}
