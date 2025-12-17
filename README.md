# Portfolio Website - Venkatesh Gondu

A modern, full-stack portfolio website with contact form tracking and admin dashboard.

## 🚀 Tech Stack

**Frontend:**
- Next.js 14 (React 18)
- TypeScript
- CSS Modules
- Framer Motion (animations)
- React Icons

**Backend:**
- Python Flask
- PyMongo (MongoDB)
- JWT Authentication
- bcrypt (password hashing)

**Database:**
- MongoDB

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **MongoDB** - Either:
  - Local installation - [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (free cloud) - [Sign up](https://www.mongodb.com/cloud/atlas/register)

## 🛠️ Installation & Setup

### 1. Clone or Navigate to Project

```bash
cd "d:\comuputer language material\NewDownLoads\Interview"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create environment file
copy .env.example .env

# Edit .env file with your MongoDB connection string
# For local MongoDB: MONGODB_URI=mongodb://localhost:27017/
# For MongoDB Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create environment file
copy .env.local.example .env.local

# The default API URL is already set to http://localhost:5000
```

### 4. Create Admin User

Before running the application, you need to create an admin user in MongoDB:

```bash
# Navigate to backend directory
cd ../backend

# Run Python shell
python
```

Then in the Python shell:

```python
from database.models.admin import Admin
from database.connection import get_db

# Create admin user
Admin.create(
    email="admin@example.com",
    password="your-secure-password",
    name="Your Name"
)

print("Admin user created successfully!")
exit()
```

## 🚀 Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

### Option 2: Using PowerShell Script (Windows)

```powershell
# From the project root directory
.\start.ps1
```

## 📱 Using the Application

### Portfolio Website
1. Open browser and navigate to `http://localhost:3000`
2. Explore all sections: Hero, About, Skills, Projects, Education, Contact
3. Fill out the contact form to test submission

### Admin Dashboard
1. Navigate to `http://localhost:3000/admin/login`
2. Login with the admin credentials you created
3. View all contact form submissions
4. Delete submissions as needed

## 🔧 Configuration

### Backend Environment Variables (.env)

```env
MONGODB_URI=mongodb://localhost:27017/
DATABASE_NAME=portfolio_db
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
FLASK_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📊 MongoDB Collections

The application creates three collections:

1. **contacts** - Stores contact form submissions
2. **admins** - Stores admin user credentials
3. **visitors** - Tracks page visits

## 🎨 Features

✅ Modern, responsive design with dark theme  
✅ Smooth animations and transitions  
✅ Interactive contact form with real-time validation  
✅ MongoDB integration for data persistence  
✅ Admin authentication with JWT  
✅ Admin dashboard to track contact submissions  
✅ Visitor tracking and analytics  
✅ Mobile-responsive navigation  
✅ SEO optimized  

## 🐛 Troubleshooting

### MongoDB Connection Issues
- **Local MongoDB:** Make sure MongoDB service is running
- **MongoDB Atlas:** Check your connection string and IP whitelist

### Port Already in Use
- Backend: Change `PORT` in backend `.env` file
- Frontend: Run `npm run dev -- -p 3001` to use different port

### Module Not Found Errors
- Backend: Run `pip install -r requirements.txt` again
- Frontend: Delete `node_modules` and run `npm install` again

## 📝 API Endpoints

### Public Endpoints
- `POST /api/contact` - Submit contact form
- `POST /api/visitor/track` - Track visitor
- `GET /api/visitor/stats` - Get visitor statistics

### Protected Endpoints (Require JWT)
- `GET /api/admin/contacts` - Get all contacts
- `DELETE /api/admin/contacts/:id` - Delete contact
- `PATCH /api/admin/contacts/:id/read` - Mark as read

### Authentication
- `POST /api/admin/login` - Admin login

## 👤 Author

**Venkatesh Gondu**
- Email: venkatalagondu@gmail.com
- GitHub: [@venky-gondu](https://github.com/venky-gondu)
- LinkedIn: [venkatesh-gondu](https://linkedin.com/in/venkatesh-gondu)

## 📄 License

This project is for portfolio purposes.

---

**Note:** Remember to change the JWT secret key and admin password in production!
