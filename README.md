# dam2-productos

Actividad guiada — **Ionic + Angular Standalone: consumo de API REST** (DAM2 – Desarrollo de Interfaces).

Aplicación Ionic con Angular Standalone que consume `https://dummyjson.com/products`,
muestra los productos en una tabla y navega entre dos vistas.

## Vistas

| Ruta | Descripción |
|---|---|
| `/inicio` | Pantalla inicial con botón para ir a productos |
| `/productos` | Tabla con ID, producto (con imagen), categoría, marca, precio, valoración y stock |

- `/` redirige a `/inicio`
- Cualquier ruta desconocida redirige a `/inicio`

## Estructura

```
src/app/
├── models/product.model.ts       # Product y ProductsResponse
├── services/product.service.ts   # getProducts() con inject(HttpClient)
├── pages/inicio/inicio.page.ts
├── pages/productos/productos.page.ts
├── app.component.ts
├── app.routes.ts                 # carga perezosa con loadComponent
└── app.config.ts                 # provideHttpClient(), provideRouter(), Ionic
```

## Standalone

- No existe `app.module.ts`.
- Cada componente declara sus propios `imports`.
- `HttpClient` se proporciona con `provideHttpClient()` en `app.config.ts`.
- Se usa `inject(HttpClient)` en lugar del constructor.

## Ejecutar

```bash
npm install
npm start        # http://localhost:8100
npm run build    # genera www/
```

## Producción

Desplegado en Vercel desde la rama `desarrollo`:
<https://dam2-productos-eight.vercel.app/productos>
