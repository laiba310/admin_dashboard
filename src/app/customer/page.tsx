"use client"

import { useState, useEffect } from "react"
import { client } from "@/sanity/lib/client"
import Header from "@/app/component/header"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Order {
  _id: string
  customerName: string
  email: string
  stripeCustomerId: string
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([])

  // Fetch Orders from Sanity
  const fetchOrders = async () => {
    try {
      const data = await client.fetch(`
        *[_type == "order"]{
          _id,
          customerName,
          email,
          stripeCustomerId
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
    {/* Sidebar */}
    <Header />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 w-full">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-800 mt-14">Customers</h1>

        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableCaption>A list of your customers.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Stripe Customer Id</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.stripeCustomerId}</TableCell>
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
