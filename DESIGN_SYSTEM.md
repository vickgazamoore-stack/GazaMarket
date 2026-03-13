# Gaza Market - Design System

## Color Palette

### Primary Colors

- **Dark Background**: `bg-gray-900` (main page background)
- **Card Background**: `bg-zinc-900` (product cards, modals, panels)
- **Border**: `border-gray-800` (subtle dividers)
- **Accent Blue**: `bg-blue-600` / `text-blue-600` (CTAs, primary action buttons)
- **Accent Blue Hover**: `bg-blue-700`

### Secondary Colors

- **White**: `bg-white` / `text-white` (card content, text)
- **Gray Text**: `text-gray-300`, `text-gray-400` (secondary text)
- **Light Text**: `text-white` (primary text on dark)
- **Red**: `bg-red-600` (discount badges, alerts)
- **Yellow**: `text-yellow-400` (ratings)

### Gradients & Effects

- **Glow Effect**: `from-blue-500/30 to-cyan-400/30 blur-2xl`
- **Blue Shadow**: `shadow-blue-500/30`
- **Background Gradient**: `from-gray-900 via-gray-800 to-blue-900`

## Component Patterns

### Cards (Product/Content)

```jsx
<div className="relative w-full rounded-2xl overflow-hidden bg-zinc-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
	{/* Blue Glow */}
	<div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-400/30 blur-2xl" />

	{/* Content goes here */}
</div>
```

### Buttons

- **Primary**: `bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 font-semibold transition`
- **Secondary**: `bg-gray-800 hover:bg-gray-700 text-white`
- **Danger**: `bg-red-600 hover:bg-red-700 text-white`

### Input Fields

- **Text Input**: `bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500`
- **Select**: Same as input

### Badges

- **Discount**: `bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full`
- **Status**: `bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full`

### Typography

- **Heading 1**: `text-3xl font-bold text-white`
- **Heading 2**: `text-2xl font-bold text-white`
- **Heading 3**: `text-lg font-bold text-white`
- **Paragraph**: `text-gray-300`
- **Small**: `text-sm text-gray-400`

### Layouts

- **Page Width**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section Spacing**: `py-12`, `py-8`, `py-6`
- **Grid Gaps**: `gap-6`, `gap-8`

## Icon Colors

- **Light**: `text-gray-300` or `text-gray-400`
- **Accent**: `text-blue-400` or `text-blue-600`
- **Warning**: `text-yellow-400`
- **Error**: `text-red-600`

## Responsive Breakpoints

- Mobile: Default (no breakpoint)
- Tablet: `md:` (768px)
- Desktop: `lg:` (1024px)

## Common Patterns

### Header/Navigation

- Dark background with sticky positioning
- Logo on left
- Search in center (when applicable)
- Icons/buttons on right
- Border bottom: `border-gray-800`

### Dashboard Layouts

- Sidebar on left (collapse on mobile)
- Main content on right
- Cards with dark background for sections
- Blue accent buttons for actions

### Forms

- Dark inputs with gray borders
- Blue focus rings
- Error states with red backgrounds/text
- Help text in gray-400

### Status Indicators

- Orders: Green (completed), Blue (in-progress), Gray (pending)
- Sellers: Green (verified), Yellow (pending), Red (suspended)
- Products: Green (active), Gray (inactive)

## Spacing Scale

- `p-2` = 8px (small elements)
- `p-4` = 16px (card padding)
- `p-6` = 24px (section padding)
- `p-8` = 32px (large padding)
- `gap-2` = 8px
- `gap-4` = 16px
- `gap-6` = 24px
- `gap-8` = 32px
