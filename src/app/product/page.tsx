"use client"

import Header from "@/app/component/header"
import { client } from "@/sanity/lib/client"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  image?: { asset: { url: string } }
  category: string
  discountPercent?: number
  new: boolean
  colors: string[]
  sizes: string[]
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async () => {
    try {
      const data = await client.fetch(`*[_type == "product"]{
        _id, name, price, description, image{asset->{url}}, category, discountPercent, new, colors, sizes
      }`)
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  useEffect(() => {
    fetchProducts()
    
    // Real-time listener for Sanity changes
    const subscription = client.listen(`*[_type == "product"]`).subscribe(() => {
      fetchProducts()
    })

    return () => subscription.unsubscribe()
  }, [])

  const editProduct = async (id: string) => {
    try {
      await client.patch(id).set({ price: 200 }).commit()
    } catch (error) {
      console.error("Error editing product:", error)
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      await client.delete(id)
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <div className="flex min-h-screen">
      <Header />
      <div className="flex-1 p-4 sm:p-6">
        <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">Product List</h1>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <Table className="w-full min-w-[600px]">
            <TableCaption>A list of your products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={product.image?.asset.url || "/placeholder.svg"}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell className="hidden sm:table-cell">{product.category}</TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    <Button onClick={() => editProduct(product._id)} variant="outline" className="text-xs sm:text-sm">
                      Edit
                    </Button>
                    <Button onClick={() => deleteProduct(product._id)} variant="destructive" className="text-xs sm:text-sm">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Product
