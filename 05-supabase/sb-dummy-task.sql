-- Insertar 40 tareas de ejemplo
INSERT INTO tasks (title, description, status, priority, user_id) VALUES
-- Tareas pendientes (todo)
('Planificar reunión semanal', 'Preparar agenda y objetivos para la reunión del equipo', 'todo', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Actualizar documentación', 'Revisar y actualizar la documentación del proyecto', 'todo', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Investigar nuevas tecnologías', 'Buscar herramientas para mejorar el workflow', 'todo', 'low', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Revisar pull requests', 'Evaluar los PRs pendientes en GitHub', 'todo', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Crear presentación', 'Diseñar slides para la presentación del cliente', 'todo', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Organizar archivos', 'Clasificar y organizar documentos del proyecto', 'todo', 'low', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Configurar entorno', 'Preparar entorno de desarrollo para nuevo feature', 'todo', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Revisar bugs', 'Identificar bugs reportados en producción', 'todo', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Escribir tests', 'Crear tests unitarios para módulo nuevo', 'todo', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Planificar sprint', 'Definir tareas y objetivos para el próximo sprint', 'todo', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),

-- Tareas en progreso (in-progress)
('Desarrollar feature de autenticación', 'Implementar sistema de login con JWT', 'in-progress', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Diseñar interfaz dashboard', 'Crear wireframes y mockups del panel', 'in-progress', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Optimizar consultas SQL', 'Mejorar rendimiento de consultas a la base de datos', 'in-progress', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Integrar API de terceros', 'Conectar con servicio de pagos externo', 'in-progress', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Refactorizar código legacy', 'Mejorar estructura de módulo antiguo', 'in-progress', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Crear sistema de notificaciones', 'Implementar envío de emails y push notifications', 'in-progress', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Configurar CI/CD', 'Automatizar despliegues con GitHub Actions', 'in-progress', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Desarrollar módulo de reportes', 'Crear generador de reportes en PDF', 'in-progress', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Implementar buscador', 'Crear sistema de búsqueda con filtros', 'in-progress', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Crear API endpoints', 'Desarrollar endpoints REST para nuevo módulo', 'in-progress', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),

-- Tareas en revisión (review)
('Revisar implementación de cache', 'Evaluar sistema de cache implementado', 'review', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Verificar seguridad endpoints', 'Auditar vulnerabilidades en API', 'review', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Testear responsive design', 'Comprobar adaptabilidad en diferentes dispositivos', 'review', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Revisar documentación técnica', 'Validar precisión de documentación escrita', 'review', 'low', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Auditar accesibilidad', 'Verificar cumplimiento de estándares WCAG', 'review', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Evaluar performance', 'Analizar métricas de rendimiento', 'review', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Revisar código de feature', 'Code review de implementación reciente', 'review', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Validar integración continua', 'Verificar que CI/CD funciona correctamente', 'review', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Comprobar backups', 'Verificar sistema de backup y recuperación', 'review', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Revisar UX/UI', 'Evaluar experiencia de usuario final', 'review', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),

-- Tareas completadas (done)
('Actualizar dependencias', 'Actualizar librerías a sus últimas versiones', 'done', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Configurar base de datos', 'Instalar y configurar PostgreSQL', 'done', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Crear logo', 'Diseñar identidad visual para el proyecto', 'done', 'low', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Configurar dominio', 'Registrar y configurar dominio del sitio', 'done', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Implementar analytics', 'Integrar Google Analytics al sitio web', 'done', 'low', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Configurar SSL', 'Instalar certificado SSL para HTTPS', 'done', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Crear página de contacto', 'Desarrollar formulario de contacto funcional', 'done', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Configurar monitorización', 'Implementar sistema de alertas y logs', 'done', 'high', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Optimizar imágenes', 'Comprimir y optimizar recursos gráficos', 'done', 'low', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c'),
('Configurar correos', 'Establecer servicio de envío de emails', 'done', 'medium', '4dcc17e5-d2f0-40d5-aea2-9db57122a73c');