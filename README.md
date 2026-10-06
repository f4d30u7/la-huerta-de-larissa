# La Huerta de Larissa - Prototipo v0.1 - Test Deploy

Prototipo front-end responsive de una tienda online de alimentos saludables para Argentina, pensado mobile-first.

## Incluye
- Home responsive
- Identidad visual eco-premium y alegre
- Logo/isotipo simple embebido en SVG
- Categorías
- 12 productos demo
- Filtros de producto
- Oferta semanal
- Carrito funcional en memoria
- Checkout simulado
- Bloque de propósito de marca
- Contacto y footer

## Cómo probarlo
Abrí `index.html` directamente en el navegador.

Para una prueba más fiel, desde esta carpeta podés iniciar un servidor local:

```bash
python -m http.server 8000
```

Luego visitá `http://localhost:8000`.

## Publicarlo en GitHub Pages
1. Crear un repositorio nuevo, por ejemplo `la-huerta-de-larissa`.
2. Subir `index.html`, `styles.css` y `app.js` a la raíz.
3. En GitHub: Settings > Pages.
4. En "Build and deployment", elegir "Deploy from a branch".
5. Seleccionar la rama `main` y carpeta `/root`.
6. Guardar. GitHub mostrará la URL pública cuando termine el deploy.

## Próximos pasos sugeridos
- Reemplazar textos, datos de contacto y precios demo por información real.
- Incorporar fotografías reales de productos.
- Definir identidad final y logo definitivo.
- Agregar páginas/fichas individuales de producto.
- Persistir carrito y catálogo.
- Integrar Mercado Pago.
- Definir envíos/retiro y reglas comerciales.
- Incorporar administración de stock/productos.
- Completar información legal y políticas del sitio.
