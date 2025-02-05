import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js'

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface MonthlySalesChartProps {
  salesData: number[] // Define the type for salesData prop
}

const MonthlySalesChart: React.FC<MonthlySalesChartProps> = ({ salesData }) => {
  // Monthly sales data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Month labels
    datasets: [
      {
        label: 'Monthly Sales',
        data: salesData, // Use the passed salesData prop
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as 'top' | 'left' | 'right' | 'bottom' | 'center',  // Corrected type for position
        labels: {
          boxWidth: 20,  // Optional: Adjust size of legend boxes
          padding: 15    // Optional: Adjust padding around legend text
        }
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'line'>) {
            return 'Sales: $' + tooltipItem.raw;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return <Line data={data} options={options} className="h-36 sm:h-52 md:h-96 lg:h-356" />;
}

export default MonthlySalesChart
