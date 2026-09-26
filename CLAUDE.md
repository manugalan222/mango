# MANGO

Plataforma web para administrar el hogar: **finanzas y tareas** compartidas entre los convivientes.

## Git

**Nunca hacer `commit` ni `push` en este repo.** El control de versiones lo maneja Manu. Editar en el working tree y reportar qué se tocó. Comandos de sólo lectura (`status`, `diff`, `log`) están bien.

## Stack

Laravel + Inertia 2 + React 19 + TypeScript + Tailwind v4 (CSS-first, sin `tailwind.config.js`) + shadcn/ui. Íconos propios dibujados a mano (`ManoIcon`).

```bash
composer run dev      # servidor, cola, logs y vite a la vez
npm run build         # compilar assets
npx tsc --noEmit      # chequeo de tipos
```

Íconos: **`ManoIcon`** (`components/mango/ManoIcon.tsx`), dibujados a mano con la tinta del contorno (2.3, puntas redondas, trazo irregular), en grilla 24×24: `<ManoIcon nombre="recibo" className="size-4" />`. Reemplazaron a lucide en **toda** la app por decisión de Manu —la geometría de regla chocaba con las hojas y el subrayado a mano—. Un ícono nuevo se dibuja ahí y se suma al registro `TRAZOS`; no se importa de ninguna librería. `lucide-react` sigue instalado sólo porque `components.json` lo declara: **todo componente que agregue `npx shadcn add` trae imports de lucide que hay que cambiar por `ManoIcon`.**

## Rutas

Dos archivos, según qué devuelve la ruta:

- **`routes/web.php`** — sólo vistas: los `GET` que hacen `Inertia::render(...)`. Ahí vive `perfiles.index`.
- **`routes/internal_api.php`** — las mutaciones que el propio frontend dispara vía Inertia (`store`, `update`, `destroy`), con `Route::apiResource(...)->except(['index', 'show'])`. Se registra con un `require` más en `web.php`, igual que `settings.php` y `auth.php` — **no** es la key `api` de `bootstrap/app.php`: correr ahí lo pondría bajo el stack `api` (sin sesión, sin CSRF), y el frontend manda cookie de sesión, no token. No es una API pública, es la forma de separar "vista" de "mutación" dentro de la misma app.

Cada recurso nuevo repite el patrón de `perfiles`: `Enum` (si el campo lo pide) → `Model` → un `FormRequest` unificado para alta y edición → `Service` con la lógica → `Controller` fino que delega al Service → ruta de vista en `web.php` + `apiResource` en `internal_api.php`.

**Ojo con `Route::apiResource`/`Route::resource` y nombres en español:** el pluralizador de Laravel no sabe castellano — de `perfiles` saca el parámetro `{perfile}`, no `{perfil}`, y eso rompe el binding con la variable del controller. Agregar siempre `->parameters(['<recurso>' => '<singular>'])`. Le va a pasar a `tareas`, `compras`, `gastos` y `casa` cuando se arme esas rutas.

## Convención de nombres

**Archivos de componentes propios: `NombreTipo.tsx`** — nombre en mayúscula seguido del tipo de componente. `TextInput`, `EstadoBadge`, `TareaRow`, `MiembroAvatar`, `BentoGrid`, `CategoriasChart`. Un componente por archivo.

**Hooks en minúscula:** `use-appearance.tsx`, `use-initials.tsx`.

Tres excepciones que **no** se renombran:

1. `components/ui/**` — los genera el CLI de shadcn por nombre en minúscula. Renombrarlos rompe `npx shadcn add`.
2. `pages/**` — Inertia los resuelve por la cadena que manda el servidor (`Inertia::render('dashboard')`). El nombre del archivo es parte del contrato con PHP.

**Layout persistente:** una página de app **no** se envuelve en `<AppLayout>` dentro de su JSX; lo declara aparte, `Pagina.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;` (con `breadcrumbs` si hace falta). Así Inertia mantiene montada la barra al navegar y sólo cambia el contenido. Envuelta adentro, la barra se desmonta en cada click y el subrayado nace ya dibujado, sin animar.
3. Los archivos que vienen del starter kit (`app-sidebar.tsx`, `nav-main.tsx`, `input-error.tsx`…). La convención es para lo que escribimos nosotros; renombrar lo ajeno sólo agrega ruido al diff.

---

