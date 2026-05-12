# Next.js Authentication with Prisma & NextAuth

Este es un proyecto de Next.js configurado con autenticación mediante NextAuth.js y Prisma ORM.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (Versión 18 o superior)
- [pnpm](https://pnpm.io/) (Recomendado)

## Pasos para la Instalación

Sigue estos pasos para configurar el proyecto localmente después de descargarlo:

### 1. Instalar Dependencias

Ejecuta el siguiente comando en la raíz del proyecto para instalar todas las librerías necesarias:

```bash
pnpm install
```

### 2. Configurar Variables de Entorno

Crea un archivo llamado `.env` en la raíz del proyecto y añade las siguientes variables (ajusta los valores según sea necesario):

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu_clave_secreta_aqui"
```

### 3. Configurar la Base de Datos (Prisma)

Este proyecto utiliza SQLite. Para generar el cliente de Prisma y preparar la base de datos, ejecuta:

```bash
# Generar el cliente de Prisma (necesario por la ruta personalizada en schema.prisma)
npx prisma generate

# Sincronizar el esquema con la base de datos local
npx prisma db push
```

### 4. Iniciar el Servidor de Desarrollo

Una vez configurado todo, puedes iniciar el proyecto con:

```bash
pnpm dev
```

El proyecto estará disponible en [http://localhost:3000](http://localhost:3000).

## Scripts Disponibles

- `pnpm dev`: Inicia el servidor en modo desarrollo.
- `pnpm build`: Crea la versión de producción de la aplicación.
- `pnpm start`: Inicia la aplicación en modo producción.
- `pnpm lint`: Ejecuta el linter para revisar el código.
