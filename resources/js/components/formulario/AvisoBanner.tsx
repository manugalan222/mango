/** Un aviso de que algo salió bien —"te mandamos el correo"—, arriba del formulario. */
export function AvisoBanner({ children }: { children: React.ReactNode }) {
    return (
        <p role="status" className="bg-ok-bg text-ok-ink rounded-lg px-3 py-2.5 text-sm font-semibold">
            {children}
        </p>
    );
}
