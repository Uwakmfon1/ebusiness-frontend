import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/page'
import About from './pages/About/page'
import NotFound from './pages/NotFound/page'
import Details  from './pages/Details/page'

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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App