# React Patterns Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_NAME/deploys)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)
![React](https://img.shields.io/badge/React-19.2.5-blue)
![Node.js](https://img.shields.io/badge/Node.js-v24.x-green)

**🔗 Live Site:** https://abed33mohsen.github.io/react-patterns-demo

---

## 📚 About (العربية)

هذا المشروع هو مجموعة شاملة من أمثلة وأنماط React التي توضح أفضل الممارسات وحالات الاستخدام الشائعة:

- ✅ **مكونات معاد استخدامها** – Card، Table، ToastMessage
- 🔐 **المصادقة والحماية** – LoginPage و ProtectedRoute
- 🎯 **إدارة الحالة** – Context API و Hooks المخصصة
- 📊 **إدارة البيانات** – Counters، Posts، Todos
- 🛣️ **التوجيه** – React Router integration
- 🎨 **أنماط التصميم** – Tailwind CSS، styled-components، CSS Modules

---

## 📚 About (English)

A comprehensive collection of React patterns and examples demonstrating best practices and common use cases:

- ✅ **Reusable Components** – Card, Table, ToastMessage
- 🔐 **Authentication & Security** – LoginPage and ProtectedRoute
- 🎯 **State Management** – Context API and custom Hooks
- 📊 **Data Management** – Counters, Posts, Todos
- 🛣️ **Routing** – React Router integration
- 🎨 **Design Patterns** – Tailwind CSS, styled-components, CSS Modules

---

## 🚀 Getting Started

### Prerequisites
- Node.js v24.x or higher
- npm v10.x or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abed33mohsen/react-patterns-demo.git
cd react-patterns-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

---

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Card/
│   ├── Header/
│   ├── Footer/
│   ├── LoginPage/
│   ├── HomePage/
│   └── ...
├── context/          # Global state (Context API)
│   ├── AuthContext.jsx
│   ├── UserContext.jsx
│   └── ...
├── hooks/            # Custom React hooks
├── router/           # Routing configuration
├── mock/             # Mock data for testing
├── App.js            # Main app component
└── index.js          # Entry point
```

---

## 🎯 Key Features

### 1. **Component Patterns**
- Functional components with hooks
- Component composition
- Prop drilling and Context API usage

### 2. **State Management**
- Redux patterns with Context API
- Custom hooks for state logic
- Global UI settings context

### 3. **Routing**
- Multi-page routing with React Router
- Protected routes with authentication
- Nested routing examples

### 4. **Form Handling**
- Controlled components
- Form validation
- Modal dialogs for editing

### 5. **Data Fetching**
- Mock API patterns
- Async state management
- Error handling

---

## 🔧 Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^19.2.5 | UI Library |
| React Router | ^7.15.1 | Client-side routing |
| styled-components | ^6.4.1 | CSS-in-JS styling |
| Tailwind CSS | ^3.x | Utility-first CSS |
| Create React App | ^5.0.1 | Build tooling |

---

## 📦 Scripts

```bash
npm start          # Start development server
npm run build      # Create production build
npm run deploy     # Deploy to GitHub Pages
npm run eject      # (Advanced) Eject from Create React App
```

---

## 🚀 Deployment

### GitHub Pages

This project is automatically deployed to [GitHub Pages](https://abed33mohsen.github.io/react-patterns-demo) on every push to the `master` branch.

```bash
# Deploy manually:
npm run deploy
```

### Netlify (Optional)

To deploy to Netlify instead:

1. Connect your GitHub repository to [Netlify](https://netlify.com)
2. Set build command: `npm run build`
3. Set publish directory: `build`

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Abed Mohsen**  
GitHub: [@abed33mohsen](https://github.com/abed33mohsen)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📞 Support

For questions or issues, please open an [issue on GitHub](https://github.com/abed33mohsen/react-patterns-demo/issues).

---

**Last Updated:** 2026-06-14
