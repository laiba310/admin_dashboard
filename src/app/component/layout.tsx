
import { Sidebar } from "@/components/ui/sidebar"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default Layout
