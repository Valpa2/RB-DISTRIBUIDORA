# RB Distribuidora — puesta en marcha

Esta es la versión independiente de tu app, ya sin depender de Claude. Vas a necesitar
crear dos cuentas gratuitas (Supabase y Vercel) y seguir estos pasos una sola vez.
Después de esto, la app queda funcionando sola con su propio link, sin límites de
cuenta ni de plan para nadie de tu equipo.

Tiempo estimado: 20-30 minutos la primera vez.

---

## Paso 1 — Crear la base de datos (Supabase)

1. Entrá a **https://supabase.com** y creá una cuenta gratis (podés usar tu cuenta de Google).
2. Creá un proyecto nuevo ("New project"). Elegí cualquier nombre y una contraseña
   para la base (guardala en algún lado, no la vas a necesitar para esto pero por
   las dudas). Elegí la región más cercana a Argentina si te la ofrece.
3. Esperá 1-2 minutos a que el proyecto termine de crearse.
4. En el menú de la izquierda, andá a **SQL Editor** > **New query**.
5. Abrí el archivo `supabase-setup.sql` que te adjunto, copiá todo su contenido,
   pegalo ahí, y tocá **Run**. Esto crea la tabla donde se van a guardar todos
   tus datos (clientes, stock, pedidos, etc).
6. Andá a **Settings** (el engranaje) > **API**. Ahí vas a ver dos datos que
   necesitás para el siguiente paso:
   - **Project URL** (algo como `https://xxxxx.supabase.co`)
   - **anon public** key (una clave larga)

Guardá esos dos datos, los vas a pegar en el Paso 3.

---

## Paso 2 — Subir el código a GitHub

Vercel (donde va a vivir la app) necesita que el código esté en GitHub.

1. Entrá a **https://github.com** y creá una cuenta gratis si no tenés.
2. Creá un repositorio nuevo (botón verde "New"). Ponele de nombre `rb-distribuidora`,
   dejalo como privado, y creálo (no hace falta tildar ninguna otra opción).
3. En la página del repositorio recién creado, va a haber un botón para subir
   archivos ("uploading an existing file"). Arrastrá **todos** los archivos y
   carpetas de la carpeta que te compartí (`package.json`, `vite.config.js`,
   `index.html`, la carpeta `src`, etc.) y confirmá el commit.

*(Si en algún momento preferís hacerlo con git desde la terminal en vez de la web,
avisame y te paso los comandos.)*

---

## Paso 3 — Publicar la app (Vercel)

1. Entrá a **https://vercel.com** y creá una cuenta gratis — elegí "Continue with GitHub"
   para conectarla directo.
2. Tocá **"Add New" > "Project"**.
3. Elegí el repositorio `rb-distribuidora` que subiste y tocá **Import**.
4. Antes de tocar "Deploy", abrí la sección **Environment Variables** y cargá estas
   dos (con los valores que guardaste en el Paso 1):

   | Name | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | tu Project URL de Supabase |
   | `VITE_SUPABASE_ANON_KEY` | tu clave anon public de Supabase |

5. Tocá **Deploy** y esperá 1-2 minutos.
6. Cuando termine, Vercel te va a dar un link (algo como `rb-distribuidora.vercel.app`).
   **Ese es el link definitivo de tu app** — se lo pasás a tu equipo y listo, sin
   límites de cuenta ni de plan para nadie.

---

## Cómo actualizar la app más adelante

Si en el futuro querés que te agregue o cambie algo, te voy a pasar el código
actualizado. Para que se vea reflejado en tu link:

1. Reemplazá los archivos correspondientes en tu repositorio de GitHub (mismo
   botón de subir archivos, sobrescribiendo).
2. Vercel detecta el cambio solo y vuelve a publicar en 1-2 minutos, en el
   mismo link de siempre.

---

## Notas importantes

- **No hay contraseña general de acceso al link** — cualquiera que lo tenga puede
  abrir la app (el PIN de administrador y los PIN de vendedores siguen
  funcionando igual que antes, esa parte no cambió).
- **La clave `VITE_SUPABASE_ANON_KEY` es pública a propósito** — es la que
  usa el navegador de quien entra a la app, no es secreta. Lo que protege tus
  datos de gente random es que nadie fuera de tu equipo va a tener el link
  de la app.
- Si algún día crecés mucho y necesitás algo más (usuarios con permisos más
  finos, copias de seguridad automáticas, etc.), Supabase lo soporta — avisame
  cuando llegue ese momento y lo vemos.
