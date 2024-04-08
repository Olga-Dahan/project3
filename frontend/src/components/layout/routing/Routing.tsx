import Login from "../../auth/login/Login";
import Signup from "../../auth/signup/Signup";
import Page404 from "../page404/Page404";
import { Routes, Route } from 'react-router-dom';
import VacationsListUser from "../../vacations-user/vacationsList/VacationsListUser";
import ReportVacations from "../../vacations-admin/reportVacations/ReportVacations";
import AddVacation from "../../vacations-admin/addVacation/AddVacation";
import EditVacation from "../../vacations-admin/editVacation/EditVacation";
import Vacations from "../../vacations-admin/vacationsAdmin/Vacations";
import AuthMenu from "../../auth/authMenu/AuthMenu";

function Routing(): JSX.Element {
    return (
        <Routes>

            <Route path="/" element={<AuthMenu />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path="/vacations" element={<VacationsListUser />} />

            <Route path="/vacations-admin" element={<Vacations />} />
            <Route path="/vacations-admin/add" element={<AddVacation />} />
            <Route path="/vacations-admin/edit/:vacationId" element={<EditVacation />} />
            <Route path="/vacations-report" element={<ReportVacations />} />


            <Route path="*" element={<Page404 />} />

        </Routes>

    );
}

export default Routing;
