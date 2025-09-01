# Kabel Hack (CarMarket Admin Website)

# 🚗 Car Market Admin Dashboard  

An **Admin Dashboard** for managing and analyzing car market data. The application provides insights into **Business KPIs, Car Pricing, and Financials** through interactive charts and dashboards. Built with **React**, **Next.js**, and **MongoDB**, and powered by the **Nivo** charting library.  

---

## 📊 Features  
- **Business KPI Dashboard** – view sales trends, cash cycles, and days-to-sell insights.  
- **Car Pricing Dashboard** – compare predicted vs actual prices, demand by region, and pricing distribution.  
- **Financial Dashboard** – track gross margin, acquisition vs resale costs, and revenue performance.  
- Interactive charts and graphs with **Nivo**.  
- Secure data storage and retrieval with **MongoDB Atlas**.  

---

## 🛠️ Tech Stack  
- **Frontend:** React with Nivo for data visualization.  
- **Backend:** Next.js (API routes + server logic).  
- **Database:** MongoDB Atlas (NoSQL cloud database).  
- **Deployment Platforms:**  
  - Frontend – Vercel / Netlify  
  - Backend – Render / Heroku  
  - Database – MongoDB Atlas  

---

## 🏗️ System Architecture  
The system follows a three-tier architecture:  

- **React Frontend** – Provides dashboards and user interface.  
- **Next.js Backend** – Handles API requests and business logic.  
- **MongoDB Database** – Stores all application data.  

**Flow:**  

---

## ⚙️ Setup & Installation  


---

## ⚙️ Setup & Installation  

### 1. Clone the repository  
```bash
git clone <repo-url>
cd car-market-admin
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/CarFinanceDB
PORT=3000
```

### 4. Run the development server
```bash
npm run dev
```

## 📂 Database Structure
- Database: CarFinanceDB
- cars – Car models and dealers.
- cashCycle – Business cash cycle data.
- daysToSell – Time required to sell cars.
- grossMargin – Financial margin data.
- heatmapData – Regional demand insights.
- pricing – Predicted vs actual car prices.
- revenue – Revenue records.


