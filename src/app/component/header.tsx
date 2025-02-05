"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingBag, ClipboardList, Users, Grid, Settings, HelpCircle } from "lucide-react"
import Link from "next/link"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) 
      setIsOpen(window.innerWidth >= 768) 
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen) 
    }
  }

  return (
    <div className="flex">
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="p-2 bg-white text-gray-800 rounded-md shadow-lg z-20 absolute top-5 left-5"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "fixed left-0 top-0" : "sticky top-0"} w-64 bg-white text-gray-800 min-h-screen p-5 shadow-lg transition-transform duration-300 ease-in-out z-10`}
      >
    <Link href={"/admin/dashboard"}>
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">MarketPlace</h2>
        </Link>
        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-2">
            {[
              { href: "/product", label: "Products", icon: <ShoppingBag size={20} /> },
              { href: "/order", label: "Orders", icon: <ClipboardList size={20} /> },
              { href: "/customer", label: "Customers", icon: <Users size={20} /> },
              { href: "/newproductt", label: "Add New Product", icon: <Grid size={20} /> },
              { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
              { href: "/help", label: "Help", icon: <HelpCircle size={20} /> },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-indigo-50 hover:text-indigo-600 group"
                >
                  <span className="mr-3 text-gray-400 group-hover:text-indigo-600">{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
