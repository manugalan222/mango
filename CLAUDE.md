# MANGO

Plataforma web para administrar el hogar: **finanzas y tareas** compartidas entre los convivientes.

## Git

**Nunca hacer `commit` ni `push` en este repo.** El control de versiones lo maneja Manu. Editar en el working tree y reportar qué se tocó. Comandos de sólo lectura (`status`, `diff`, `log`) están bien.

## Stack

Laravel + Inertia 2 + React 19 + TypeScript + Tailwind v4 (CSS-first, sin `tailwind.config.js`) + shadcn/ui + lucide-react.

```bash
composer run dev      # servidor, cola, logs y vite a la vez
npm run build         # compilar assets
npx tsc --noEmit      # chequeo de tipos
```

Íconos: **lucide**, que es lo que ya trae el kit y lo que declara `components.json`. No cambiar de librería sin una razón mejor que el gusto.

## Convención de nombres

**Archivos de componentes propios: `NombreTipo.tsx`** — nombre en mayúscula seguido del tipo de componente. `TextInput`, `EstadoBadge`, `TareaRow`, `MiembroAvatar`, `BentoGrid`, `CategoriasChart`. Un componente por archivo.

**Hooks en minúscula:** `use-appearance.tsx`, `use-initials.tsx`.

Tres excepciones que **no** se renombran:

1. `components/ui/**` — los genera el CLI de shadcn por nombre en minúscula. Renombrarlos rompe `npx shadcn add`.
2. `pages/**` — Inertia los resuelve por la cadena que manda el servidor (`Inertia::render('dashboard')`). El nombre del archivo es parte del contrato con PHP.
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

- Falta la tabla de perfiles y el selector post-login.
- `MiembroAvatar` y `COLORES_MIEMBRO` ya están pensados para perfiles, no para usuarios.
- `NavUser` en el pie de la barra lateral hoy muestra la casa; va a ser el **cambiador de perfil**.
- Cuando exista `Perfil`, la persona deja de ser `User` en todo el código.

---

# Sistema de diseño

Salió de fotos de living que mandó Manu, no de una búsqueda de tendencias. La tesis: **no es Memphis, es la hora dorada en una sala de living a las siete de la tarde.** Documento con el razonamiento completo, las mediciones y las alternativas descartadas:
<https://claude.ai/code/artifact/58029993-24a3-4144-9b03-8590db9f63af>

Intensidad elegida: **Amueblado** (de tres posibles: Sobrio, Amueblado, Habitado).

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
| `.mat-almohadon` + `.hunde` | tejido de nudo | botón primario, pestaña activa |
| `.mat-pana` + `.hunde .hunde-pana` | pana del sillón | botón secundario |
| `.mat-panel-liso` | verde liso, fibra y caída de luz | barra lateral, panel de auth, tarjeta de logro |
| `.mat-papel` | mate absoluto | tarjetas |
| `.mat-ceramica` | vidriado de torno | alternativa al primario, guardada |
| `.mat-vidrio` | desenfoque | toasts, modales |

Un objeto lleva **un** material. En cuanto una tarjeta de papel se pone brillo de cerámica, el sistema se vuelve decoración.

**Tres reglas que costaron varias vueltas y no hay que volver a discutir:**

1. La textura vive entre **4 y 11% de opacidad**. Si se lee desde lejos, está fuerte. Cada tela tiene una segunda intensidad (`--tex-*-fuerte`) que es **sólo** para plaquetas de muestra, nunca para un componente.
2. El **ritmo** (rayas, canas, tramas) sólo en lo que se mira poco: botones, chips, sellos. Nunca en superficie permanente — un patrón repetido en algo que está siempre en pantalla es un metrónomo para el ojo. Ahí va fibra y caída de luz (`--luz-panel`), que no se repiten.
3. El hundimiento se **ilumina**, no se dibuja: una pared en sombra y otra iluminada, desplazadas del punto de contacto, más una veladura ancha. Un centro oscuro se lee como agujero, no como volumen. Los pliegues van **debajo** del sombreado y son seis y cinco, no veinte.

### Arriba y abajo

