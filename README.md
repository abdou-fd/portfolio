# Faradjou Abdelfetah - Professional Portfolio

A modern, professional portfolio website built with React, Vite, Tailwind CSS, and Supabase.

## Features

### Public Portfolio
- **Hero Section** - Engaging first impression
- **About** - Professional background
- **Journey/Timeline** - Career progression
- **Experience** - Work history
- **Video Portfolio** - Visual demonstrations
- **Projects** - Showcased work
- **Skills** - Technical expertise
- **Certificates** - Credentials
- **Career Goal** - Professional objectives
- **Contact** - Get in touch
- **Responsive Design** - Mobile, tablet, desktop
- **Dark Mode** - Eye-friendly viewing
- **Smooth Navigation** - Enhanced UX

### Admin Dashboard (Protected)
- **Authentication** - Secure login with Supabase
- **Role-based Access** - Admin authorization
- **CRUD Operations** for:
  - Experiences
  - Projects
  - Videos
  - Certificates
  - Skills
  - Timeline events
  - Site settings
- **Image Upload** - Supabase Storage integration
- **Publish/Unpublish** - Content control
- **Display Order** - Custom sorting

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with dark mode
- **Routing**: React Router v6
- **Backend**: Supabase (Auth, Database, Storage)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Design**: Industrial, professional, technical aesthetic

## Project Structure

```
portfolio/
├── src/
│   ├── components/       # Reusable UI components
│   ├── sections/         # Portfolio page sections
│   ├── pages/            # Full pages (Portfolio, Login)
│   ├── admin/            # Admin dashboard pages
│   ├── data/             # Static portfolio data
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Library configurations
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── SETUP.sql             # Supabase database setup
├── .env.example          # Environment variables
├── package.json          # Dependencies
└── README.md             # This file
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account (for admin features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abdou-fd/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Add your Supabase credentials to `.env.local`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start development server:
```bash
npm run dev
```

The portfolio will open at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

The optimized build will be in the `dist/` directory.

## Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Copy your project URL and Anon Key
3. In the SQL Editor, run all contents of `SETUP.sql`
4. Create a storage bucket named `portfolio-images`
5. Set up storage policies (see SETUP.sql for RLS policies)
6. Create an admin user in the `admin_users` table
7. Add credentials to `.env.local`

## Database Schema

- `admin_users` - Admin user authorization
- `site_settings` - Global site configuration
- `experiences` - Work experience entries
- `projects` - Portfolio projects
- `videos` - Video portfolio entries
- `certificates` - Certificates and credentials
- `skills` - Technical skills
- `timeline` - Career timeline events

## Routes

### Public
- `/` - Portfolio homepage

### Authentication
- `/login` - Admin login

### Protected Admin Dashboard
- `/admin` - Admin redirect
- `/admin/dashboard` - Main dashboard
- `/admin/experiences` - Manage experiences
- `/admin/experiences/new` - Create experience
- `/admin/experiences/:id` - Edit experience
- `/admin/projects` - Manage projects
- `/admin/projects/new` - Create project
- `/admin/projects/:id` - Edit project
- `/admin/videos` - Manage videos
- `/admin/videos/new` - Create video
- `/admin/videos/:id` - Edit video
- `/admin/certificates` - Manage certificates
- `/admin/certificates/new` - Create certificate
- `/admin/certificates/:id` - Edit certificate
- `/admin/skills` - Manage skills
- `/admin/skills/new` - Create skill
- `/admin/skills/:id` - Edit skill
- `/admin/timeline` - Manage timeline
- `/admin/timeline/new` - Create timeline entry
- `/admin/timeline/:id` - Edit timeline entry
- `/admin/settings` - Site settings

## Public Portfolio

### Static Data
The public portfolio uses static data from `src/data/portfolioData.js` and **does NOT require Supabase** to function. This ensures the portfolio works even without:
- Supabase credentials
- Database connection
- Authentication setup

### Portfolio Content
All portfolio content (about, experience, projects, skills, etc.) is defined in `src/data/portfolioData.js` and can be easily edited without backend changes.

## Admin Features

### Authentication
- Secure login with Supabase Auth
- Session persistence
- Auto-logout on token expiry

### Authorization
- Role-based access control
- Only users in `admin_users` table can access dashboard
- Protected routes with automatic redirect

### Content Management
- Create, read, update, delete operations for all content types
- Image upload to Supabase Storage
- Publish/unpublish toggle
- Display order management
- Real-time updates

## Security

- Admin routes protected with authentication
- Row-level security (RLS) policies on all tables
- Image uploads restricted to authenticated admins
- Admin authorization verified via `admin_users` table
- Environment variables for sensitive data

## Environment Variables

```
VITE_SUPABASE_URL          # Your Supabase project URL
VITE_SUPABASE_ANON_KEY     # Your Supabase anonymous key
```

## Deployment

### Vercel
```bash
vercel
```

Add environment variables in Vercel project settings.

### GitHub Pages
Configure with GitHub Actions to build and deploy from the `main` branch.

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Contributing

Feel free to customize this portfolio for your own use.

## License

MIT
