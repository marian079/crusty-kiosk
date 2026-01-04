# FastFood Kiosk - Design Guidelines

## Design Approach: Reference-Based (Food Ordering Kiosks)
Drawing inspiration from McDonald's self-service kiosks, DoorDash ordering flow, and Toast POS systems, this design prioritizes speed, clarity, and visual appetite appeal optimized for touch interaction from a standing position.

**Core Principles:**
- Touch-first design with generous hit areas
- Visual hierarchy through food imagery and white space
- Immediate feedback for all interactions
- Clear order progress indicators

## Color Palette

### Light Mode (Primary)
- **Background**: 0 0% 98% (near-white for clean appearance)
- **Surface**: 0 0% 100% (pure white cards)
- **Primary Brand**: 12 76% 61% (warm orange-red, appetite-stimulating)
- **Primary Hover**: 12 76% 55%
- **Text Primary**: 0 0% 15%
- **Text Secondary**: 0 0% 45%
- **Border**: 0 0% 90%
- **Success**: 142 71% 45% (order confirmation)
- **Warning**: 45 93% 58% (cart attention)

### Dark Mode
- **Background**: 0 0% 8%
- **Surface**: 0 0% 12%
- **Primary Brand**: 12 76% 65% (slightly brighter for contrast)
- **Text Primary**: 0 0% 95%
- **Text Secondary**: 0 0% 65%
- **Border**: 0 0% 20%

## Typography

**Font Stack:**
- Primary: 'Inter', system-ui, sans-serif (Google Fonts)
- Accent: 'Poppins', sans-serif for headings (Google Fonts)

**Scale:**
- Display (Header/Branding): text-4xl (36px) / font-bold
- Product Names: text-xl (20px) / font-semibold
- Prices: text-2xl (24px) / font-bold
- Category Labels: text-lg (18px) / font-medium
- Body Text: text-base (16px)
- Cart Items: text-sm (14px)
- Button Text: text-lg (18px) / font-semibold

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Touch target minimum: p-4 (16px) - buttons should be p-6 or larger
- Card padding: p-6
- Section spacing: py-12 to py-16
- Grid gaps: gap-6 to gap-8

**Container Widths:**
- Full-width interface (kiosk optimized)
- Product grid: max-w-7xl mx-auto
- Modals: max-w-2xl

**Grid System:**
- Categories: grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4
- Product Cards: grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6

## Component Library

### Header Navigation
- Fixed top bar with shadow-md
- Restaurant branding (left): Logo/emoji + name, text-3xl
- Cart summary (right): Badge with count, total price display, text-xl
- Sticky positioning for constant access
- Height: h-20, touch-friendly tap area

### Category Filter Bar
- Horizontal scrollable pill buttons
- Each category: rounded-full, px-8, py-4, text-lg
- Active state: bg-primary with white text
- Inactive: border-2, hover:bg-gray-100
- Icon + label format for visual recognition

### Product Cards
- Aspect ratio 4:3 for food images
- Image: rounded-t-2xl, object-cover, w-full h-48
- Content area: p-6, bg-white
- Product name: text-xl, font-semibold, line-clamp-2
- Description: text-sm, text-gray-600, line-clamp-1
- Price: text-2xl, font-bold, text-primary
- Add button: w-full, py-4, text-lg, rounded-xl, prominent CTA
- Hover: transform scale-105, shadow-lg transition

### Cart Sidebar
- Fixed right panel: w-96 (384px), slide-in animation
- Overlay: fixed inset-0, bg-black/50
- Header: sticky top-0, text-2xl, font-bold, p-6
- Item list: space-y-4, overflow-y-auto
- Each item: flex layout, image thumbnail (64x64), quantity controls (large +/- buttons)
- Footer: sticky bottom-0, p-6, shadow-top
- Subtotal/Total: text-xl to text-2xl
- Action buttons: full width, py-4, text-lg

### Checkout Modal
- Centered overlay: max-w-2xl
- Two-column layout on desktop
- Order summary (left): scrollable item list
- Payment form (right): large input fields (h-14), radio buttons for payment method
- Name field: optional, text-lg
- Submit button: w-full, py-6, text-xl, rounded-xl

### Order Confirmation
- Success modal: centered, max-w-xl
- Large checkmark icon: w-24 h-24, text-green-500
- Order number: text-6xl, font-bold, text-primary
- Message: text-xl, text-center
- New Order button: py-6, text-xl, w-full

### Loading States
- Skeleton cards during product load
- Spinner: w-16 h-16 for full-page loading
- Inline spinners for button actions

### Empty States
- Cart empty: Large emoji (text-8xl), descriptive text (text-xl)
- No products: Friendly message with suggestion to select category

## Images

**Product Images:**
- High-quality food photography with consistent lighting
- Appetite appeal focus: bright, appetizing, professional shots
- Consistent white or light neutral background
- Images show finished product, garnished and plated
- Placement: Top of each product card, 4:3 aspect ratio
- Recommended size: 600x450px minimum

**Category Icons:**
- Use emoji or Font Awesome food icons
- Size: 24x24px alongside category text
- Examples: 🍔 Burgers, 🍟 Sides, 🥤 Drinks, 🍰 Desserts

**Cart Thumbnails:**
- Smaller product images in cart: 64x64px
- Rounded corners: rounded-lg
- Object-fit: cover

**No Hero Image Required** - This is a utility application, not a marketing page. Launch directly into category filters and product grid.

## Interaction Patterns

**Touch Optimization:**
- All buttons minimum 56px height (py-4)
- Tap feedback: active:scale-95 transition
- No hover-only interactions
- Clear active/selected states

**Animations:** Minimal, performance-focused
- Cart slide-in: 300ms ease-out
- Modal fade: 200ms
- Button press: 100ms scale
- Quantity +/- immediate number update

**Feedback:**
- Add to cart: brief success animation (scale + color pulse)
- Order placed: prominent success modal
- Loading: skeleton screens, not spinners where possible

## Accessibility
- Consistent dark mode across all components
- Touch targets exceed 44x44px minimum
- High contrast text (WCAG AA minimum)
- Focus indicators on all interactive elements
- Semantic HTML for screen readers
- Large, readable fonts for standing distance viewing