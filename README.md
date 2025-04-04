# 💸 Wallet Dashboard

A modern and responsive wallet dashboard built with **Vue 3**, **Vite**, and **Tailwind CSS**, supporting a fully themed dark UI and mobile-friendly design. Includes transaction tracking, deposit/withdraw modals, and mock API integration.

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## 🚀 Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## 🧠 Implementation & Design Notes

---

### ⚙️ Technologies Used

- **Vue 3 (Composition API)**
- **Vite** – Instant development server with hot module replacement (HMR)
- **Tailwind CSS** – Utility-first CSS framework for rapid styling
- **Vue Router** – For routing and view management

---

### 🎨 UI / UX

- **Dark Theme by Default:**  
  All UI elements use a consistent dark color scheme using Tailwind classes like `bg-gray-800/900`, `text-gray-100`, etc.

- **Indigo Accent:**  
  Primary CTA buttons and highlights use `indigo` to preserve brand consistency and visual hierarchy.

- **Mobile-Friendly Tables:**  
  All tables are wrapped in `overflow-auto` containers to ensure horizontal scrolling on smaller screens.

- **Smooth Transitions:**  
  Modals use Vue’s `<transition>` component with `fade` and `scale` effects for smooth appearance and exit animations.

- **Accessibility & Focus:**  
  All interactive elements (buttons, inputs) are keyboard accessible with focus outlines and ring effects.

---

### 📦 Component Highlights

- **`DepositModal.vue` & `WithdrawModal.vue`**
  - Includes client-side validation
  - Simulated form submission delay
  - Transition animations: `fade` for backdrop, `scale` for modal
  - Emits `close` event on success or cancel

- **`TransactionList.vue`**
  - Displays a sortable, styled transaction table
  - Includes skeleton loader while fetching data
  - Sorts by column with ascending/descending toggle
  - Status badges for success/failure

- **`WalletCard.vue`**
  - Displays current wallet balance and currency
  - Includes Deposit and Withdraw action buttons that open modals
