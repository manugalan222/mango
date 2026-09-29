/**
 * Racha de la casa. Es la única celebración persistente del sistema y va sobre
 * panel oscuro: el ámbar sólo aparece cuando la casa cumplió algo. Si apareciera
 * en todas las pantallas dejaría de significar nada.
 */
export function RachaMeter({ semanas, total = 14 }: { semanas: number; total?: number }) {
    return (
        <>
            <p className="font-display text-panel-ink text-4xl leading-none font-bold tabular-nums">{semanas}</p>
            <p className="text-panel-ink/70 text-sm">semanas seguidas cerrando la semana</p>
            <div className="flex flex-wrap gap-[3px]" role="img" aria-label={`${semanas} de las últimas ${total} semanas cerradas`}>
                {Array.from({ length: total }, (_, i) => (
                    <i key={i} className={i < semanas ? 'bg-ambar size-[11px] rounded-[3px]' : 'bg-panel-ink/20 size-[11px] rounded-[3px]'} />
                ))}
            </div>
        </>
    );
}
