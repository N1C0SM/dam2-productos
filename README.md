# dam2-productos

Actividad guiada — **Ionic + Angular Standalone: consumo de API REST** (DAM2 – Desarrollo de Interfaces).

Aplicación Ionic con Angular Standalone que consume `https://dummyjson.com/products`
y muestra los productos en una tabla paginada.

## Vistas

| Ruta | Descripción |
|---|---|
| `/inicio` | Pantalla inicial: ir a productos |
| `/productos` | Productos paginados (10 por página): vista **tabla** o **tarjetas** |

- `/` redirige a `/inicio`
- Cualquier ruta desconocida redirige a `/inicio`

## Columnas de la tabla

ID, producto (con imagen), categoría, marca, precio, valoración, stock,
**dimensiones (ancho × alto)** y **stock valorado**.

El stock valorado se calcula con una función pura del modelo:

```
stock valorado = unidades × (precio − descuento aplicable)
```

## Funcionalidades

- Consumo de la API REST con `HttpClient` y `provideHttpClient()`.
- Estados de **carga**, **éxito** y **error**, con botón de **reintentar**.
- **Paginación** contra la propia API (`limit` y `skip`): 194 productos en 20 páginas.
- Navegación Inicio → Productos → Inicio (botones y `ion-back-button`).
- **Modo oscuro**: botón en la barra superior de las tres páginas; el tema se guarda
  en `localStorage`.
- **Dashboard de tarjetas** (reto): los productos se pueden ver en tarjetas con su
  precio, stock, dimensiones y stock valorado, además de la tabla clásica.
- Resumen arriba de la página: productos mostrados, **valor del stock** y **valoración media**.

## Estructura

```
src/app/
├── models/product.model.ts       # Product, ProductsResponse y valorStock()
├── services/product.service.ts   # getProducts(limit, skip) con inject(HttpClient)
├── services/theme.service.ts     # modo claro/oscuro con signal + localStorage
├── components/producto-card/     # tarjeta de producto (dashboard)
├── components/theme-toggle/      # botón de modo oscuro
├── pages/inicio/inicio.page.ts
├── pages/productos/productos.page.ts
├── pages/about/about.page.ts
├── app.component.ts
├── app.routes.ts                 # carga perezosa con loadComponent
└── app.config.ts                 # provideHttpClient(), provideRouter(), Ionic
```

## Standalone

- No existe `app.module.ts`.
- Cada componente declara sus propios `imports`.
- `HttpClient` se proporciona con `provideHttpClient()` en `app.config.ts`.
- Se usa `inject(HttpClient)` en lugar del constructor.
- Angular 22 arranca **sin zone.js**, por lo que el estado de las páginas se
  gestiona con `signal()` para que la vista se actualice al llegar la respuesta.

## Ejecutar

```bash
npm install
npm start        # http://localhost:8100
npm run build    # genera www/
npm run lint
npm test
```

## Ramas y despliegue

- `desarrollo`: rama de trabajo.
- `main`: rama validada y de producción (la que despliega Vercel).

```bash
git checkout desarrollo
git merge main          # o al revés, según el flujo
git checkout main
git merge desarrollo
git push origin main
```

Producción: <https://dam2-productos-eight.vercel.app/productos>
