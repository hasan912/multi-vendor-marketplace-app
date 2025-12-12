# MarketHub - Multi-Vendor Marketplace

A modern, fully-responsive multi-vendor marketplace built with Next.js 14, Firebase, and Tailwind CSS featuring a beautiful soft gradient theme.

## Features

### For Customers
- Browse products from multiple vendors
- Search and filter by category
- View detailed product pages with image galleries
- Add products to cart with quantity management
- Complete checkout with shipping information
- Track order history and status

### For Vendors
- Complete vendor dashboard with analytics
- Product management (CRUD operations)
- Image upload to Firebase Storage
- Order tracking and management
- Real-time product updates

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Theme**: next-themes with light/dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project set up

### Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (public)/        # Public marketplace pages
│   ├── (vendor)/        # Vendor dashboard pages
│   └── layout.tsx       # Root layout
├── components/          # Reusable components
├── lib/
│   └── firebase/        # Firebase configuration and utilities
├── providers/           # React context providers
└── public/             # Static assets
\`\`\`

## Firebase Collections

- **users**: User profiles with role information
- **vendor_profiles**: Vendor-specific information
- **products**: Product listings with images and details
- **orders**: Customer orders with status tracking

## Key Features Implementation

### Authentication
- Role-based authentication (Customer/Vendor)
- Protected routes for vendors
- Session management with Firebase Auth

### Product Management
- CRUD operations for products
- Multi-image upload support
- Category-based organization
- Stock management

### Shopping Cart
- LocalStorage-based cart with Firestore sync
- Quantity management
- Real-time total calculations

### Orders
- Multi-vendor order support
- Order status tracking (Pending → Shipped → Completed)
- Order history for customers

## Design Theme

The app uses a soft pastel gradient theme:
- Primary: Sky Blue Gradient (#A1C4FD → #C2E9FB)
- Secondary: Peach Pink Gradient (#FAD0C4 → #FFD1FF)
- Large rounded components (rounded-2xl)
- Soft shadows and glassmorphism effects
- Smooth hover animations

## License

MIT
