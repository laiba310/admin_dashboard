"use client";

import DashboardCards from "@/app/component/cards";
import Header from "@/app/component/header";
import SalesByCategoryChart from "@/app/component/salebycategory";
import OrderGraph from "@/app/order/monthysale";
import React from "react";

const AdminDashboard: React.FC = () => {
  // Sample sales by category data (replace with actual data)
  const salesByCategoryData = {
    categories: ['T-shirts', 'Shirts', 'Hoodie', 'Jeans', 'Shorts'],  // Sample categories
    sales: [12000, 8500, 9500, 5000, 1000]  // Corresponding sales data for each category
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-6 text-gray-800 mt-9">Dashboard</h1>

        {/* Cards Section */}
        <DashboardCards />

        {/* Monthly Sales Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-medium mb-6">Monthly Sales</h3>
          <OrderGraph />
        </div>

        {/* Sales by Category Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-medium mb-6">Sales by Category</h3>
          <SalesByCategoryChart 
            categories={salesByCategoryData.categories} 
            sales={salesByCategoryData.sales} 
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
