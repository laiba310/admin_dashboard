import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";

// Define types for the order data
interface Product {
  quantity: number;
  product: {
    name: string;
    price: number;
  };
}

interface Order {
  _id: string;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  email: string;
  status: string;
  products: Product[];
}

const DashboardCards = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Order[] = await client.fetch(`
          *[_type == "order"]{
            _id,
            orderNumber,
            orderDate,
            customerName,
            email,
            status,
            products[] {
              quantity,
              product->{
                name,
                price
              }
            }
          }
        `);

        
        setTotalOrders(data.length);

      
        const totalSalesAmount = data.reduce((total, order) => {
          const orderTotal = order.products.reduce(
            (sum, product) => sum + product.quantity * product.product.price,
            0
          );
          return total + orderTotal;
        }, 0);
        setTotalSales(totalSalesAmount);

        // Calculate Cart Items
        const totalCartItems = data.reduce((total, order) => {
          return total + order.products.reduce((sum, product) => sum + product.quantity, 0);
        }, 0);
        setCartItems(totalCartItems);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-6">
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       
        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-medium">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-700">{totalOrders}</p>
        </div>

      
        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-medium">Total Sales</h3>
          <p className="text-3xl font-bold text-gray-700">PKR{totalSales.toFixed(2)}</p>
        </div>

     
        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-medium">Cart Items</h3>
          <p className="text-3xl font-bold text-gray-700">{cartItems}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
