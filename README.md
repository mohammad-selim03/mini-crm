# Tech CRM

A modern Customer Relationship Management (CRM) system built with React, TypeScript, and Node.js. Manage clients, projects, and interactions efficiently with a clean, responsive interface.

## 🚀 Features

- **Dark/Light Theme** - Customizable UI theme with system preference support
- **Client Management** - Track and manage client information
- **Project Tracking** - Monitor project progress and status
- **Interaction Logging** - Record all client communications
- **Dashboard Analytics** - Visual insights into business metrics
- **Responsive Design** - Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- React Hook Form
- Zod Validation
- Axios
- React Query

### Backend
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- REST API

## 📦 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/mohammad-selim03/mini-crm
cd tech-crm
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

3. **Backend Setup**
```bash
cd backend
npm install
```

4. **Environment Variables**
Create `.env` files in both frontend and backend directories:

Frontend `.env`:
```env
VITE_API_URL=http://localhost:3000
```

Backend `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/techcrm"
JWT_SECRET="your-secret-key"
PORT=3000
```

5. **Database Setup**
```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

## 🗄️ Database Schema (ERD)

![ERD Diagram](./docs/erd.png)

### Key Entities:

#### Users
- id (UUID)
- email
- password (hashed)
- name
- role
- created_at
- updated_at

#### Clients
- id (UUID)
- name
- email
- phone
- company
- notes
- created_at
- updated_at

#### Projects
- id (UUID)
- title
- description
- status (enum)
- client_id (FK)
- start_date
- end_date
- created_at
- updated_at

#### Interactions
- id (UUID)
- type (enum)
- notes
- client_id (FK)
- project_id (FK)
- date
- created_at
- updated_at

#### Reminders
- id (UUID)
- title
- notes
- due_date
- client_id (FK)
- project_id (FK)
- created_at
- updated_at

## 🔄 API Documentation

### Authentication
```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
```

### Clients
```http
GET /api/clients
POST /api/clients
GET /api/clients/:id
PUT /api/clients/:id
DELETE /api/clients/:id
```

### Projects
```http
GET /api/projects
POST /api/projects
GET /api/projects/:id
PUT /api/projects/:id
DELETE /api/projects/:id
```

### Interactions
```http
GET /api/interactions
POST /api/interactions
GET /api/interactions/:id
PUT /api/interactions/:id
DELETE /api/interactions/:id
```

### Reminders
```http
GET /api/reminders
POST /api/reminders
GET /api/reminders/:id
PUT /api/reminders/:id
DELETE /api/reminders/:id
```

## 🤔 Design Decisions

1. **TypeScript**
   - Enhanced type safety
   - Better developer experience
   - Improved maintainability

2. **Tailwind CSS**
   - Rapid UI development
   - Consistent styling
   - Built-in dark mode support
   - Responsive design utilities

3. **React Query**
   - Efficient data fetching
   - Automatic caching
   - Real-time updates
   - Optimistic updates

4. **Prisma ORM**
   - Type-safe database queries
   - Easy migrations
   - Great developer experience
   - Automatic CRUD operations

5. **JWT Authentication**
   - Stateless authentication
   - Scalable
   - Secure token-based system

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Input validation
- XSS protection
- CSRF protection

## 🚀 Deployment

The application can be deployed using:
- Frontend: Vercel/Netlify
- Backend: Heroku/DigitalOcean
- Database: Supabase/AWS RDS

## 📈 Future Improvements

- [ ] Email notifications
- [ ] Calendar integration
- [ ] File attachments
- [ ] Advanced reporting
- [ ] Activity timeline
- [ ] Bulk operations
- [ ] Export functionality

## 📄 License

MIT License - see LICENSE.md

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
