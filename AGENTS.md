# AGENTS.md

## AI Coding Agent Instructions for This React Project

This file provides essential guidance for AI coding agents working in this codebase. It summarizes project conventions, architecture, and known pitfalls to ensure productive and consistent contributions.

---

### 1. **Build & Test Commands**

- **Start**: Use `npm start` (react-scripts, CRA-based)
- **Test**: No test framework configured (do not generate test files unless requested)
- **Build**: Not explicitly defined; assume CRA default

### 2. **Styling Conventions**

- **Mixed styling**: Project uses CSS Modules (`style.css`), CSS-in-JS (`styled-components`), and inline JS style objects (`styles.js`).
- **Preferred**: If adding new styles, prefer `styled-components` for consistency.
- **Known issues**:
  - `Container.styled.js` has an export inside a function (syntax error)
  - `styles.js` uses `fontsize` (should be `fontSize`)
  - `styleButton` is referenced but not defined

### 3. **Component Structure**

- **Component-per-folder**: Each component lives in its own folder with `index.js` and `style.css`.
- **Centralized styles**: `src/components/styles/` exists but is underutilized.
- **Default exports**: All components use default export.
- **Import pattern**: Use explicit paths, e.g., `import Header from "./components/Header/index.js"`

### 4. **Architecture**

- **No routing**: Single-page layout, no React Router.
- **Layout**: Fixed header/footer, main content in `Container`.

### 5. **Known Pitfalls**

- **Styling inconsistency**: Avoid mixing new CSS/JS style patterns.
- **Broken imports**: Check for missing or misspelled imports (e.g., `styleButton`).
- **Syntax errors**: Watch for export placement and property typos.
- **No tests**: Do not assume or generate test files unless requested.

### 6. **Development Environment**

- **No linting/formatting config**: No `.eslintrc`, `.prettierrc`, or similar present.
- **No environment files**: `.env` not present.
- **No .gitignore**: Consider adding if not present.

---

## Useful Links

- [Create React App documentation](https://create-react-app.dev/docs/getting-started/)
- [styled-components documentation](https://styled-components.com/docs)

---

## Updating This File

If you add new conventions, tools, or architectural patterns, update this file to help future AI agents and developers be productive.
