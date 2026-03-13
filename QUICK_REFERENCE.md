# Quick Reference - Design System & Color Codes

## 🎨 Color Palette

### Backgrounds

| Color        | Class               | Use Case           |
| ------------ | ------------------- | ------------------ |
| Dark Page    | `bg-gray-900`       | Page background    |
| Dark Card    | `bg-zinc-900`       | Cards, panels      |
| Dark Section | `bg-gray-800`       | Headers, sections  |
| Hover        | `hover:bg-gray-700` | Interactive states |

### Text Colors

| Color     | Class                              | Use Case         |
| --------- | ---------------------------------- | ---------------- |
| Primary   | `text-white`                       | Headings, labels |
| Secondary | `text-gray-300`                    | Body text        |
| Tertiary  | `text-gray-400`                    | Help text, hints |
| Accent    | `text-blue-400` or `text-blue-600` | Links, emphasis  |

### Accent Colors

| Color           | Class               | Use Case           |
| --------------- | ------------------- | ------------------ |
| Primary Button  | `bg-blue-600`       | Main CTAs          |
| Button Hover    | `hover:bg-blue-700` | Button states      |
| Blue Text       | `text-blue-400`     | Links, prices      |
| Blue Background | `bg-blue-900/30`    | Subtle backgrounds |

### Status/Semantic Colors

| Status           | Badge Class        | Text Class        |
| ---------------- | ------------------ | ----------------- |
| Success/Verified | `bg-green-900/30`  | `text-green-400`  |
| Info/Shipped     | `bg-blue-900/30`   | `text-blue-400`   |
| Warning/Pending  | `bg-yellow-900/30` | `text-yellow-400` |
| Error/Cancelled  | `bg-red-900/30`    | `text-red-400`    |
| Neutral          | `bg-gray-700`      | `text-gray-300`   |

### Borders

| Style          | Class                      | Use Case      |
| -------------- | -------------------------- | ------------- |
| Card Border    | `border border-gray-800`   | Card outlines |
| Section Border | `border-b border-gray-700` | Dividers      |
| Input Border   | `border border-gray-700`   | Form fields   |

### Special Effects

| Effect           | Class                                      | Use Case         |
| ---------------- | ------------------------------------------ | ---------------- |
| Card Glow        | `from-blue-500/30 to-cyan-400/30 blur-2xl` | Card backgrounds |
| Shadow           | `shadow-xl`                                | Card elevation   |
| Blue Glow Shadow | `shadow-blue-500/30`                       | Emphasis         |

---

## 🧩 Component Classes

### Cards

```tailwind
relative rounded-2xl overflow-hidden bg-zinc-900 shadow-xl border border-gray-800 group
```

### Buttons - Primary

```tailwind
bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors
```

### Buttons - Secondary

```tailwind
bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors
```

### Buttons - Danger

```tailwind
bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors
```

### Form Inputs

```tailwind
w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
```

### Status Badge

```tailwind
px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/30 text-blue-400
```

### Headers

```tailwind
bg-gray-800 border-b border-gray-700
```

### Select Dropdowns

```tailwind
bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
```

---

## 📐 Spacing Reference

### Padding

- `p-2` = 8px (small)
- `p-3` = 12px
- `p-4` = 16px (standard)
- `p-5` = 20px
- `p-6` = 24px (card padding)
- `p-8` = 32px (large)

### Margins

- `my-2` = 8px vertical
- `my-4` = 16px vertical
- `mb-6` = 24px bottom
- `mt-4` = 16px top

### Gaps (Grid/Flex)

- `gap-2` = 8px
- `gap-4` = 16px
- `gap-6` = 24px
- `gap-8` = 32px

### Section Spacing

- `py-6` = 24px vertical
- `py-8` = 32px vertical
- `py-12` = 48px vertical

---

## 📱 Responsive Prefixes

```tailwind
/* Mobile First */
grid-cols-1              /* Mobile */
md:grid-cols-2           /* Tablet (768px+) */
lg:grid-cols-3           /* Desktop (1024px+) */
xl:grid-cols-4           /* Large (1280px+) */
```

### Layout Example

```tailwind
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

---

## 🔤 Typography Classes

### Headings

```tailwind
text-4xl font-bold text-white        /* Huge */
text-3xl font-bold text-white        /* Large */
text-2xl font-bold text-white        /* Medium */
text-xl font-bold text-white         /* Small */
text-lg font-bold text-white         /* Tiny */
```

### Body Text

```tailwind
text-base text-gray-300              /* Regular */
text-sm text-gray-400                /* Small */
text-xs text-gray-500                /* Extra small */
```

### Font Weights

```tailwind
font-normal              /* Regular */
font-semibold            /* Medium (most common for labels) */
font-bold                /* Heavy (for headings) */
font-extrabold           /* Extra heavy */
```

---

## 🎯 Common Patterns

### Page Container

```tailwind
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