# El modelo: el usuario es la casa

**Una cuenta por hogar.** El `User` de Laravel **es la casa**, no la persona: `user.name` es el nombre del hogar y `user.email` es el correo con el que entra la casa entera.

Adentro van los **perfiles** de cada conviviente, como los perfiles de Netflix. Al entrar se elige perfil; ese perfil es el que aparece en las tareas, en los gastos y en los avatares.

Consecuencias que ya están en el código:

- El registro pide **el nombre de la casa**, no el de la persona.
- El login dice *"Entrá a tu casa"* y el campo es *"Correo de la casa"*.
- `AppLogo` muestra `auth.user.name` debajo de la marca: es el nombre del hogar.
- `types/index.ts` exporta `Casa` como alias de `User`, con la advertencia.

Consecuencias pendientes:

- La tabla de perfiles ya existe (`Perfil`, `pages/perfiles/index.tsx`, el selector "¿Quién anda por casa?" post-registro). Falta que **elegir un perfil ahí abra sesión de perfil**: hoy el click manda directo a `/dashboard` sin guardar cuál se eligió.
- `MiembroAvatar` y `COLORES_MIEMBRO` ya están pensados para perfiles, no para usuarios.
- `NavUser`, en la barra superior, hoy muestra la casa (Ajustes, Cerrar sesión); va a ser el **cambiador de perfil**.
- Cuando el perfil activo viaje en sesión, la persona deja de ser `User` en todo el código de tareas/gastos.

---

# Sistema de diseño

Arrancó de fotos de living que mandó Manu — la tesis original era **la hora dorada en una sala de living a las siete de la tarde**, con muebles como metáfora de material (almohadón, pana, cerámica). Ese documento queda como archivo, con el razonamiento y las mediciones que siguen valiendo (color, tipografía, accesibilidad):
<https://claude.ai/code/artifact/58029993-24a3-4144-9b03-8590db9f63af>

**La metáfora cambió: de la casa al cuaderno de la casa.** Se dejó de simular muebles —dejó de sentirse propio y se volvía decorativo— y ahora el material es papel: tarjetas como hojas de cuaderno, contorno de tinta, sombra dura de sticker, textura de rayado y una pátina de desgaste bien tenue. El color, la tipografía y las reglas de accesibilidad de abajo **no cambiaron** — es la sección 3 (Materiales) la que se reescribió entera.

**Slogan: QUE EN TU CASA NUNCA FALTE UN MANGO.** Siempre en versales. Va en la puerta de entrada y en cualquier pieza de marca; adentro de la app no se repite.

## 1. Color

Todo vive en `resources/css/app.css`, en **OKLCH**, en dos capas:

1. **Semántica de shadcn** — `--primary`, `--card`, `--border`, `--ring`… Es la que usan los componentes. Preferir siempre esta.
2. **Nombres de MANGO** — `--mango`, `--panel`, `--tinta`, `--yeso`… Para cuando un componente necesita el *material* y no el rol. Expuestas a Tailwind como `bg-mango`, `text-tinta-2`, etc.

**Modo claro** = la sala de día: yeso cálido, papel, verde sillón.
**Modo oscuro** = la sala de noche: nogal, el mismo verde, mango más encendido.
Ambos son el mismo sistema; el oscuro no es una inversión del claro.

### La regla que no se rompe

**El color de relleno y el color de texto son distintos.**

| Token | Para qué | Contraste |
| --- | --- | --- |
| `--mango` | rellenos grandes y marcas de gráfico | — |
| `--mango-texto` | texto chico, links, mensajes de error | 4,92:1 |
| `--mango-boton` | relleno con texto blanco encima | 4,93:1 |
| `--verde` | marca de gráfico | — |
| `--verde-dato` | monto de ingreso, fondo de check | 4,94:1 |

Usar `--mango` en texto chico **falla WCAG**. Ya pasó dos veces; no vuelve a pasar.

### Paleta categórica

`--chart-1..5` = mango, verde, ámbar, ciruela, arcilla. Validada por banda de luminosidad, piso de croma y separación bajo protanopía, deuteranopía y tritanopía. **No agregar un sexto color sin volver a validar.**

Cada conviviente recibe uno de esos cinco, y **ese mismo color lo representa en todos los gráficos**: si ves una barra ciruela en el gasto del mes, sabés de quién es antes de leer la etiqueta.

