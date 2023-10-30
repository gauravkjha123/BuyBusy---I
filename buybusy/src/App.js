import React from 'react';
import AuthProvider from "./authContext";
import ProductProvider from './productContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/Home";
import { SignIn } from "./components/signin/signIn";
import { SignUp } from "./components/signUp/signUp";
import { ItemDetails } from "./pages/ItemDetails"
import { ProtectedRoute } from "./utils/protectedRoute";
import { ToastContainer } from 'react-toastify';
import { IsloggedIn } from './utils/loginStatus';
import 'react-toastify/dist/ReactToastify.css';
import "./styles.css";



export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        { path: "/cart",element:<ProtectedRoute><ItemDetails/> </ProtectedRoute>  },
        { path: "/order",element:<ProtectedRoute> <ItemDetails/> </ProtectedRoute> },
        { path: "/signUp",element:<IsloggedIn> <SignUp/>  </IsloggedIn>},
        { path: "/signIn",element: <IsloggedIn> <SignIn/> </IsloggedIn> }
      ]
    }
  ]);

  return (
    <div className="App">
      <ToastContainer/>
      <AuthProvider >
      <ProductProvider>
      <RouterProvider router={router} />
      </ProductProvider>
      </AuthProvider>
    </div>
  );
}
