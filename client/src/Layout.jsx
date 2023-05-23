import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
export default function Layout(){
  return(
    <div className="flex flex-col py-4 px-8 min-h-screen">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}


// import React from 'react'
// import Header from './Header'
// import Footer from './Footer'
// import { Helmet } from 'react-helmet'
// import { Toaster } from 'react-hot-toast';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// const Layout = ({children,title, description, keywords, author}) => {
//   return (
//     <div>
//        <Helmet>
//             <meta charSet="utf-8" />
//             <meta name="description" content={description} />
//             <meta name="keywords" content={keywords} />
//             <meta name="author" content={author} />
//             <title>{title}</title>
//         </Helmet>
//       <Header/>
//       <main style={{minHeight:"80vh"}}>
//         <Toaster />
//         {children}
//       </main>
//       <Footer/>
//     </div>
//   )
// }

// Layout.defaultProps = {
//   title: "VRS-Rent Now",
//   description: "Vechile Rental Syste",
//   keywords: "MERN,VRS,Rent your vehicles",
//   author: "Hreeday Mishra"
// }

// export default Layout;