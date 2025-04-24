# ClubConnect

ClubConnect is a comprehensive web application designed to empower college communities by streamlining club management and event organization. The platform connects students and clubs, making it easy to manage memberships, organize events, and foster collaboration within the campus.

## 🚀 Project Overview

ClubConnect combines a modern React frontend with a robust Express/MongoDB backend. It enables students to discover, join, and interact with various clubs, while club admins can efficiently manage memberships, post events, and communicate with members.

## ✨ Key Features

- **User Authentication:** Secure registration and login for students and club admins.
- **Club Management:** Create, manage, and join clubs.
- **Event Creation & Registration:** Organize, post, and register for college events.
- **Follow System:** Students can follow clubs to receive updates and posts.
- **Admin Dashboard:** Club admins can manage posts, events, and followers.
- **Modern UI:** Responsive and visually appealing interface with Tailwind CSS.
- **Open Source:** Built for collaborative development and transparency.

## 🛠️ Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, Vite, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **File Handling:** Multer, Cloudinary
- **Email:** Nodemailer
- **Other:** Axios, ESLint, Framer Motion

## 📁 Folder Structure

```
project/
  └── pbl/
      ├── Backend/         # Express backend (API, models, controllers)
      ├── src/             # React frontend source code
      ├── public/          # Static assets
      ├── package.json     # Frontend dependencies & scripts
      ├── README.md
      └── ...
```

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ClubConnect.git
cd ClubConnect/project/pbl
```

### 2. Setup Backend

```bash
cd Backend
npm install
# Set up your .env file (see .env.example if available)
npm start
```

### 3. Setup Frontend

In a new terminal:

```bash
cd ../
npm install
npm run dev
```

### 4. Environment Variables

Create a `.env` file in `Backend/` with the following (example):

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

## 🖥️ Usage

- Visit `http://localhost:5173` (or the port shown) for the frontend.
- Backend runs on `http://localhost:5000` by default.
- Register as a student or club admin.
- Explore clubs, follow them, create events, and register for events.

## 📦 Main Scripts

- **Frontend**
  - `npm run dev` – Start React app (Vite)
  - `npm run build` – Build for production
  - `npm run lint` – Lint code

- **Backend**
  - `npm start` – Start Express server (with nodemon for development)

## 🤝 Contribution

Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 👥 Team

- Kaustubh – FullStack Developer
- Vivek – FullStack Developer
- Siddhi – UI/UX Developer
- Disha – UI/UX Developer

## 📄 License

This project is licensed under the MIT License.