### Estados semánticos

`--ok-bg`/`--ok-ink`, `--warn-bg`/`--warn-ink`, `--mia-bg`/`--mia-ink`. Todos definidos en los dos temas. **Nunca** un color de Tailwind suelto (`text-red-600`) en un componente: el rojo frío ensucia una paleta cálida y no tiene par en modo oscuro.

Verde = completado. Mango = seleccionado o urgente. Son significados distintos y no se mezclan.

## 2. Tipografía

- **Display:** Bricolage Grotesque (`font-display`). Autoalojada vía `@fontsource-variable`, ejes `opsz` y `wght`.
- **UI:** Hanken Grotesk (`font-sans`), autoalojada.
- Los `h1`–`h4` toman la display automáticamente desde `@layer base`.

**El impacto no lo da la fuente, lo da el seteo:** peso 700–800 y tracking entre −3% y −4,5%. Una display en 600 con tracking normal desaparece — así fue como Fraunces se sintió genérica y terminó afuera.

**Excepción: las versales van al revés.** El slogan y cualquier texto en mayúsculas llevan tracking *positivo* (+1,5%), no negativo. Las mayúsculas necesitan más aire entre sí que la caja baja; apretarlas las vuelve un bloque. La regla de tracking cerrado es para texto en caja mixta.

## 3. Materiales — un material por rol

| Clase | Material | Rol |
| --- | --- | --- |
| `.mat-hoja` | papel liso, contorno de tinta, sombra dura | tarjetas |
| `.mat-hoja-oscura` | la misma hoja, sobre panel verde | la única tarjeta de logro por pantalla |
| `.hoja-rayado` | rayado de cuaderno (pseudo-elemento, se suma a `.mat-hoja`) | la sección que necesite esa textura — nunca las dos a la vez |
| `.mat-pegatina` + `.mat-pegatina-mango`/`-verde`/`-lino` | pastilla de tinta y sombra dura | botones (primario, secundario, alternativa guardada) |
| `.mat-panel-liso` | verde liso, fibra, grano y caída de luz | barra superior, panel de auth |
| `.mat-vidrio` | desenfoque | toasts, modales |

`.hoja-fija` se suma a `.mat-hoja` para la hoja que **no** se levanta al pasar el mouse: la `HojaBoard`, que ocupa la página y en `SeccionTabs` lleva marcadores montados en el borde — si se despegara, los marcadores quedarían flotando aparte. Las hojas chicas (`PanelCard`) sí se despegan.

Un objeto lleva **un** material. La pátina de desgaste (una mancha de `--arcilla` casi insinuada, 16% de opacidad, `mix-blend-mode`) viene **incluida** en `.mat-hoja`/`.mat-hoja-oscura` — no es una clase aparte, así no hay que acordarse de sumarla tarjeta por tarjeta.

`--grano` es más fino que `--fibra` y vive sólo en `.mat-panel-liso` — no es una tercera textura de papel, es parte de la receta del verde. No sumarlo a `.mat-hoja`: la regla de "sólo liso y rayado" (punto 3 más abajo) sigue siendo para el papel.

**Lo que costó varias vueltas y no hay que volver a discutir:**

1. **Nada se hunde, todo se despega.** El sistema anterior simulaba muebles de living (almohadón, pana, cerámica) con un hundimiento que seguía el puntero. Se abandonó: dejó de sentirse propio. Ahora una tarjeta o un botón se **levantan** al pasar el mouse —`translate` + rotación mínima + la sombra dura crece— y se aplastan al clickear. Es el mismo lenguaje en toda la casa: hoja y pegatina comparten la mecánica, sólo cambian radio y tamaño de sombra.
2. La sombra es **dura y desplazada** (`5px 6px 0 0 var(--tinta)`), nunca difusa: es lo que lee como sticker/recorte y no como elevación de Material Design.
3. Sólo dos texturas de papel: **liso** (por defecto, sin clase) y **rayado** (`.hoja-rayado`). Se probaron cuadriculado y punteado y se sacaron por sobrecargados. La pátina de desgaste no cuenta como textura de "ritmo" —es una sola mancha, no un patrón repetido— así que puede vivir en superficie permanente sin romper la regla de siempre: ritmo sólo en lo que se mira poco, fibra y luz en lo que está siempre en pantalla.
4. Anillos de espiral (borde de cuaderno) son un **acento ocasional**, no un material: van en una tarjeta puntual (por ejemplo, Notas) y nunca en todo un bento — si aparecen en cada tarjeta se vuelven el mismo metrónomo que ya se evitó con fibra y luz.

