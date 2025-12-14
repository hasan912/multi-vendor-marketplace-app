# MarketHub - Multi-Vendor Marketplace

A modern, full-featured multi-vendor e-commerce marketplace built with Next.js 14, Firebase, and TypeScript.

## 🚀 Features

### For Customers
- **Product Browsing**: Browse products by categories, search, and filter
- **Shopping Cart**: Add products to cart with quantity management
- **Secure Checkout**: Complete orders with shipping information
- **Order Tracking**: View order history and status
- **User Authentication**: Secure login/signup with Firebase Auth
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### For Vendors
- **Vendor Dashboard**: Comprehensive analytics and insights
  - Total products, orders, and sales tracking
  - Monthly sales and order graphs
  - Profit calculation (30% margin)
- **Product Management**: Create, edit, and delete products
- **Image Upload**: Multiple image support with automatic compression (base64)
- **Order Management**: View and manage customer orders
- **Status Updates**: Update order status (pending, shipped, completed, cancelled)
- **Inventory Tracking**: Monitor stock levels and low-stock alerts

### Technical Features
- **Image Optimization**: Automatic compression to 800x800px at 70% quality
- **Base64 Storage**: Images stored as base64 in Firestore (no external storage needed)
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Real-time Updates**: Firestore real-time data synchronization
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error boundaries and validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or pnpm/yarn)
- **Firebase Account**: For backend services

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd multi-vendor-marketplace-app
```

### 2. Install Dependencies
```bash

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
multi-vendor-marketplace-app/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                  # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── (public)/                # Public routes
│   │   ├── page.tsx            # Homepage
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── checkout/
│   │   ├── orders/
│   │   └── products/
│   ├── (vendor)/                # Vendor routes
│   │   └── vendor/
│   │       ├── dashboard/
│   │       ├── orders/
│   │       └── products/
│   ├── globals.css
│   └── layout.tsx
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── error-boundary.tsx
│   ├── navbar.tsx
│   ├── product-card.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── vendor-sidebar.tsx
├── lib/                         # Utility libraries
│   ├── firebase/
│   │   ├── auth.ts             # Authentication functions
│   │   ├── config.ts           # Firebase configuration
│   │   ├── orders.ts           # Order management
│   │   └── products.ts         # Product management
│   └── utils.ts
├── providers/                   # Context providers
│   ├── auth-provider.tsx
│   └── theme-provider.tsx
├── hooks/                       # Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── .env.local                   # Local environment variables (git-ignored)
├── .gitignore
├── components.json              # shadcn/ui configuration
├── firestore.indexes.json       # Firestore index definitions
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## 📊 Database Schema

### Collections

#### 1. users
```typescript
{
  uid: string
  email: string
  role: "customer" | "vendor"
  displayName?: string
  createdAt: Date
}
```

#### 2. vendor_profiles
```typescript
{
  vendorId: string
  businessName: string
  description: string
  createdAt: Date
}
```

#### 3. products
```typescript
{
  id: string
  title: string
  price: number
  description: string
  images: string[]        // Base64 encoded images
  vendorId: string
  vendorName?: string
  stock: number
  category: string
  createdAt: Date
}
```

#### 4. orders
```typescript
{
  id: string
  userId: string
  vendorId: string
  items: OrderItem[]
  totalAmount: number
  status: "pending" | "shipped" | "completed" | "cancelled"
  createdAt: Date
  shippingAddress: {
    fullName: string
    address: string
    city: string
    state: string
    zipCode: string
  }
}
```

## 🎨 Features Deep Dive

### Image Handling
- **Automatic Compression**: Images are compressed to maximum 800x800px
- **Quality Optimization**: 70% JPEG quality for optimal size
- **Base64 Storage**: No external storage needed, stored directly in Firestore
- **Multiple Images**: Support for up to 5 images per product
- **Size Warning**: Alerts if image exceeds 500KB after compression

### Order Management
- **Vendor Grouping**: Orders automatically grouped by vendor
- **Status Tracking**: Real-time status updates
- **Order History**: Complete order history for customers and vendors
- **Shipping Details**: Full address management

### Dashboard Analytics
- **Total Products**: Count of all vendor products
- **Total Orders**: Number of orders received
- **Products Sold**: Total quantity of products sold
- **Total Sales**: Revenue generated
- **Total Profit**: Calculated at 30% margin
- **Monthly Charts**: Last 6 months of orders and sales data

