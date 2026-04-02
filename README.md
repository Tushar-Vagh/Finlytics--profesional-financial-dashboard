# Finlytics: Professional Financial Dashboard

## Overview
Finlytics is a high-performance, modern financial management dashboard designed to provide users with deep insights into their financial health. The application focuses on data visualization, transaction management, and automated financial analysis. It features a sleek, premium interface with full dark and light mode support, ensuring a superior user experience across all devices.

## Key Features
- **Comprehensive Financial Dashboard**: Real-time overview of total balance, monthly income, and expenditures with dynamic trend indicators.
- **Advanced Transaction Management**: Full CRUD capabilities for financial records, including category classification, transaction type (Income/Expense), and sophisticated filtering.
- **Data Visualization**: Interactive charts for income vs. expense comparison and category-wise spending distribution using high-fidelity visualization libraries.
- **Intelligent Financial Insights**: Automated generation of financial advice based on spending patterns, including budget alerts and savings opportunities.
- **Multimodal Role Support**: Integrated Role Switcher to toggle between Administrative and Viewer perspectives, adjusting UI capabilities dynamically.
- **Adaptive Precision Layout**: Fully responsive architecture optimized for desktop, tablet, and mobile browsers, featuring specialized mobile grid layouts and navigation.
- **Dynamic Theming**: Seamless transition between sophisticated Dark and Light themes with persistent state management.

## Technical Architecture
The application is built using a modern, component-based architecture focusing on state performance and visual consistency.

### Core Technologies
- **React 19**: Leveraging the latest React features for efficient UI rendering and state management.
- **Vite**: Utilized as the build tool for near-instantaneous development and optimized production bundles.
- **Framer Motion**: Powering premium micro-interactions, smooth transitions, and high-performance UI animations.
- **Lucide React**: Providing a consistent, professional iconography system.
- **Recharts**: Implementing responsive, accessible data visualizations.
- **Vanilla CSS (Variables & Tokens)**: A robust design system built on CSS variables for consistent theming and rapid layout adjustments without the overhead of utility frameworks.

### Design Approach
The design philosophy centers on "Glassmorphism" and modern "Neo-UI" principles:
- **Design Tokens**: Centralized variables for colors, spacing, shadows, and transitions.
- **Layout Hardening**: Implementation of strict viewport containment to prevent horizontal overflow and ensure stability on specialized mobile devices.
- **Component-First Logic**: Reusable, atomic components for dropdowns, date pickers, and tables to maintain a unified aesthetic.

## Installation and Setup

### Prerequisites
- Node.js (Version 18 or higher)
- npm or yarn

### Local Development Setup
1. Clone the repository to your local machine.
2. Navigate to the project directory:
   ```bash
   cd Finlytics
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the application in your browser at the local port provided in the terminal output.

## Deployment
The application is optimized for deployment on the Vercel platform:
1. Push your changes to a remote repository (GitHub/GitLab/Bitbucket).
2. Connect your repository to Vercel.
3. Vercel will automatically detect the Vite configuration and apply the recommended build settings.
4. Set the Build Command to `npm run build` and the Output Directory to `dist`.

## Project Structure
- `/src/components`: Reusable UI components and complex interactive elements.
- `/src/pages`: Top-level page views (Dashboard, Transactions, Insights).
- `/src/context`: Application context for theme, navigation, and role state management.
- `/src/assets`: Static assets and media files.
- `/src/index.css`: Primary stylesheet containing the global design system and styling tokens.