### Arriba y abajo

El botón y la tarjeta están **apoyados**, no hundidos: contorno de tinta, sombra proyectada que se agranda al pasar el mouse. El input sigue **hundido** en el papel —sombra interior, sin elevación— porque ahí el hundimiento comunica "esto se llena", no "esto es un mueble". Es la única señal de affordance que necesita el sistema.

## 4. Formas — una por rol

`rounded-full` (botones, etiquetas de estado) · `rounded-lg` (11px, inputs, filas, chips de fecha) · `rounded-placa` (16px, tarjetas) · `rounded-hoja` (marca: avatar, sello).

## 5. Movimiento

120ms hover · 150ms cambios de color · 180ms check de tarea · 240ms entrada de tarjeta · stagger 0,03s con `y:8px`.

**El rebote ya no está prohibido.** La regla anterior ("nada de `bounce`, es Memphis animado") se revisó a propósito: el sistema dejó de perseguir sobriedad de mueble y ahora es caricaturesco a propósito. Tarjetas y botones usan `cubic-bezier(0.34, 1.56, 0.64, 1)` —un rebote real, no lineal— al levantarse (160–180ms) y un aplastamiento seco al clickear. Sigue habiendo una sola fuente de rebote en pantalla a la vez: no hace falta que todo bote todo el tiempo para que se sienta vivo.

Todo detrás de `prefers-reduced-motion`, ya cubierto globalmente en `app.css`.

## 6. Accesibilidad — lo que ya se midió

- Contraste 4,5:1 para texto normal, 3:1 para texto grande en negrita (≥18,66px) y para elementos no textuales.
- La inicial del avatar va en **20px/800** por eso: espresso sobre verde da 3,71:1, insuficiente para texto normal pero sobre el umbral de texto grande. El tamaño es lo que habilita el color pleno. El avatar `mini` (24px) no lleva inicial: queda sólo el color, y el nombre va en `aria-label`.
- **Un control que parece operable tiene que serlo.** Nada de `div` clickeable: `button` con `aria-pressed` y el target es la fila entera, no el cuadradito.
- Target mínimo 44px de alto en todo lo que se toca. `touch-action: manipulation` ya está aplicado globalmente a `button`, `a`, `[role=button]` y `label`.
- Íconos decorativos junto a texto visible: `aria-hidden`. Íconos solos: el control necesita nombre accesible.
- Foco siempre visible: anillo `--ring` de 2px con offset. Nunca `outline: none` sin reemplazo.
- **Autenticación accesible** (WCAG 2.2 AA): los campos llevan `autocomplete` correcto (`email`, `current-password`, `new-password`, `name`) y **no se bloquea el pegado**. Nunca poner `onPaste={e => e.preventDefault()}` en un campo de contraseña: rompe los gestores de contraseñas y es un incumplimiento, no una medida de seguridad.

## 7. Formularios

- **Label siempre visible arriba.** Nunca sólo placeholder: el placeholder desaparece al escribir, justo cuando hace falta la referencia.
- El error va **debajo del campo**, no en un resumen arriba, con ícono y `role="alert"`, enlazado por `aria-describedby` y con `aria-invalid` en el input.
- Los errores dicen **qué pasó y cómo arreglarlo**. Sin "Ups", sin caritas, sin disculpas.
- La ayuda va debajo del campo, en `--tinta-2`, antes del error.
- Usar `<TextInput>` de `components/mango/TextInput.tsx`, que cablea todo eso.
- `useForm` **sin genérico explícito**: se infiere del estado inicial y evita la restricción de índice de `FormDataType`.

### Idioma de los mensajes

`APP_LOCALE=es`. Las traducciones viven en `lang/es/` — `validation.php` completo (135 claves), más `auth`, `passwords` y `pagination`. **No hay `lang/en/`**: Laravel 11+ trae las traducciones inglesas dentro del framework y las usa de respaldo solo, así que publicarlas sería duplicar algo que nadie va a mantener.

