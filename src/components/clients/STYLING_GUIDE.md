# Client Management Components - Styling Guide

## Design Patterns

### Color Scheme
- **Primary**: Blue-600 (#2563eb) for interactive elements
- **Background**: Gray-50 (#f9fafb) for page backgrounds
- **Cards**: White (#ffffff) with gray-200 borders
- **Text**: Gray-900 for primary text, gray-600 for secondary

### Spacing
- **Page padding**: `px-4 sm:px-6 lg:px-8 py-6`
- **Section spacing**: `space-y-8 lg:space-y-10`
- **Card padding**: `p-4` for small cards, `p-6` for larger cards
- **Grid gaps**: `gap-3 sm:gap-4` for responsive grids

### Responsive Breakpoints
- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `md:` (≥ 768px), `lg:` (≥ 1024px)
- **Large**: `xl:` (≥ 1280px)

### Interactive States
- **Hover**: `hover:shadow-md hover:border-gray-300`
- **Focus**: `focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`
- **Transitions**: `transition-all duration-200`

### Grid Layouts
- **Attachments**: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`
- **Documents**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2`
- **Form fields**: `grid-cols-1 md:grid-cols-2`

## Component Patterns

### Empty States
Use the `EmptyState` component for consistent empty state styling:
```tsx
<EmptyState
  icon={<YourIcon />}
  title="No data available"
  description="Optional description text"
/>
```

### Loading States
Use the `LoadingState` component for loading indicators:
```tsx
<LoadingState 
  message="Loading data..." 
  size="lg"
/>
```

### Cards
All cards should follow this pattern:
- White background with gray-200 border
- Rounded corners (`rounded-lg`)
- Shadow (`shadow-sm` with `hover:shadow-md`)
- Proper padding based on content density

### Buttons
- Primary actions: Blue color scheme with focus states
- Icon buttons: Proper ARIA labels and keyboard navigation
- Hover and focus states for accessibility

## Accessibility

### Focus Management
- All interactive elements have visible focus indicators
- Keyboard navigation support (Tab, Enter, Space)
- Proper ARIA labels for screen readers

### Color Contrast
- All text meets WCAG AA contrast requirements
- Status indicators use both color and text/icons

### Responsive Design
- Mobile-first approach
- Touch-friendly target sizes (minimum 44px)
- Readable text sizes on all devices