import Landing from "./components/Landing"
import Signcmp from "./components/Signcmp";
import Navbar1 from "./components/Navbar1"
import Logincmp from "./components/Logincmp"
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Navbar from "./components/Navbar";
import Workout from "./components/Workout";
import Diet from "./components/Diet";
import Dashboard from "./components/Dashboard";
import Merchandise from "./components/Merchandise";
import Footer from "./components/Footer";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar1 /><Landing /></>,
    },

    {
      path: "/login",
      element: <Logincmp />
    },

    {
      path: "/signup",
      element: <Signcmp />
    },

    {
      path: "/workoutplan",
      element: <><Navbar /><Workout /><Footer/></>
    },

    {
      path: "/dietplan",
      element: <><Navbar /><Diet /> <Footer/></>
    },

    {
      path: "/merchandise",
      element: <><Navbar /><Merchandise /><Footer/></>
    },

    {
      path: "/mydashboard",
      element: <><Navbar /><Dashboard /><Footer/></>
    },
  ]);


  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
