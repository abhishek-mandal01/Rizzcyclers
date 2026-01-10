# ♻️ RizzCycler - Digital Waste Management Platform

> **Transforming Waste Management Across India**  
> A comprehensive digital platform empowering citizens, NGOs, and organizations to build a cleaner, sustainable future.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Pages](#available-pages)
- [Key Functionalities](#key-functionalities)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**RizzCycler** is a full-stack digital waste management platform designed specifically for India's waste management challenges. The platform connects citizens, waste workers, Green Champions, and administrators to create an ecosystem that promotes proper waste segregation, recycling, and community-driven environmental action.

### Mission
Empower communities with tools and knowledge to reduce landfill waste by up to 80% through proper waste management, training, and dignified employment opportunities for waste workers.

---

## ✨ Features

### 🏠 **For Citizens**
- **📸 Report Waste** - Submit geo-tagged reports of unmanaged waste with photos
- **🗺️ Live Waste Map** - Interactive map showing all reported waste locations in Odisha
- **📚 Training Modules** - Learn the 3-bin system, home composting, and the 3 R's
- **🧠 Knowledge Quiz** - Test your waste management knowledge
- **🔐 Authentication** - Secure login with Supabase Auth (Google Sign-In supported)

### 👷 **For Waste Workers**
- **🎓 Safety Training** - Mandatory training on PPE, hazardous waste handling, and emergency protocols
- **💼 Job Portal** - Apply for dignified positions: Collection Drivers, Sorting Specialists, Plant Operators
- **📄 Application System** - Submit applications with experience and certification details

### 🏆 **For Green Champions**
- **👥 Registration** - Register as a community leader for your area/block/ward
- **📊 Monthly Reporting** - Upload geo-tagged images and progress descriptions
- **🏅 Leaderboard** - Track top-performing areas with scoring and badges
- **🎖️ Recognition System** - Earn badges like "Most Active," "Segregation Star," "Cleanest Block"

### 🌍 **Community Features**
- **📢 Campaigns** - Join or create community cleanup drives and events
- **♻️ Marketplace** - Buy and sell recyclable materials (Paper, Plastics, Metals, E-Waste, Glass, Textiles)
- **📈 Admin Dashboard** - Secure portal for administrators to manage reports and campaigns

---

## 🛠 Technology Stack

### **Frontend**
- **Framework**: [Next.js 15.5.3](https://nextjs.org/) with App Router
- **React**: 18+ with TypeScript
- **Styling**: [Tailwind CSS 4.1.13](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: React Hook Form

### **Backend & Database**
- **BaaS**: [Supabase](https://supabase.com/)
  - PostgreSQL Database
  - Authentication (Email/Password, Google OAuth)
  - Storage for user-uploaded images
- **ORM**: Supabase JS Client

### **Maps & Geolocation**
- **Mapping Library**: [Leaflet](https://leafletjs.com/) via [React Leaflet](https://react-leaflet.js.org/)
- **Map Tiles**: OpenStreetMap
- **Geolocation**: Browser Geolocation API

### **Development Tools**
- **Language**: TypeScript 5
- **Linting**: ESLint 9 with Next.js config
- **Package Manager**: npm
- **Build Tool**: Next.js Turbopack (--turbopack flag)

---

## 📁 Project Structure

```
rizzcyclers/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage with hero, stats, features
│   ├── layout.tsx                # Root layout with global styles
│   ├── globals.css               # Global Tailwind CSS styles
│   │
│   ├── components/               # Reusable React components
│   │   ├── Header.tsx           # Navigation header with variants
│   │   ├── Map.tsx              # Interactive Leaflet map component
│   │   └── TrainingComponents.tsx
│   │
│   ├── login/                    # Authentication
│   │   └── page.tsx             # Login/Sign-up with Supabase Auth UI
│   │
│   ├── report/                   # Waste Reporting
│   │   └── page.tsx             # Report submission form with geolocation
│   │
│   ├── map/                      # Live Map View
│   │   └── page.tsx             # Dynamic map showing all reports
│   │
│   ├── training/                 # Citizen Education
│   │   └── page.tsx             # Training modules + interactive quiz
│   │
│   ├── manual/                   # Documentation
│   │   └── page.tsx             # Full waste management manual
│   │
│   ├── join/                     # Worker Jobs
│   │   └── page.tsx             # Job application portal
│   │
│   ├── champion/                 # Green Champions
│   │   └── page.tsx             # Champion registration & leaderboard
│   │
│   ├── marketplace/              # Recycling Marketplace
│   │   └── page.tsx             # Buy/sell recyclable materials
│   │
│   ├── campaings/                # Community Campaigns
│   │   └── page.tsx             # Create and join cleanup events
│   │
│   └── admin/                    # Admin Portal
│       ├── page.tsx             # Admin login
│       └── dashboard/
│           └── page.tsx         # Protected admin dashboard
│
├── lib/                          # Utility libraries
│   └── supabaseClient.ts        # Supabase client configuration
│
├── public/                       # Static assets
│
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration (Leaflet webpack)
├── postcss.config.mjs            # PostCSS with Tailwind
├── eslint.config.mjs             # ESLint configuration
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 20+ 
- **npm** or **yarn** or **pnpm**
- **Supabase Account** (for database and auth)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rizzcyclers.git
   cd rizzcyclers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**  
   Create a `reports` table in your Supabase project:
   ```sql
   CREATE TABLE reports (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     category TEXT,
     severity TEXT,
     lat FLOAT,
     lng FLOAT,
     address TEXT,
     image_url TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**  
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 🔐 Environment Variables

Required environment variables in `.env.local`:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGciOiJIUzI1...` |

---

## 📄 Available Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero banner, stats, and features |
| `/login` | User authentication (Email/Google) |
| `/report` | Submit waste reports with photos and location |
| `/map` | Interactive map of all waste reports (Odisha-focused) |
| `/training` | Educational modules on waste segregation and composting |
| `/manual` | Comprehensive waste management guide |
| `/join` | Job application portal for waste workers |
| `/champion` | Green Champion registration and leaderboard |
| `/marketplace` | Buy/sell recyclable materials |
| `/campaings` | Community cleanup campaigns |
| `/admin` | Admin authentication portal |
| `/admin/dashboard` | Protected admin control panel |

---

## 🎯 Key Functionalities

### **Waste Reporting System**
- Capture geo-tagged photos of waste
- Categorize by type: Plastic, Organic, E-Waste, Hazardous, Mixed, Other
- Severity levels: Low, Medium, High, Critical
- Browser-based geolocation capture
- Store reports in Supabase with image uploads

### **Interactive Mapping**
- Real-time display of all submitted reports
- Bounded to Odisha geographical area
- Click markers to view report details
- Responsive zoom and pan controls

### **Training & Education**
- **3-Bin System**: Red (Dry), Green (Wet), Yellow (Hazardous)
- **Home Composting**: Step-by-step guide
- **3 R's**: Reduce, Reuse, Recycle
- **Interactive Quiz**: 5 questions with instant scoring

### **Authentication**
- Supabase Auth UI integration
- Email/Password authentication
- Google OAuth support
- Protected routes for admin dashboard
- Session management with automatic redirects

### **Green Champion System**
- Area-based registration
- Monthly photo reporting with geo-tags
- Scoring algorithm for leaderboard
- Badge system for recognition
- Community competition

### **Marketplace**
- Material pricing guides:
  - Paper & Cardboard: ₹8-15/kg
  - Plastics: ₹12-25/kg
  - Metals: ₹45-180/kg
  - E-Waste: ₹30-500/piece
  - Glass & Textiles: ₹5-20/kg
- Upload photos for listings
- Modal-based seller interface

---

## 📊 Statistics Tracking

The platform tracks and displays real-time metrics:
- **Waste Collected**: Kg of waste processed
- **Recycling Rate**: Percentage of waste recycled
- **Complaints Resolved**: Number of reports addressed
- **Active Campaigns**: Ongoing community drives

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Supabase** for the backend infrastructure
- **OpenStreetMap Contributors** for map data
- **Leaflet** for mapping library
- All the waste workers and environmental champions making India cleaner

---

## 📞 Contact & Support

For questions, suggestions, or support:
- **Email**: support@rizzcycler.in
- **GitHub Issues**: [Report a bug](https://github.com/yourusername/rizzcyclers/issues)

---

**Built with 🌱 Green Vision | © 2025 RizzCycler**  
*Building a cleaner India, one community at a time*
