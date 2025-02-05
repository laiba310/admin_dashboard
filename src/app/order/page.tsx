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
    <div className="flex min-h-screen">
        <Header />

     
      <div className="flex-1 p-4 sm:p-6">
        <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 mt-12 text-gray-800">Orders</h1>

        
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[600px]">
            <TableCaption>A list of your recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="hidden sm:table-cell">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="text-sm">{order.orderNumber}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm">{order.customerName}</TableCell>
                  <TableCell className="text-sm">
                    {order.products.map((product, index) => (
                      <div key={index} className="mb-1">
                        <span>
                          {product.quantity} x {product.product.name}
                        </span>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    $
                    {order.products
                      .reduce((total, product) => total + product.product.price * product.quantity, 0)
                      .toFixed(2)}
                  </TableCell>
                  <TableCell className="text-sm">{order.status}</TableCell>
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
