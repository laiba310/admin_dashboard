"use client"

import { client } from "@/sanity/lib/client"
import { useState, useEffect } from "react"
import Header from "@/app/component/header"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define types for product and order
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

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([])

  // Fetch Orders from Sanity
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
        }`)
      setOrders(data)
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">Orders</h1>
        
        {/* Orders Table */}
        <div className="overflow-x-auto mt-6">
          <Table>
            <TableCaption>A list of your recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    {order.products.map((product, index) => (
                      <div key={index} className="mb-1">
                        <span>
                          {product.quantity} x {product.product.name}
                        </span>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    $
                    {order.products
                      .reduce((total, product) => total + product.product.price * product.quantity, 0)
                      .toFixed(2)}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Order
