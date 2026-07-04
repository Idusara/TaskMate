# 🛠️ TaskMate - On-Demand Service Marketplace

TaskMate is a modern, responsive, and fully functional on-demand service marketplace. It connects users with local professionals (Taskers) for various everyday tasks such as home repairs, cleaning, moving, furniture assembly, and more. 

## ✨ Key Features

- **👤 User Authentication:** Secure login and registration for both customers and Taskers.
- **🔍 Browse Services:** Filter Taskers by categories (Cleaning, Repairs, Assembly, etc.).
- **📅 Booking Wizard:** A step-by-step interactive booking system to estimate costs, select dates, and schedule appointments.
- **🛡️ Admin Dashboard:** A dedicated, secure admin panel to manage registered users, taskers, and platform statistics.
- **📱 Responsive Design:** Fully optimized for mobile, tablet, and desktop screens with a beautiful UI.
- **🎨 Modern UI/UX:** Clean aesthetics with interactive components, smooth animations, and intuitive navigation.

## 💻 Tech Stack

**Frontend:**
- **React (Vite)** - Fast, modern frontend framework.
- **Vanilla CSS** - Custom styling with modern CSS variables and UI tokens.
- **Lucide React** - Beautiful SVG icons.

**Backend:**
- **Node.js & Express.js** - Robust backend server.
- **MongoDB & Mongoose** - NoSQL database for flexible data modeling.
- **JSON Web Tokens (JWT)** - Secure, stateless authentication.
- **bcryptjs** - Password hashing for user security.

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/Idusara/TaskMate.git
cd TaskMate
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory and add your environment variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Run the seed scripts to populate initial data (Optional but recommended to get a feel of the app):
```bash
# Seed the initial Taskers
node seedTaskers.js

# Seed the Admin user (Username: admin@taskmate.com, Password: admin)
node seedAdmin.js
```

Start the backend server:
```bash
npm start
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal tab, navigate to the frontend directory, and install dependencies:
```bash
cd Frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📖 How It Works

1. **Exploring:** Visitors land on the homepage and can view featured Taskers or browse by specific categories (e.g., Mounting, Cleaning).
2. **Booking:** Once a user selects a Tasker, the Booking Wizard opens. The user inputs their task details, address, estimated hours, and preferred date/time. The wizard dynamically calculates the total cost (including hourly rates and trust fees).
3. **Authentication:** Users must sign in or create an account to finalize bookings. 
4. **Admin Management:** Admins can log into the specialized Admin Dashboard using admin credentials to view the total user count, tasker count, and platform metrics.

---

## 📂 Project Structure

```text
TaskMate/
├── Backend/
│   ├── config/         # Database connection configuration
│   ├── controllers/    # API logic and handlers
│   ├── middleware/     # Custom middlewares (Auth, Admin verification)
│   ├── models/         # Mongoose schemas (User, Tasker, Booking)
│   ├── routes/         # Express API routes
│   └── server.js       # Main backend entry point
│
└── Frontend/
    ├── public/         # Static assets
    ├── src/
    │   ├── assets/     # Images and icons
    │   ├── components/ # Reusable UI components (Navbar, BookingWizard, etc.)
    │   ├── pages/      # Main views (AuthPage, AdminDashboard)
    │   ├── App.jsx     # Main application layout and routing
    │   └── main.jsx    # React DOM rendering
    └── vite.config.js  # Vite configuration
```

---
*Built with ❤️ for On-Demand Service Excellence*