El array `attributes` de `lang/es/validation.php` nombra los campos **con artículo y en términos de la casa** — `name` es *"el nombre de la casa"*, `email` es *"el correo de la casa"* — para que la frase cierre: *"Falta completar el correo de la casa."* Si se agrega un campo nuevo al formulario, agregarlo también ahí o el mensaje va a decir el nombre técnico en inglés.

## 8. Reglas de producto

- La diversión vive del lado de las tareas. **El estilo toca el marco, nunca el número.**
- Un acento por pantalla. Un botón primario por pantalla.
- El latón y el ámbar sólo aparecen cuando la casa cumplió algo. Si aparecen siempre, dejan de valer.
- Todo monto pasa por `<Plata>`: `tabular-nums` y una sola regla de tono.
- Nada de juegos de palabras con la fruta: ni "dulce", ni "jugoso", ni "fruto de tu esfuerzo". Es la trampa obvia y agota la marca en dos semanas.

---

# Componentes

## Propios — `resources/js/components/mango/`

| Archivo | Para qué |
| --- | --- |
| `HojaIcon.tsx` | el símbolo de marca |
| `MangoLogo.tsx` | el logotipo dibujado |
| `TextInput.tsx` | label + input + ayuda + error, todo cableado |
| `PlataText.tsx` | todo monto, en es-AR y tabular (+ `formatearPesos`) |
| `EstadoBadge.tsx` | estado de un pago o una tarea (lino) |
| `SelloBadge.tsx` | logro, en forma de hoja |
| `MiembroAvatar.tsx` | identidad de cada conviviente (+ `COLORES_MIEMBRO`) |
| `BentoGrid.tsx` | muro de galería de 6 columnas |
| `PanelCard.tsx` | hoja chica del mismo papel que `HojaBoard` (rayada por defecto, título escrito arriba), anchos 2/3/4. El muro del dashboard |
| `HojaBoard.tsx` | la hoja grande de una página, rayada y fija, con el título adentro. Finanzas y Hogar (vía `SeccionTabs`) y ajustes |
| `EstadoVacio.tsx` | ícono + qué falta + acción, para cuando todavía no hay datos reales |
| `SeccionTabs.tsx` | la hoja de una sección con sus marcadores: sólo las subsecciones de lo que eligió la barra superior (Finanzas → Gastos, Deudas, Ahorros), nunca las de otra sección. Sincroniza `?tab=` |
| `PanelFondo.tsx` | el verde texturado (`.mat-panel-liso`) como fondo: la puerta de auth y **toda** la app. Texto suelto encima va en `text-panel-ink` |
| `FilasList.tsx` | lista de filas |
| `FilaItem.tsx` | fila con punteada |
| `TareaRow.tsx` | quehacer marcable |
| `DeudaRow.tsx` | deuda entre convivientes |
| `PagoRow.tsx` | vencimiento próximo |
| `RachaMeter.tsx` | semanas cerradas |
| `ProgresoMeter.tsx` | medidor de una serie |
| `CategoriasChart.tsx` | barras con etiqueta directa |

El bento usa **sólo tres anchos** (2, 3 y 4 de 6). Limitar los anchos es lo que hace que un muro desordenado se lea ordenado.

Las barras llevan **etiqueta directa** en cada una: nadie tiene que cruzar una leyenda, y el color deja de ser el único portador del significado.

## De shadcn — modificados

`ui/button.tsx` (variantes `almohadon`, `pana`, `ceramica` sobre `.mat-pegatina`; las claves de variante no cambiaron aunque el material sí, para no tener que tocar cada call site), `ui/input.tsx` (hundido), `ui/checkbox.tsx` (forma del sistema), `ui/label.tsx`, `input-error.tsx`, `text-link.tsx`, `ui/tabs.tsx` (restyleado para `SeccionTabs`, agregado con el CLI de shadcn).

## Navegación

`components/app-header.tsx` — la barra superior, estilo Netflix: no hay sidebar. Logo pegado a la esquina izquierda, los tres destinos (`nav-main.tsx`) con aire entre sí, luz + perfil + cerrar sesión a la derecha. Barra y página son **un solo fondo**: `.mat-panel-liso` va con `background-attachment: fixed`, así la barra sticky muestra el mismo pedazo de verde que tiene detrás, y la separa sólo una línea de `panel-ink` al 14%. (Con su propia luz calculada sobre 64px se leía como sombra interna.)