### Grid Layout (2-column responsive)

```tailwind
grid grid-cols-1 lg:grid-cols-3 gap-8
lg:col-span-2          /* Left col: 2/3 width */
lg:col-span-1          /* Right col: 1/3 width */
```

### Status Badge Color Mapping

```
Status      |  Badge Class                   |  Text Class
Delivered   |  bg-green-900/30               |  text-green-400
Shipped     |  bg-blue-900/30                |  text-blue-400
Processing  |  bg-yellow-900/30              |  text-yellow-400
Cancelled   |  bg-red-900/30                 |  text-red-400
Pending     |  bg-gray-700                   |  text-gray-300
```

---

## 🎨 Complete Color Reference

### Gray Scale

```
bg-gray-900    (dark page background)
bg-gray-800    (section/header background)
bg-gray-700    (hover/secondary element)
bg-gray-600    (disabled/inactive)
bg-gray-500    (not typically used in dark theme)

text-white     (primary text)
text-gray-300  (secondary text)
text-gray-400  (tertiary text)
text-gray-500  (hint text)
```

### Blue (Primary Accent)

```
bg-blue-600    (primary button)
bg-blue-700    (button hover)
bg-blue-500    (glow effect)
bg-blue-900    (semantic background - pair with text-blue-400)

text-blue-400  (light text on dark)
text-blue-600  (accent text)
```

### Cyan (Glow Enhancement)

```
from-blue-500/30 to-cyan-400/30  (combined glow)
```

### Status Colors

```
Green:   bg-green-900/30 + text-green-400    (success)
Yellow:  bg-yellow-900/30 + text-yellow-400  (warning)
Red:     bg-red-900/30 + text-red-400        (error)
```

### Zinc (Card Alternative)

```
bg-zinc-900    (alternative dark card background)
```

---

## 🚀 Quick Copy Templates

### Full Card with Glow

```jsx
<div className="relative rounded-2xl overflow-hidden bg-zinc-900 shadow-xl border border-gray-800 group">
	<div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-400/30 blur-2xl" />
	<div className="relative p-6">{/* Content */}</div>
</div>
```

### Stat Card

```jsx
<div className="relative rounded-2xl overflow-hidden bg-zinc-900 shadow-xl border border-gray-800 group">
	<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
	<div className="relative p-6">
		<div className="flex items-center justify-between mb-4">
			<h3 className="text-gray-300 font-semibold">Title</h3>
			<Icon className="w-8 h-8 text-blue-400" />
		</div>
		<p className="text-4xl font-bold text-white">123</p>
		<p className="text-sm text-gray-400 mt-2">Subtitle</p>
	</div>
</div>
```

### List Item

```jsx
<div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors border border-gray-700">
	<div className="flex items-center justify-between">
		<div>
			<p className="font-semibold text-white">Title</p>
			<p className="text-sm text-gray-400">Subtitle</p>
		</div>
		<span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/30 text-blue-400">
			Status
		</span>
	</div>
</div>
```

### Form Group

```jsx
<div>
	<label className="block text-sm font-semibold text-gray-200 mb-2">
		Label
	</label>
	<input
		className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		placeholder="Placeholder..."
	/>
</div>
```

---

## 📋 Implementation Checklist

When building new pages:

- [ ] Use `bg-gray-900` for page background
- [ ] Use `bg-gray-800` for headers/sections
- [ ] Use `bg-zinc-900` for cards with borders
- [ ] Include glow effect: `from-blue-500/30 to-cyan-400/30`
- [ ] Use `text-white` for headings
- [ ] Use `text-gray-300` for body text
- [ ] Use `bg-blue-600` for primary buttons
- [ ] Status badges use semantic colors
- [ ] Inputs: `bg-gray-800 border border-gray-700`
- [ ] Include `max-w-7xl mx-auto px-4` container
- [ ] Add `border-b border-gray-700` under headers
- [ ] Test responsive layout (mobile/tablet/desktop)
- [ ] Import and use Footer component

---

## 🎓 Reference Files

- **DESIGN_SYSTEM.md** - Detailed design system documentation
- **PAGE_DESIGN_GUIDE.md** - Component patterns and best practices
- **IMPLEMENTATION_STATUS.md** - Page-by-page implementation guide
- **README_DESIGN_SYSTEM.md** - Complete overview and summary

---

**Last Updated**: January 23, 2026  
**Version**: 1.0  
**Status**: Production Ready
