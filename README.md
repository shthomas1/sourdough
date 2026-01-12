# Sourdough

An open-source TypeScript React starter template for landing pages with database integration. This starter provides a clean, modern foundation with a warm sourdough bread theme that you can customize for any project.

## Features

- ⚛️ **React 18** with **TypeScript** for type safety
- 🚀 **Express.js server** for backend API and serving the React app
- 🎨 **Sourdough-themed UI** with warm, earthy colors
- 🧭 **React Router** for navigation (Home, About, Contact pages)
- 🗄️ **Database utilities** with CRUD function templates ready for configuration
- 🔌 **RESTful API** endpoints for all CRUD operations
- ⚡ **Vite** for fast development and building
- 📱 **Responsive design** that works on all devices
- 🎯 **Clean architecture** - easy to customize and extend

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development servers (both frontend and backend):

```bash
npm run dev
```

This will start:
- **Frontend dev server** on `http://localhost:5173` (Vite)
- **Backend API server** on `http://localhost:3001` (Express)

4. Open your browser to `http://localhost:5173`

The frontend will automatically proxy API requests to the backend server.

## Project Structure

```
sourdough/
├── server/
│   ├── routes/          # API route handlers
│   │   └── api.ts       # CRUD API endpoints
│   ├── utils/           # Server utilities
│   │   └── database.ts  # Database connection and CRUD functions
│   └── index.ts         # Express server entry point
├── src/
│   ├── components/      # Reusable components (Navigation, etc.)
│   ├── pages/          # Page components (Home, About, Contact)
│   ├── utils/          # Client utilities
│   │   └── api.ts      # Client-side API request functions
│   ├── App.tsx         # Main app component with routing
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles and theme variables
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration (client)
├── tsconfig.server.json # TypeScript configuration (server)
└── vite.config.ts     # Vite configuration
```

## Customization

### Replacing Content

All page content is placeholder text meant to be replaced:
- **Home page** (`src/pages/Home.tsx`) - Replace with your landing page content
- **About page** (`src/pages/About.tsx`) - Add your project/organization information
- **Contact page** (`src/pages/Contact.tsx`) - Already connected to the API (uses `contacts` table)

### Configuring Database

1. Open `server/utils/database.ts`
2. Replace `DATABASE_CONNECTION_STRING` or set the `DATABASE_URL` environment variable with your actual connection string
3. Install the appropriate database driver:
   - PostgreSQL: `npm install pg @types/pg`
   - MySQL: `npm install mysql2`
   - MongoDB: `npm install mongodb`
4. Uncomment and customize the database connection logic for your chosen database
5. Update the CRUD functions (`createRecord`, `readRecords`, `updateRecord`, `deleteRecord`) to match your database schema

### API Endpoints

The server provides RESTful API endpoints for CRUD operations:

- `POST /api/:table` - Create a new record
- `GET /api/:table` - Read all records (supports query parameters for filtering)
- `GET /api/:table/:id` - Read a single record by ID
- `PUT /api/:table/:id` - Update a record
- `DELETE /api/:table/:id` - Delete a record

Replace `:table` with your table/collection name (e.g., `contacts`, `users`, etc.)

Example:
```bash
# Create a contact
curl -X POST http://localhost:3001/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","message":"Hello"}'
```

### Theming

The sourdough theme uses CSS variables defined in `src/index.css`. You can customize:
- Colors: Modify the `--sourdough-*` variables
- Spacing: Adjust `--spacing-*` variables
- Border radius: Change `--radius-*` variables
- Shadows: Update `--shadow-*` variables

## Available Scripts

- `npm run dev` - Start both frontend and backend development servers
- `npm run dev:client` - Start only the frontend dev server (Vite)
- `npm run dev:server` - Start only the backend dev server (Express)
- `npm run build` - Build both frontend and backend for production
- `npm start` - Start the production server (after building)
- `npm run preview` - Preview production build (Vite only)
- `npm run lint` - Run ESLint

## Building for Production

```bash
npm run build
```

This will:
1. Build the React frontend to `dist/`
2. Compile the TypeScript server to `dist/server/`

Then start the production server:

```bash
npm start
```

The server will:
- Serve the React app on the root route
- Handle API requests on `/api/*` routes
- Run on port 3001 (or the port specified in the `PORT` environment variable)

## Environment Variables

Create a `.env` file in the root directory to configure:

```env
PORT=3001
DATABASE_URL=your-database-connection-string-here
NODE_ENV=production
```

## License

This project is open-source and available for use in any project.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
