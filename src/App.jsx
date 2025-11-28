import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Details from "./pages/Details";
import Login from "./pages/Login";
import RequireAuth from "./pages/RequireAuth";
import Dashboard from "./pages/Dashboard";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";

// import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<MainLayout />} >
//       <Route index element={<HomePage />} />
//       <Route path="/jobs" element={<JobsPage />} />
//       <Route path="/jobs/:id" element={<JobPage />} />
//       <Route path="/contact-us" element={<ContactUsPage />} />
//       <Route  path="*" element={<NotFoundPage />} />
//     </Route>
//   ));

// const App = () => {
//   return <RouterProvider router={router} />
// };

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Home />
                {/* <Dashboard /> */}
              </RequireAuth>
            }
          />
          <Route
            path="/checkout"
            element={<RequireAuth>{/* <Checkout /> */}</RequireAuth>}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
