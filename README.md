# MediNova Pharmacy

A modern, responsive pharmacy e-commerce website built with React + Vite, React Router, and
React Icons. Built as a portfolio-ready BCA final-year project.

## 1. Folder structure

```
medinova/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/                 (empty — see "Adding your own images" below)
│   ├── components/
│   │   ├── Navbar.jsx / .css
│   │   ├── Footer.jsx / .css
│   │   ├── Hero.jsx / .css
│   │   ├── CategoryCard.jsx / .css
│   │   ├── ProductCard.jsx / .css
│   │   ├── WhyChooseUs.jsx / .css
│   │   ├── HowItWorks.jsx / .css     (extra section supporting the "How It Works" requirement)
│   │   ├── Testimonials.jsx / .css
│   │   ├── Loader.jsx / .css
│   │   └── ScrollToTop.jsx           (scrolls to top on every route change)
│   ├── pages/
│   │   ├── Home.jsx / .css
│   │   ├── Medicines.jsx / .css
│   │   ├── Categories.jsx / .css
│   │   ├── ProductDetails.jsx / .css
│   │   ├── Cart.jsx / .css
│   │   ├── About.jsx / .css
│   │   ├── Contact.jsx / .css
│   │   ├── Login.jsx, Register.jsx / Auth.css (shared styles)
│   │   └── NotFound.jsx / .css
│   ├── context/
│   │   ├── CartContext.jsx     (global cart state + localStorage)
│   │   └── AuthContext.jsx     (register/login/logout + localStorage)
│   ├── data/
│   │   ├── products.js         (8 sample products)
│   │   ├── categories.js       (8 categories)
│   │   └── testimonials.js
│   ├── hooks/
│   │   └── useReveal.js        (scroll-triggered fade-in animation)
│   ├── App.jsx                 (routes)
│   ├── main.jsx                (entry point, wraps App in providers)
│   └── index.css               (design tokens + shared utility classes)
├── index.html
├── package.json
└── vite.config.js
```

## 2. Installation

```bash
npm install
```

This installs `react`, `react-dom`, `react-router-dom`, `react-icons`, and Vite.

## 3. Running the project

```bash
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## 4. Production build

```bash
npm run build     # outputs to dist/
npm run preview   # serves the production build locally so you can test it
```

## 5. Adding your own images

All product, hero, and testimonial images currently use placeholder URLs from Unsplash so the
site works out of the box. To use your own:

1. Drop your image files into `src/assets/` (e.g. `src/assets/dolo650.jpg`).
2. Import it at the top of the relevant file: `import dolo from "../assets/dolo650.jpg";`
3. Replace the placeholder URL string with `{dolo}` — for example, in `src/data/products.js`
   the `image` field can be a variable instead of a URL string (change the file from a plain
   array export to import images individually and reference them there).
4. For the hero image, edit `src/components/Hero.jsx`. For testimonials, edit
   `src/data/testimonials.js`.

## 6. How React Router works in this project

`main.jsx` wraps the whole app in `<BrowserRouter>`. `App.jsx` defines all routes inside
`<Routes>`:

| Path | Page |
|---|---|
| `/` | Home |
| `/medicines` | Medicines (full catalog + search/filter) |
| `/categories` | Categories |
| `/product/:id` | Product Details — `:id` is read with `useParams()` |
| `/cart` | Cart |
| `/about` | About Us |
| `/contact` | Contact |
| `/login` | Login |
| `/register` | Register |
| `*` | 404 Not Found (catches any unmatched route) |

Navigation uses `<Link>` (Navbar, Footer, cards) instead of `<a>` tags so the page never fully
reloads. `ScrollToTop.jsx` uses `useLocation()` to detect route changes and scroll back to the
top of the page each time. The Medicines page also reads/writes the URL's query string with
`useSearchParams()`, so links like `/medicines?category=vitamins` or a navbar search land
directly on a filtered view.

## 7. How LocalStorage is used

**Cart (`src/context/CartContext.jsx`)**
- Cart state lives in React Context so any component (Navbar badge, ProductCard, Cart page) can
  read/update it without prop-drilling.
- On load, it reads `localStorage.getItem("medinova_cart")` to restore the cart.
- A `useEffect` watches the cart array and writes it back to `localStorage` on every change —
  so refreshing the page never loses the cart.

**Auth (`src/context/AuthContext.jsx`)**
- `register()` saves new users to a `medinova_users` array in `localStorage` (this is a demo
  project, so passwords are stored in plain text for simplicity — **do not do this in a real
  production app**; use a real backend with hashed passwords instead).
- `login()` checks the entered email/password against that array.
- If "Remember me" is checked, the logged-in session is saved to `localStorage` (persists after
  closing the browser). If unchecked, it's saved to `sessionStorage` instead (cleared when the
  tab closes).
- `logout()` clears both storages.

## 8. How the product search/filter works

In `src/pages/Medicines.jsx`:
- The search input and category chips both write to the URL via `useSearchParams()`.
- `products.filter(p => ...)` runs on every render, checking:
  - `p.name.toLowerCase().includes(query.toLowerCase())` for the search term
  - `p.category === selectedCategory` for the category filter (or shows all if "All" is selected)
- If the filtered array is empty, the page renders the "No products found" empty state instead
  of the product grid.
- The Navbar's search box and category links (from Home/Categories pages) also write to the same
  URL params, so search works consistently from anywhere in the app.

## 9. Notes on this build

- Cart checkout is simulated (no real payment gateway) — it clears the cart and shows a success
  message. Wire up a real payment provider (Razorpay, Stripe, etc.) before using this in
  production.
- The Contact form only validates and shows a success message locally — connect it to a real
  backend or service (Formspree, EmailJS, etc.) to actually receive messages.
- `Login`/`Register` are for demo/portfolio purposes only (localStorage-based, no real backend
  or password hashing).
- Run `npm run build` then check Lighthouse (Chrome DevTools) before considering this
  deployment-ready for a live audience.

## 10. Deployment (Vercel or Netlify)

**Vercel:** push to GitHub → vercel.com → Add New → Project → import repo → Vercel
auto-detects Vite → Deploy.

**Netlify:** push to GitHub → netlify.com → Add New Site → Import from Git → select repo →
Build command `npm run build`, publish directory `dist` → Deploy Site.
