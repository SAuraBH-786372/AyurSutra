# AyurSutra - Ayurveda & Panchakarma Booking Platform

A comprehensive full-stack web application for booking Ayurveda and Panchakarma treatments, exploring wellness content, and getting AI-powered health consultations.

## Features

### 🔐 User Authentication
- Secure signup/login system
- JWT-based authentication
- Automatic wallet initialization with ₹1000 signup bonus
- Password hashing with bcrypt

### 🏥 Slot Booking System
- Browse available slots from certified practitioners
- Real-time slot availability
- Secure booking with wallet integration
- Booking management (view, cancel with instant refunds)

### 📚 Content Library
- **Mantras**: Sacred mantras filtered by dosha type
- **Recipes**: Ayurvedic recipes with ingredients and instructions
- **Diet Plans**: Personalized meal plans based on constitution
- Dosha-specific filtering for all content

### 🤖 AI Chatbot
- Powered by Google Gemini API
- Personalized advice based on user's dosha
- Expert knowledge on Ayurveda, Panchakarma, diet, and wellness

### 💰 Digital Wallet
- Seamless payment system
- ₹1000 signup bonus
- Instant refunds for cancelled bookings
- Real-time balance updates

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Robust relational database

## Deployment

### Prerequisites
- [Render](https://render.com/) account
- [GitHub](https://github.com/) account with the project repository
- Google Gemini API key (for AI chatbot functionality)

### Deploying to Render

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ayursutra.git
   cd ayursutra
   ```

2. **Deploy Backend**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" and select "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - Name: `ayursutra-backend`
     - Region: Choose the one closest to your users
     - Branch: `main`
     - Build Command: `chmod +x build.sh && ./build.sh`
     - Start Command: `gunicorn main:app --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000`
   - Add environment variables:
     - `PYTHON_VERSION`: `3.11.5`
     - `DATABASE_URL`: (Will be provided after creating the database)
     - `JWT_SECRET_KEY`: Generate a secure random string
     - `JWT_ALGORITHM`: `HS256`
     - `ACCESS_TOKEN_EXPIRE_MINUTES`: `30`
     - `SIGNUP_BONUS`: `1000`
     - `GEMINI_API_KEY`: Your Google Gemini API key
   - Click "Create Web Service"

3. **Create Database**
   - In Render Dashboard, click "New" and select "PostgreSQL"
   - Name: `ayursutra-db`
   - Database: `ayursutra`
   - User: `ayursutra_user`
   - Region: Same as backend service
   - Click "Create Database"
   - After creation, go to the database details and copy the "Internal Database URL"
   - Update the `DATABASE_URL` in your backend service with this URL

4. **Deploy Frontend**
   - In Render Dashboard, click "New" and select "Static Site"
   - Connect your GitHub repository
   - Configure the site:
     - Name: `ayursutra-frontend`
     - Branch: `main`
     - Build Command: `cd frontend && npm install && npm run build`
     - Publish Directory: `frontend/.next`
   - Add environment variable:
     - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend service (e.g., `https://ayursutra-backend.onrender.com`)
   - Click "Create Static Site"

5. **Configure CORS**
   - In your backend service on Render, go to "Environment"
   - Add a new environment variable:
     - Key: `CORS_ORIGINS`
     - Value: The URL of your frontend (e.g., `https://ayursutra-frontend.onrender.com`)
   - Redeploy the backend service

6. **Access Your Application**
   - Once both services are deployed, you can access your application at the frontend URL
   - The backend API will be available at the backend URL

## Environment Variables

### Backend (`.env`)
```
# Database Configuration
DATABASE_URL=postgresql://user:password@host:port/database

# JWT Configuration
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Wallet Configuration
SIGNUP_BONUS=1000

# Gemini API Configuration
GEMINI_API_KEY=your-gemini-api-key

# CORS Configuration
CORS_ORIGINS=https://your-frontend-url.com
```

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```
- **SQLAlchemy** - Python SQL toolkit and ORM
- **JWT** - Secure authentication
- **Google Gemini API** - AI chatbot functionality

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **js-cookie** - Cookie management

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL database
- Google Gemini API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Update the `.env` file with your database credentials and API keys:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/ayursutra
JWT_SECRET_KEY=your-super-secret-jwt-key
GEMINI_API_KEY=your-gemini-api-key-here
```

5. Run the backend server:
```bash
python main.py
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Database Setup

The application automatically:
- Creates all necessary tables on startup
- Seeds initial data (hospitals, slots, mantras, recipes, diet plans)
- Handles database migrations

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user info

### Bookings
- `GET /slots` - Get available slots
- `POST /bookings` - Create booking
- `GET /bookings` - Get user bookings
- `PUT /bookings/{id}/cancel` - Cancel booking

### Content
- `GET /mantras` - Get mantras (optional dosha filter)
- `GET /recipes` - Get recipes (optional dosha filter)
- `GET /diet-plans` - Get diet plans (optional dosha filter)

### AI Chat
- `POST /chat` - Send message to AI consultant

### Wallet
- `GET /wallet` - Get wallet balance

## Project Structure

```
AyurSutra/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database models and connection
│   ├── auth.py              # Authentication utilities
│   ├── schemas.py           # Pydantic schemas
│   ├── seed_data.py         # Database seeding
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── app/
│   │   ├── components/      # Reusable React components
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── (pages)/         # Next.js app router pages
│   │   ├── globals.css      # Global styles
│   │   └── layout.tsx       # Root layout
│   ├── package.json         # Node.js dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   └── tsconfig.json        # TypeScript configuration
└── .env                     # Environment variables
```

## Key Features Implementation

### Dosha-Based Filtering
All content (mantras, recipes, diet plans) can be filtered by Ayurvedic dosha types:
- **Vata** (Air & Space)
- **Pitta** (Fire & Water)  
- **Kapha** (Earth & Water)
- **All** (Universal content)

### Wallet System
- Users receive ₹1000 bonus on signup
- Seamless booking payments
- Instant refunds for cancellations
- Real-time balance updates

### AI Integration
- Context-aware responses based on user's dosha
- Expert knowledge on Ayurveda and Panchakarma
- Natural conversation interface

## Security Features
- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Secure API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.