El botón está **apoyado** sobre el papel: luz arriba, sombra proyectada abajo.
El input está **hundido** en el papel: sombra interior, sin elevación.
Es la única señal de affordance que necesita el sistema.

## 4. Formas — una por rol

`rounded-almohadon` (22/16, botones) · `rounded-lg` (11px, inputs, filas, chips de fecha) · `rounded-placa` (16px, tarjetas) · `rounded-full` (etiquetas de estado) · `rounded-hoja` (marca: avatar, nav activa, sello) · `rounded-arco` (marcos de ilustración).

El radio del almohadón es **más ancho que alto** a propósito: eso es lo que lo hace leer relleno y no cortado.

## 5. Movimiento

120ms hover · 150ms cambios de color · 180ms check de tarea · 240ms entrada de tarjeta · stagger 0,03s con `y:8px`.

Salida más rápida que entrada, **salvo el hundimiento**: 80ms para hundirse y 420ms para volver (380ms la pana), porque la espuma tarda en recuperarse. Nada de `bounce`: es el equivalente animado de Memphis.

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
| `PanelCard.tsx` | tarjeta de papel, anchos 2/3/4 |
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

`ui/button.tsx` (variantes `almohadon`, `pana`, `ceramica` + el hundimiento que sigue al puntero), `ui/input.tsx` (hundido), `ui/checkbox.tsx` (forma del sistema), `ui/label.tsx`, `input-error.tsx`, `text-link.tsx`.

El hundimiento escribe `--px`/`--py` **una sola vez en `pointerdown`**: mover el gradiente repinta, así que seguir el puntero cuadro a cuadro sacaría el efecto del compositor. Después sólo se anima `opacity`.

## Layouts

- `layouts/auth/auth-simple-layout.tsx` — **la puerta.** Fondo verde **plano**: es lo único de todo el sistema que no lleva material, porque todavía no estás adentro de la casa. El slogan arriba, como el cartel sobre la puerta. El formulario vive dentro de un arco de luz cálida — una puerta abierta vista desde afuera.

  El arco es un **semicírculo exacto**: el radio superior es la mitad del ancho del panel (11,5rem sobre 23rem). Con un radio menor deja un tramo recto arriba y se lee como rectángulo redondeado, no como arco. Si cambia el ancho del panel, el radio tiene que cambiar con él.

  El centrado usa `m-auto`, no `justify-center`: si el formulario es más alto que la pantalla, `justify-center` recorta el borde de arriba y no se puede llegar scrolleando.
- `layouts/app/app-sidebar-layout.tsx` — sin cambios estructurales; la barra lateral toma el estilo desde `app.css`.

La clase `.nav-activa` va **sin `@layer`** a propósito: las utilidades de Tailwind son una capa posterior a `components` y ganarían por orden de capa aunque tengan menos especificidad.

---

# Pendiente

- **La hoja partida** (símbolo) y **Carozo** (mascota) están sin rediseñar. Los conceptos están aprobados; los dibujos actuales se ven infantiles y de bajo costo. `marca.tsx` aísla la hoja a propósito: rediseñarla es cambiar un archivo, y todo lo que la usa (avatar, pestaña activa, sello, logotipo) se actualiza solo.
- `/plata`, `/tareas`, `/compras` y `/casa` están en la nav pero no tienen ruta.
- `pages/dashboard.tsx` es un placeholder de 20 líneas. **No se puede borrar:** `route('dashboard')` es el destino al que Laravel manda después del login y del registro. La maqueta con datos de ejemplo que había ahí se desarmó entera en `components/mango/`; no quedó nada de ella en las páginas.
- Falta el modelo de datos: casa, convivientes, gastos, tareas, vencimientos.
- Un solo error de TypeScript preexistente: `welcome.tsx` usa `mix-blend-mode: 'plus-darker'`, que no está en los tipos de React. Esa página es la de bienvenida del starter y hay que reemplazarla.
- Se borraron los archivos muertos del starter kit: los dos layouts de auth alternativos, el layout de app con encabezado, `app-header`, `app-logo-icon` (el logo de Laravel), `appearance-dropdown`, `nav-footer` y `placeholder-pattern` (que existía sólo para rellenar la maqueta). Ninguno tenía referencias.
