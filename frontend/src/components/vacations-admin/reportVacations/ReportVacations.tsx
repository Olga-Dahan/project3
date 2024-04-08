import { NavLink, useNavigate } from "react-router-dom";
import Vacation from "../../../models/Vacation_admin";
import vacationsService from "../../../services/Vacations_admin";
import useTitle from "../../../utils/useTitle";
import "./ReportVacations.css";
import { useEffect, useState } from "react";
import notify from "../../../services/Notify";
import Spinner from "../../common/spinner/Spinner";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Rectangle } from "recharts";
import { authStore } from "../../../redux/AuthState";
import { jwtDecode } from "jwt-decode";

function ReportVacations(): JSX.Element {

    useTitle('Vacations Report');

    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [dataInCSV, setDataInCSV] = useState("");

    type User = {
        id: string,
        firstName: string,
        lastName: string,
        roleId: number
    };

    enum Roles {
        ADMIN = 1,
        USER = 2
    }

    const navigate = useNavigate();

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            const user_response = jwtDecode<{ user: User }>(token).user;
            if (user_response.roleId !== Roles.ADMIN) {
                notify.error('You are not admin!');
                navigate('/vacations');
                return
            }
        }
        else {
            notify.error('You are not logged in!');
            navigate('/login');
            return
        }


        const unsubscribe = authStore.subscribe(() => {
            console.log("unsubscribeAuth user")

            const token = authStore.getState().token;
            if (token) {
                const user_response = jwtDecode<{ user: User }>(token).user;
                if (user_response.roleId !== Roles.USER) {
                    notify.error('You are not admin!');
                    navigate('/vacations');
                }
            }
            else {
                notify.error('You are not logged in!');
                navigate('/login');
                return
            }
        });

        vacationsService.getVacationsFollowers()
            .then(vacationsFromServer => setVacations(vacationsFromServer))
            .catch(error => notify.error(error));

        vacationsService.sendCSV()
            .then(response => setDataInCSV(response))
            .catch(error => notify.error(error));

        unsubscribe();

    }, []);



    return (

        <div className="ReportVacations">
            <header>
                <a href={`data:text/csv;charset=utf-8,${escape(dataInCSV)}`} download="vacations.csv">
                    download "vacations-followers" report
                </a>
                <NavLink to='/vacations-admin'>back to vacations list</NavLink>
            </header>
            {vacations.length === 0 && <Spinner />}
            <h2>Vacations Report</h2>
            <BarChart width={1000} height={250} data={vacations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="destination" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="followers" fill="#4e64c2" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>

        </div>
    );
}

export default ReportVacations;
