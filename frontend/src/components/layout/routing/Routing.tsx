import Login from "../../auth/login/Login";
import About from "../../about/about/About";
import Signup from "../../auth/signup/Signup";
import Home from "../../home/home/Home";
import AddProduct from "../../products/addProduct/AddProduct";
import EditProduct from "../../products/editProduct/EditProduct";
import ProductDetails from "../../products/productDetails/ProductDetails";
import Products from "../../products/products/Products";
import Page404 from "../page404/Page404";
import { Routes, Route, Navigate } from 'react-router-dom';
import CategoriesList from "../../categories/list/CategoriesList";
import Details from "../../categories/details/Details";
function Routing(): JSX.Element {
    return (
        <Routes>

            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Navigate to="/" />} />


            <Route path="/vacations" element={<Vacations />} />

            <Route path="/vacations-admin" element={<VacationsAdmin />} />
            <Route path="/vacations-admin/new" element={<AddVacation />} />
            <Route path="/vacations-admin/edit/:vacationId" element={<EditVacation />} />
            <Route path="/vacations-report" element={<ReportVacation />} />


            <Route path="*" element={<Page404 />} />

        </Routes>

    );
}

export default Routing;