Los destinos van **sin íconos**, sólo el nombre en la display (700, activo 800): son tres palabras que nadie reconoce antes por el dibujo, y el subrayado es el único adorno. La sección activa **no** se rellena — eso era la pastilla `rounded-hoja` del sistema viejo — se subraya: cada link lleva un `<svg>` con un único `path` en zigzag de esquinas redondeadas (uno distinto por destino) que se dibuja **como a mano** en 320ms: keyframes `trazo-*` en `app.css` con una parada por giro y curva propia por tramo (apoya, afloja en cada vuelta, levanta). Al salir no se desdibuja para atrás, se levanta por opacidad. Si se cambia un zigzag hay que volver a medir sus paradas. El color del link activo es `panel-ink` pleno; ojo con reusar `on-mango` para texto suelto sobre el panel — está pensado para texto sobre un relleno mango y en modo oscuro es casi negro, no lee sobre verde.

`layouts/app/app-header-layout.tsx` es el único layout de app; no hay variante de sidebar.

## Layouts

- `layouts/auth/auth-simple-layout.tsx` — **la puerta.** Ya no es el único fondo sin material: usa `.mat-panel-liso`, la misma receta de verde que la barra superior (fibra, grano y la luz de la repisa, anclada arriba a la izquierda — ventana de día, se calienta a mango de noche, sin moverse de lugar. Antes había una bola de luz difusa que saltaba de esquina a esquina al cambiar de tema; se sacó por low-cost). El slogan arriba, como el cartel sobre la puerta. El formulario vive en una **hoja de cuaderno** (`.mat-hoja.hoja-rayado`) apoyada sobre ese panel —ya no en un arco: el arco simulaba una puerta, y esa metáfora de casa se dejó junto con los muebles.

  El centrado usa `m-auto`, no `justify-center`: si el formulario es más alto que la pantalla, `justify-center` recorta el borde de arriba y no se puede llegar scrolleando.
- `layouts/app/app-header-layout.tsx` — la barra superior toma el estilo desde `app.css`. Toda la app se apoya sobre `PanelFondo`, el mismo verde del login. Lo que va suelto sobre el verde (el saludo del dashboard, las migas de pan) lleva `text-panel-ink`: `--tinta` sobre ese verde no llega a contraste en modo claro.

---

# Pendiente

- **La hoja partida** (símbolo) y **Carozo** (mascota) están sin rediseñar. Los conceptos están aprobados; los dibujos actuales se ven infantiles y de bajo costo. `HojaIcon.tsx` aísla la hoja a propósito: rediseñarla es cambiar un archivo, y todo lo que la usa (avatar, sello, logotipo) se actualiza solo.
- `/dashboard`, `/finanzas` y `/hogar` tienen ruta y página real, pero Finanzas y Hogar son estados vacíos honestos —sin datos hardcodeados— porque todavía no existe el modelo de gastos/deudas/ahorros/tareas/notas detrás. El dashboard igual, salvo los avatares de perfiles, que ya son datos reales.
- Falta el modelo de datos: gastos, deudas, ahorros, tareas, notas y sus vencimientos. `Perfil` (convivientes) ya existe.
- Falta que elegir un perfil en `/perfiles` abra sesión de perfil de verdad (ver "El modelo: el usuario es la casa" más arriba).
- `welcome.tsx` y la bienvenida de Laravel/Inertia en `/` se sacaron: la raíz ahora redirige a `/dashboard` o `/login` según haya sesión. De paso se fue el único error de TypeScript preexistente que traía esa página (`mix-blend-mode: 'plus-darker'`).
- Se borraron, en distintos momentos, los archivos muertos del starter kit y del sistema de living retirado: los layouts de auth alternativos, el sidebar completo (`app-sidebar.tsx`, `nav-main` viejo, `ui/sidebar.tsx`, `use-mobile.tsx`), `app-logo-icon`, `appearance-dropdown`, `nav-footer`, `placeholder-pattern`, `app-shell` y `heading` (reemplazados por `PanelFondo` y `HojaBoard`), y en `app.css` los materiales de living (`mat-almohadon`, `mat-pana`, `mat-ceramica`, `mat-papel`, el mecanismo `.hunde`) con sus tokens (`--tex-nudo`, `--tex-pana`, `--ceramica-hi`, `--vidriado-torno`, `--radius-almohadon`, `--radius-arco`). Ninguno tenía referencias después del cambio que lo dejó obsoleto.
