import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface SalesByCategoryChartProps {
  categories: string[];
  sales: number[];
}

const SalesByCategoryChart: React.FC<SalesByCategoryChartProps> = ({ categories, sales }) => {

  const data = {
    labels: categories, 
    datasets: [
      {
        label: 'Sales by Category',
        data: sales,
        backgroundColor: 'rgba(75, 192, 192, 0.5)', 
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as 'top' | 'left' | 'right' | 'bottom' | 'center', // Legend position
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: { raw: unknown }) {
            const salesAmount = typeof tooltipItem.raw === 'number' ? tooltipItem.raw : 0;
            return 'Sales: $' + salesAmount.toFixed(2); 
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

  return <Bar data={data} options={options} />
}

export default SalesByCategoryChart
