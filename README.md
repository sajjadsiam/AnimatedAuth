# Animated Authentication App 🎨

A beautiful and modern authentication system built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Features stunning animations, smooth transitions, **dark/light mode**, and an incredible user experience.

## ✨ Features

### 🌓 Dark/Light Mode
- **Seamless theme switching** with animated toggle button
- **Persistent theme preference** (saves to localStorage)
- **System preference detection** on first visit
- **Beautiful transitions** between themes
- **Custom color schemes** for each mode
- **Glass-morphism effects** adapted for both themes

### 🎯 Home Page
- Animated gradient background with floating blobs
- Smooth navigation to login/signup pages
- Feature showcase cards
- Responsive design
- Theme toggle in top-right corner

### 🔐 Login Page
- **Glass-morphism design** with backdrop blur effects
- **Social login buttons** (Google, GitHub, Apple) with proper visibility in both themes
- **Show/hide password** toggle with eye icon
- **Remember me** checkbox
- **Forgot password** link (navigates to reset page)
- **Animated loading states** with shimmer effect
- Floating particle effects in the background

### 📝 Signup Page
- **Multi-step form** with progress indicators
- **Real-time password strength meter** (Weak/Fair/Good/Strong)
- **Password match validation** with visual feedback
- **Social signup options** with proper icon visibility
- **Success animation** on account creation
- Step-by-step user guidance
- Smooth transitions between form steps

### 🔑 Forgot Password Page
- **Email-based password reset** flow
- **Animated success state** after submission
- **Clear instructions** for next steps
- **Resend email** functionality
- **Back navigation** to login page
- **Beautiful UI** consistent with app design
- **Loading animations** during submission

## 🚀 Awesome Features

1. **Dark/Light Mode Toggle**
   - Floating toggle button (Sun/Moon icon)
   - Smooth theme transitions
   - LocalStorage persistence
   - System preference detection
   - Custom color palettes for each theme

2. **Framer Motion Animations**
   - Smooth page transitions
   - Hover and tap animations on buttons
   - Floating background elements
   - Rotating icons
   - Scale and fade effects

3. **Glass-morphism UI**
   - Frosted glass effect on cards
   - Backdrop blur filters
   - Semi-transparent backgrounds
   - Modern aesthetic
   - Adapts to current theme

4. **Password Security**
   - Real-time strength indicator
   - Color-coded strength levels
   - Requirements validation
   - Confirmation matching

5. **Responsive Design**
   - Mobile-first approach
   - Adapts to all screen sizes
   - Touch-friendly interfaces

6. **Beautiful Gradients**
   - Dynamic color combinations
   - Smooth gradient transitions
   - Glowing effects
   - Animated background blobs
   - Theme-aware color schemes

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Language:** TypeScript

## 🎨 Color Palette

### Dark Mode (Default)
- **Primary:** Indigo (#6366f1)
- **Secondary:** Purple (#8b5cf6)
- **Accent:** Pink (#ec4899)
- **Background:** Dark gradient (Slate & Purple)
- **Text:** White & Gray shades

### Light Mode
- **Primary:** Indigo (#6366f1)
- **Secondary:** Purple (#8b5cf6)
- **Accent:** Pink (#ec4899)
- **Background:** Light gradient (Blue, Purple & Pink pastels)
- **Text:** Dark gray & Black shades

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   └── ThemeToggle.tsx     # Theme toggle button
│   ├── contexts/
│   │   └── ThemeContext.tsx    # Theme provider & hook
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── signup/
│   │   └── page.tsx            # Signup page
│   ├── forgot-password/
│   │   └── page.tsx            # Forgot password page
│   ├── globals.css             # Global styles (dark/light mode)
│   ├── layout.tsx              # Root layout with ThemeProvider
│   └── page.tsx                # Home page
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎭 Animation Details

- **Float Animation:** Smooth up/down movement (6s duration)
- **Glow Animation:** Pulsing shadow effect (2s duration)
- **Slide-in Animation:** Horizontal entry (0.5s duration)
- **Fade-in Animation:** Opacity transition (0.8s duration)
- **Particle Effects:** Random floating particles
- **Background Blobs:** Rotating and scaling gradients

## 🔧 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
      accent: '#your-color',
    }
  }
}
```

### Adjusting Animations
Modify animation properties in `tailwind.config.js` or component files.

### Changing Default Theme
Edit `app/contexts/ThemeContext.tsx`:
```javascript
const [theme, setTheme] = useState<Theme>('light') // Change 'dark' to 'light'
```

## 📝 TODO / Future Enhancements

- [x] Dark/Light mode toggle
- [x] Forgot password page
- [ ] Email verification flow
- [ ] OAuth integration (Google, GitHub, Apple)
- [ ] Password reset functionality (backend)
- [ ] Two-factor authentication
- [ ] User profile page
- [ ] Backend integration (API routes)
- [ ] Database connection (MongoDB/PostgreSQL)
- [ ] Session management
- [ ] Form validation with Zod
- [ ] Error handling and toast notifications
- [ ] Custom theme colors selector

## 🤝 Contributing

Feel free to contribute to this project! Fork it, make your changes, and submit a pull request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🌟 Show Your Support

If you like this project, please give it a ⭐️!

---

**Built with ❤️ using Next.js and Tailwind CSS**
