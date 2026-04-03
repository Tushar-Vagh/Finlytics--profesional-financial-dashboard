# 💰 Finlytics Dashboard

## 🌐 Live Demo
🔗 https://finlytics-profesional-financial.vercel.app/

A clean and interactive **Finance Dashboard** built using React to help users track financial activity, analyze spending patterns, and gain meaningful insights.

---

## 🚀 Features

### 📊 Dashboard Overview

* Summary cards for **Total Balance**, **Income**, and **Expenses**
* Time-based chart for income vs expenses trends
* Category-based chart for spending breakdown

### 📋 Transactions Management

* View transactions with:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)
* 🔍 Search functionality
* 🎯 Filtering (type, category, date range)
* ↕ Sorting (date, amount)
* 🎨 Color indicators (green = income, red = expense)

### 👥 Role-Based UI

* Switch between **Viewer** and **Admin**
* Viewer: Read-only access
* Admin: Add, edit, delete transactions
* Conditional rendering based on role

### 💡 Insights

* Highest spending category
* Monthly comparison
* Smart observations from data

---

## ⭐ Advanced Features

* 🌙 Dark Mode with persistent theme
* 💾 Data persistence using localStorage
* 🔄 Mock API simulation for async data handling
* ✨ Smooth animations and transitions
* 📤 Export transactions (CSV / JSON)
* 🔍 Advanced filtering and grouping

---

## 🧠 Tech Stack

* **Frontend**: React (Hooks + Functional Components)
* **State Management**: Context API
* **Charts**: Recharts / Chart.js
* **Styling**: CSS / Tailwind
* **Animations**: Framer Motion (optional)
* **Build Tool**: Vite

---

## 📁 Project Structure

```bash
src/
├── assets/                 # Static assets
├── components/             # Reusable UI components
│   ├── Chart.jsx
│   ├── DateRangePicker.jsx
│   ├── Dropdown.jsx
│   ├── FilterBar.jsx
│   ├── InsightCard.jsx
│   ├── Navbar.jsx
│   ├── RoleSwitcher.jsx
│   ├── Sidebar.jsx
│   ├── SummaryCard.jsx
│   ├── ThemeToggle.jsx
│   ├── TransactionForm.jsx
│   └── TransactionTable.jsx
│
├── context/                # Global state management
│   └── AppContext.jsx
│
├── data/                   # Mock data
│   └── mockData.js
│
├── pages/                  # Main pages
│   ├── Dashboard.jsx
│   ├── Insights.jsx
│   └── Transactions.jsx
│
├── utils/                  # Helper functions & API logic
│   ├── api.js
│   └── helpers.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Tushar-Vagh/Finlytics--profesional-financial-dashboard.git
```

2. Navigate to project folder:

```bash
cd Finlytics--profesional-financial-dashboard
```

3. Install dependencies:

```bash
npm install
```

4. Run the application:

```bash
npm run dev
```

---

## 📱 UI/UX Highlights

* Clean and minimal design
* Fully responsive (mobile, tablet, desktop)
* Smooth transitions and hover effects
* Proper empty state handling

---

## 🎯 Purpose

This project demonstrates:

* Component-based architecture
* State management using Context API
* Role-based UI implementation
* Data visualization techniques
* Clean and scalable frontend structure

---

## 📌 Future Enhancements

* Backend integration (.NET / Node.js)
* Authentication and real RBAC
* Real-time updates
* Advanced analytics dashboard

---

## 👨‍💻 Author

**Tushar Vagh**

---

## ⭐ Support

If you like this project, consider giving it a star ⭐
