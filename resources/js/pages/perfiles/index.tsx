import { SubrayadoLink } from '@/components/compartidos/SubrayadoLink';
import { COLORES_MIEMBRO } from '@/components/mango/MiembroAvatar';
import { PanelFondo } from '@/components/mango/PanelFondo';
import { AgregarPerfilCard } from '@/components/perfiles/AgregarPerfilCard';
import { PerfilCard } from '@/components/perfiles/PerfilCard';
import { PerfilFormDialog } from '@/components/perfiles/PerfilFormDialog';
import { PinDialog } from '@/components/perfiles/PinDialog';
import { useEntrarPerfil } from '@/hooks/use-entrar-perfil';
import { usePerfiles } from '@/hooks/use-perfiles';
import { type Perfil } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

/**
 * La puerta de la casa una vez que ya entraste: elegís quién sos, como en
 * Netflix. Sin barra todavía — hasta no elegir perfil no hay "adentro".
 */
export default function PerfilesIndex({ perfiles }: { perfiles: Perfil[] }) {
    const [creando, setCreando] = useState(false);
    const formulario = usePerfiles({ alGuardar: () => setCreando(false) });
    const entrada = useEntrarPerfil();

    const casaCompleta = perfiles.length >= COLORES_MIEMBRO.length;
    const coloresUsados = new Set(perfiles.filter((p) => p.id !== formulario.editando?.id).map((p) => p.color));

    const cerrarFormulario = () => {
        setCreando(false);
        formulario.cancelar();
    };

    return (
        <>
            <Head title="Perfiles" />

            <PanelFondo className="flex min-h-svh flex-col items-center gap-10 px-4 py-16">
                <div className="text-center">
                    <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em]">¿Quién anda por casa?</h1>
                    <p className="text-fondo-tinta/80 mt-1 text-sm">Elegí tu perfil para entrar.</p>
                </div>

                <ul className="flex flex-wrap items-start justify-center gap-6">
                    {perfiles.map((perfil) => (
                        <PerfilCard
                            key={perfil.id}
                            perfil={perfil}
                            entrando={entrada.processing}
                            onElegir={entrada.elegir}
                            onEditar={formulario.editar}
                            onEliminar={formulario.eliminar}
                        />
                    ))}

                    {!casaCompleta && <AgregarPerfilCard onAgregar={() => setCreando(true)} />}
                </ul>

                {casaCompleta && <p className="text-fondo-tinta/80 text-sm">Ya hay un perfil para cada color de la casa.</p>}

                <SubrayadoLink href={route('logout')} method="post" as="button" className="text-fondo-tinta decoration-fondo-tinta/35">
                    Cerrar sesión
                </SubrayadoLink>
            </PanelFondo>

            <PerfilFormDialog
                abierto={creando || formulario.editando !== null}
                onCerrar={cerrarFormulario}
                formulario={formulario}
                coloresUsados={coloresUsados}
            />

            <PinDialog entrada={entrada} />
        </>
    );
}