## 🔒 Security

### Authentication
- Firebase Authentication with email/password
- Protected routes with auth guards
- Role-based access control (Customer/Vendor)

### Data Protection
- Firestore security rules enforce access control
- User data isolation
- Vendor data separation
- Order visibility restricted to parties involved

### Best Practices
- Environment variables for sensitive data
- HTTPS in production
- Input validation and sanitization
- Error boundaries for graceful error handling

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables from `.env.local`
   - Deploy

3. **Post-Deployment**
   - Update `NEXT_PUBLIC_APP_URL` in environment variables
   - Update Firebase authorized domains

### Other Platforms

#### Netlify
```bash
npm run build
# Deploy .next folder
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Firebase Connection Error
**Problem**: "Firebase: Error (auth/configuration-not-found)"
**Solution**: 
- Verify `.env.local` file exists
- Check all Firebase environment variables are set
- Restart development server

#### 2. Firestore Permission Denied
**Problem**: "Missing or insufficient permissions"
**Solution**:
- Check Firestore security rules
- Ensure user is authenticated
- Verify user role matches required permission

#### 3. Image Upload Fails
**Problem**: Images not saving or displaying
**Solution**:
- Check image size (should be < 5MB)
- Verify base64 conversion is working
- Check browser console for errors

#### 4. Build Errors
**Problem**: TypeScript or ESLint errors during build
**Solution**:
```bash
# Fix linting issues
npm run lint -- --fix

# Type check
npx tsc --noEmit
```

#### 5. Index Not Found
**Problem**: "The query requires an index"
**Solution**:
- Click the link in the error message to create index
- Or deploy indexes: `firebase deploy --only firestore:indexes`

### Debug Mode
Enable debug logging:
```javascript
// In firebase/config.ts
import { setLogLevel } from 'firebase/firestore'
setLogLevel('debug')
```

## 📈 Performance Optimization

### Implemented Optimizations
- Image compression and resizing
- Next.js automatic code splitting
- Dynamic imports for heavy components
- Firestore query optimization with indexes
- Client-side caching with React state

### Further Optimization Tips
1. Enable Next.js Image Optimization
2. Implement ISR (Incremental Static Regeneration)
3. Add CDN for static assets
4. Enable Firestore offline persistence
5. Implement lazy loading for images

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] User can sign up as customer
- [ ] User can sign up as vendor
- [ ] User can log in
- [ ] User can log out
- [ ] Protected routes redirect to login

#### Customer Flow
- [ ] Browse products
- [ ] Filter by category
- [ ] Search products
- [ ] Add to cart
- [ ] Update cart quantities
- [ ] Checkout with shipping info
- [ ] View order history

#### Vendor Flow
- [ ] Access vendor dashboard
- [ ] View analytics and graphs
- [ ] Create new product
- [ ] Upload multiple images
- [ ] Edit existing product
- [ ] Delete product
- [ ] View orders
- [ ] Update order status

## 🤝 Contributing

### Development Workflow
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create pull request
5. Code review
6. Merge to main

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review Firebase Console logs
- Check browser console for errors
- Review Firestore security rules

## 🎯 Roadmap

### Future Enhancements
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Product variations (size, color)
- [ ] Discount codes and promotions
- [ ] Vendor verification system
- [ ] Live chat support
- [ ] Multi-language support

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/docs)

---

**Built with ❤️ using Next.js and Firebase**

- Collection ID: `orders`
- Fields:
  - `userId` (Ascending)
  - `createdAt` (Descending)
- Query scope: Collection

**Index 2: Orders by Vendor**
- Collection ID: `orders`
- Fields:
  - `vendorId` (Ascending)
  - `createdAt` (Descending)
- Query scope: Collection

Alternatively, deploy the provided `firestore.indexes.json`:
```bash
firebase deploy --only firestore:indexes
```

### 4. Environment Configuration

#### A. Get Firebase Credentials
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll to **Your apps** section
3. Click the **</>** (Web) icon to register a web app
4. Copy the configuration values

#### B. Create Environment File
Create `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

#### C. Fill in Environment Variables
Edit `.env.local` with your Firebase credentials:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MarketHub
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
