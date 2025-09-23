# 🚀 Share Prompts - Fullstack Next.js Application

A modern, fullstack web application built with Next.js that allows users to discover, create, and share AI prompts. Users can authenticate with Google, manage their prompts, and explore a community-driven collection of creative AI prompts.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS
- **Development**: TypeScript, ESLint

## ✨ Features

### Core Functionality
- **🔐 Authentication**: Secure Google OAuth integration with NextAuth.js
- **📝 CRUD Operations**: Create, read, update, and delete prompts with full user ownership
- **🔍 Advanced Search**: Search prompts by keywords, tags, or usernames
- **👤 User Profiles**: Personal profile pages with user-specific prompt collections
- **📱 Responsive Design**: Mobile-first design that works on all devices

### Development Features
- **🌱 Database Seeding**: Comprehensive seeding system with sample data
- **🔧 Environment Management**: Robust environment variable handling
- **📊 Database Testing**: Built-in connection testing utilities
- **🎯 TypeScript Support**: Full type safety throughout the application

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or MongoDB Atlas)
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd share-prompts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_URL_INTERNAL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   ```

4. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Database Seeding

This project includes a comprehensive database seeding system for development and testing:

### Available Seeding Commands

```bash
# Basic seeding (recommended)
npm run seed

# TypeScript version
npm run seed:ts

# Advanced seeding with options
npm run seed:advanced

# Seed only users
npm run seed:users

# Seed only prompts
npm run seed:prompts

# Seed without clearing existing data
npm run seed:clear
```

### Sample Data Included
- **5 Sample Users**: Realistic user profiles with Google authentication data
- **15 Diverse Prompts**: Various categories including creative writing, coding, business, and more

For detailed seeding documentation, see [SEEDER_README.md](./SEEDER_README.md).

## 🏗️ Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth.js configuration
│   │   ├── prompt/        # Prompt CRUD operations
│   │   └── users/         # User-related endpoints
│   ├── create-prompt/     # Create prompt page
│   ├── profile/           # User profile pages
│   └── update-prompt/     # Edit prompt page
├── components/            # Reusable React components
├── models/               # Mongoose schemas
├── scripts/              # Database and utility scripts
├── seeds/                # Sample data for seeding
├── styles/               # Global styles
└── utils/                # Utility functions
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database Management
npm run seed         # Seed database with sample data
npm run seed:ts      # TypeScript seeder
npm run seed:advanced # Advanced seeder with CLI options
npm run check-env    # Validate environment variables
npm run test-db      # Test database connection
```

## 🌐 API Endpoints

### Authentication
- `GET /api/auth/*` - NextAuth.js authentication routes

### Prompts
- `GET /api/prompt` - Get all prompts
- `POST /api/prompt/new` - Create new prompt
- `GET /api/prompt/[id]` - Get specific prompt
- `PATCH /api/prompt/[id]` - Update prompt
- `DELETE /api/prompt/[id]` - Delete prompt

### Users
- `GET /api/users/[id]/posts` - Get user's prompts

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

### Environment Variables for Production
Ensure all environment variables are properly configured in your deployment platform, especially:
- `MONGODB_URL` - Your production MongoDB connection string
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - A secure secret for production
- Google OAuth credentials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by [@JavascriptMastery](https://github.com/adrianhajdin)
- Built with modern web development best practices
- Community-driven prompt sharing concept
