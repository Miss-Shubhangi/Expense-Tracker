import ReactDom from "react-dom/client"
import {RouterProvider , createBrowserRouter} from 'react-router-dom'
import Home from "./Views/Home/Home"
import Signup from "./Views/SignUp/SignUp"
import Login from "./Views/Login/Login"
import AddTransaction from "./Views/AddTransaction/AddTransaction"
import PageNotFound from './Views/PageNotFound/PageNotFound'
import "./index.css"




const root =ReactDom.createRoot(document.getElementById("root"))

const router = createBrowserRouter([
    {
        path:"/" ,
        element:<Home/> 
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path:"/login" ,
        element: <Login/>
    },
    {
        path: '/add-transaction',
        element: <AddTransaction />
    },
    {
        path:'*',
        element:<PageNotFound/>

    }
])
root.render(<RouterProvider router={router}/>)