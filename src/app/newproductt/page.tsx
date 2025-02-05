"use client";
import { client } from "@/sanity/lib/client";
import React, { useState } from "react";
import Header from "../component/header";

const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Toggle for alert

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload the image to Sanity first
      let imageUrl = "";
      if (image) {
        const imageData = await client.assets.upload("image", image, {
          filename: image.name,
        });
        imageUrl = imageData.url;
      }

      // Save product data to Sanity
      await client.create({
        _type: "product",
        name,
        price: parseFloat(price),
        description,
        discount: parseFloat(discount),
        colors,
        sizes,
        image: imageUrl,
      });

      setShowAlert(true); // Show alert on success
      setTimeout(() => {
        setShowAlert(false); // Auto-hide after 3 seconds
      }, 3000);

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setDiscount("");
      setColors([]);
      setSizes([]);
      setImage(null);
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleColorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColors(e.target.value.split(",").map((color) => color.trim()));
  };

  const handleSizesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizes(e.target.value.split(",").map((size) => size.trim()));
  };

  return (
    <>
      <div className="flex min-h-screen">
        <Header />
        <div className="flex-1 p-5 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4 mt-12">Add New Product</h1>

          {showAlert && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
              Product added successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
           
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter product name"
                required
              />
            </div>

       
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter price"
                required
              />
            </div>


            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter product description"
                required
              ></textarea>
            </div>

          
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Discount Percent</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter discount percentage"
              />
            </div>

         
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Colors</label>
              <input
                type="text"
                value={colors.join(", ")}
                onChange={handleColorsChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter colors separated by commas (e.g., Red, Blue, Green)"
              />
            </div>

           
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Sizes</label>
              <input
                type="text"
                value={sizes.join(", ")}
                onChange={handleSizesChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter sizes separated by commas (e.g., S, M, L, XL)"
              />
            </div>

           
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border rounded"
              />
              {image && <p className="mt-2 text-sm text-gray-500">Selected: {image.name}</p>}
            </div>

           
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isLoading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
