import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { client } from "@/sanity/lib/client";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Product {
  product: {
    name: string
    price: number
  }
  quantity: number
}

interface Order {
  _id: string
  orderDate: string
  customerName: string
  orderNumber: string
  email: string
  status: string
  products: Product[]
}

const OrderGraph = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  
  const fetchOrders = async () => {
    try {
      const data = await client.fetch(`
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
        }`);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Calculate Monthly Sales
  const calculateMonthlySales = (orders: Order[]) => {
    const salesByMonth = Array(12).fill(0); // Initialize array for 12 months

    orders.forEach(order => {
      const orderMonth = new Date(order.orderDate).getMonth(); // Get month (0-11)
      const orderTotal = order.products.reduce(
        (total, product) => total + product.product.price * product.quantity,
        0
      );
      salesByMonth[orderMonth] += orderTotal; // Add to corresponding month
    });

    return salesByMonth;
  };

  const sales = calculateMonthlySales(orders);

  // Chart.js Data for Monthly Sales (Line Chart)
  const chartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Sales by Month ($)',
        data: sales,
        fill: false, // No fill under the line
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        tension: 0.1, // Smooth the line
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h2>Monthly Sales (Line Graph)</h2>
      <Line data={chartData} className="h-56 sm:h-72 md:h-96 lg:h-356" />
    </div>
  );
};

export default OrderGraph;
