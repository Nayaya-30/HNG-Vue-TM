# TicketFlow - Vue Implementation

A robust ticket management system built with Vue.js 3, featuring real-time updates and a responsive interface.

## ⚡ Tech Stack

### Vue Version

-   **Framework:** Vue.js 3 with Composition API
-   **Build System:** Vite
-   **State Management:** Pinia
-   **UI Styling:** Tailwind CSS
-   **Type Safety:** TypeScript
-   **Form Management:** VeeValidate
-   **Routing:** Vue Router 4
-   **HTTP Client:** Axios
-   **Dark Mode:** Tailwind with Vue reactivity

## 🔄 Alternative Implementations

This application is available in three flavors:

### 1. Vue Version (Current)

```bash
cd Vue-app
npm install
npm run dev
```

### 2. React Version

```bash
cd app
npm install
npm run dev
```

### 3. Twig Version

```bash
cd twig-app
composer install
npm install
npm run build:css
php -S localhost:8000 -t public
```

## 🧱 Components & Architecture

### Core Components

-   `AuthStore` - Pinia store for authentication state
-   `TicketService` - Composable for ticket operations
-   `useLoading` - Loading state composable
-   `useValidation` - Form validation composable

### Vue Features

1. **Authentication**

    - Composable-based auth logic
    - Route guards
    - Token management
    - Session persistence

2. **Dashboard View**

    - Statistics components
    - Activity timeline
    - Performance charts
    - Reactive data updates

3. **Ticket Management**

    - CRUD operations
    - Status management
    - Priority handling
    - Search functionality
    - Responsive grid layout

4. **Theme System**
    - Dark/Light mode toggle
    - System preference sync
    - Dynamic theme switching

## 📦 Store Structure

```typescript
// Pinia Store Types
interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	token: string | null;
}

interface TicketState {
	tickets: Ticket[];
	isLoading: boolean;
	error: Error | null;
	filters: {
		status: string[];
		priority: string[];
		searchQuery: string;
	};
}

interface ThemeState {
	darkMode: boolean;
}
```

## ♿ Accessibility Features

-   Vue ARIA integration
-   Keyboard navigation
-   Focus management
-   High contrast support
-   Screen reader optimizations
-   WCAG 2.1 compliance

## 🔑 Demo Access

```
Email: demo@ticketapp.com
Password: demo123
```

## 🚀 Getting Started

1. **System Requirements**

    - Node.js 16+
    - npm/yarn
    - Modern browser

2. **Project Setup**

    ```bash
    git clone <repository-url>
    cd Vue-app
    npm install
    ```

3. **Development Mode**

    ```bash
    npm run dev
    # Server starts at http://localhost:5173
    ```

4. **Production Build**
    ```bash
    npm run build
    npm run preview
    ```

## ⚙️ Configuration

Environment Variables (.env):

```
VITE_API_ENDPOINT=http://localhost:3000
VITE_AUTH_KEY=ticketflow_token
```

## 🐞 Known Issues

1. State rehydration delay

    - Fix: Implementing persistent store plugin

2. Route transition glitch

    - Workaround: Using v-show for modal components

3. Mobile menu interaction delay
    - Solution pending: Performance optimization

## 📜 Available Commands

-   `npm run dev` - Development server
-   `npm run build` - Production build
-   `npm run preview` - Preview build
-   `npm run lint` - ESLint check
-   `npm run format` - Prettier formatting
-   `npm run test:unit` - Unit tests
-   `npm run test:e2e` - E2E tests

## 🔒 Security Implementation

-   Route authentication guards
-   XSS prevention
-   CSRF protection
-   Secure cookie handling
-   Input sanitization
-   Token refresh mechanism

## 📱 Responsive Implementation

-   Mobile-first design
-   Flex/Grid layouts
-   Breakpoints:
    ```css
    sm: 640px
    md: 768px
    lg: 1024px
    xl: 1280px
    2xl: 1536px
    ```

## 🌐 Browser Support

-   Chrome/Edge (latest)
-   Firefox (latest)
-   Safari 14+
-   Mobile browsers

## 🤝 Contribution Guide

1. Fork repository
2. Create feature branch
3. Implement changes
4. Write tests
5. Submit pull request

## 📄 License

MIT License - See LICENSE file

## 🙏 Acknowledgments

-   Vue.js team
-   Tailwind CSS
-   Vite
-   Open source community
