# test-manager-library-3145556-app

> **Prueba técnica · Ficha ADSO 3145556**
> Entrega: **martes 13 de octubre de 2026, a las 5:00 p. m.** (17:00, hora Colombia).

Frontend de *Manager Library* en **React 18**, conectado a la API en `/api/v1` con `Authorization: Bearer <token>`.
El spec está en [`test-manager-library-3145556-docs`](https://github.com/BrayanCABRERA123/test-manager-library-3145556-docs)
(versión del reto: `spec-laravel/`).

## Pantallas (cubren lo que la API ya implementa)

| Pantalla | Rol | Endpoint |
|---|---|---|
| Iniciar sesión (muestra el error sin decir si falló el usuario o la clave) | público | `POST /auth/login` |
| Categorías | autenticado | `GET /categories` |
| Socios: crear, buscar y listar | admin, librarian | `GET /members`, `POST /members` |
| Dar de alta bibliotecario (solo se muestra al admin, CA-10.5 / HU-02) | admin | `POST /users` |

Los errores se muestran con el `message` y los `details` del cuerpo de error único del contrato.

## Cómo se ejecuta

1. Levantar la API con `docker compose up -d --build` desde el repositorio `infra`.
2. Servir esta carpeta en el puerto **5173** (el origen que espera `CORS_ORIGIN`), por ejemplo:

   ```bash
   npx serve -l 5173 .
   ```

3. Abrir `http://localhost:5173` e iniciar sesión con `ADMIN_USERNAME` / `ADMIN_PASSWORD`.

La URL de la API se cambia en `config.js`.

## Estado

| Tarea | Estado |
|---|---|
| T-22 login, catálogo, socios, prestar, devolver, vencidos, reporte | ✅ parcial: login, categorías, socios y alta de bibliotecarios. ⏳ Catálogo, préstamos, devoluciones, vencidos y reporte quedan pendientes porque la API aún no los expone |

**Decisión técnica:** por tiempo, React se carga desde CDN con Babel en el navegador, sin paso de compilación. D-15 de
`spec-laravel/plan.md` define Vite; migrar a Vite queda pendiente y no cambia las pantallas.

## Convenciones

- Código, rutas, ramas y mensajes de commit/PR: **inglés** (Conventional Commits).
- Documentación y mensajes al usuario: **español** (constitución, artículo XI).
- Flujo de ramas: `feature/*` → `develop` → `main`.
