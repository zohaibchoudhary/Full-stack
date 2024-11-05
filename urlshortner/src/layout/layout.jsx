import React from 'react'
import { Outlet } from "react-router-dom"
import {
  Header,
  Footer
} from "@/components"

export default function Layout() {
  return (
    <div>
    <Header />
    <Outlet />
    <Footer />  
    </div>
  )
}


