import { Outlet } from "react-router-dom"
import Header from "./Header"
export default function Layout(){
  return(
    <div className="flex flex-col py-4 px-8 min-h-screen">
      <Header/>
      <Outlet/>
    </div>
  )
}