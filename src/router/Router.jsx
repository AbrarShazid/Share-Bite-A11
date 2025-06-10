import { createBrowserRouter } from "react-router";
import Error from "../pages/Error"
import HomeLayOut from "../Layout/HomeLayOut";
import Home from "../pages/Home"
import AvailableFood from "../pages/AvailableFood";
import AddFood from "../pages/AddFood";
import ManageMyFood from "../pages/ManageMyFood";
import MyFoodReq from "../pages/MyFoodReq";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import PrivateRoute from "../provider/PrivateRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayOut></HomeLayOut>,
    children:[
          {
            index:true,
            Component:Home
          }
          ,
          {
            path:"/available-food",
            Component:AvailableFood
          },



          {
            path:"/add-food",

            element:<PrivateRoute>
              <AddFood></AddFood>
            </PrivateRoute>
          
          },
          {
            path:"/manage-my-food",
              element:<PrivateRoute>
             <ManageMyFood></ManageMyFood>
            </PrivateRoute>
          },
          {
            path:"/food-request",
             element:<PrivateRoute>
             <MyFoodReq></MyFoodReq>
            </PrivateRoute>
          },
          {
            path:"/login",
            Component:LogIn
          },
          {
            path:"/register",
            Component:Register
          },
          



    ]
  },
 
  {
    path: "*",
    element:<Error></Error>
  },
]);

export default router;