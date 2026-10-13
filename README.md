# test-manager-library-3145556-app

> **Prueba técnica · Ficha ADSO 3145556**
> Entrega: **martes 13 de octubre de 2026, a las 5:00 p. m.** (17:00, hora Colombia).

Frontend de *Manager Library* en **React** (con Vite, origen `http://localhost:5173`, D-15 de `spec-laravel/plan.md`).
El spec está en [`test-manager-library-3145556-docs`](https://github.com/BrayanCABRERA123/test-manager-library-3145556-docs)
(versión del reto: `spec-laravel/`).

## Dependencias

Consume la API en `/api/v1` con `Authorization: Bearer <token>`. El reporte de más prestados solo se muestra al rol `admin` (CA-10.5).

## Estado

| Tarea | Estado |
|---|---|
| T-22 (login, catálogo, socios, prestar, devolver, vencidos, reporte) | ⏳ **Pendiente**: no se inició por tiempo. Se priorizó el núcleo de la API (T-01, T-02, T-17) con evidencia, como indica `tasks.md` |

## Convenciones

- Código, rutas, ramas y mensajes de commit/PR: **inglés** (Conventional Commits).
- Documentación y mensajes al usuario: **español** (constitución, artículo XI).
- Flujo de ramas: `feature/*` → `develop` → `main`, siempre mediante Pull Request.
