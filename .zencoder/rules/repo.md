# SwasthyaSetu Repository Rules

## Project Structure
- **Backend**: FastAPI with Python 3.8+
- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT-based
- **AI Integration**: Google Gemini API

## Development Workflow
- Backend runs on http://localhost:8000
- Frontend runs on http://localhost:3000
- Environment variables defined in .env file (not for production use)

## Testing Framework
targetFramework: Playwright

## UI/UX Standards
- Consistent use of Ayurveda color palette (green-based theme)
- Glass morphism effects for cards and modals
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Toast notifications for user feedback
- Loading states with spinners

## Component Architecture
- Reusable UI components in `/components/ui/`
- Page wrappers for consistent layout
- Context-based state management
- TypeScript for type safety

## Performance Requirements
- Fast page transitions
- Optimized bundle size
- Smooth scrolling and animations
- Efficient API calls with proper error handling

## Features
- User authentication (signup/login)
- Slot booking system with wallet integration
- AI chatbot consultation
- Dosha-based content filtering (mantras, recipes, diet plans)
- Booking management
- Digital wallet system