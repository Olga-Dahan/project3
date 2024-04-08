import { NavLink, useNavigate } from "react-router-dom";
import useTitle from "../../../utils/useTitle";
import "./Vacations.css";
import { useEffect, useState } from "react";
import notify from "../../../services/Notify";
import { authStore } from "../../../redux/AuthState";
import { jwtDecode } from "jwt-decode";
import auth from "../../../services/Auth";
import VacationsList from "../vacationsList/VacationsList";

function Vacations(): JSX.Element {

    useTitle('Vacations');

    const navigate = useNavigate();

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

    const [user, setUser] = useState<User>({ id: "", firstName: "", lastName: "", roleId: Roles.USER });

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            const user = jwtDecode<{ user: User }>(token).user;
            if (user.roleId === Roles.ADMIN)
                setUser(user);
            else {
                notify.error('You are not admin!');
                navigate('/vacations');
                return
            }
        }
        else {
            setUser({ id: "", firstName: "", lastName: "", roleId: Roles.USER })
            notify.error('You are not logged in!');
            auth.logout();
            navigate('/login');
            return
        }

        const unsubscribe = authStore.subscribe(() => {
            console.log("unsubscribe Vacations")
            const token = authStore.getState().token;
            if (token) {
                const user = jwtDecode<{ user: User }>(token).user;
                setUser(user);
            } else {
                setUser({ id: "", firstName: "", lastName: "", roleId: Roles.USER })
            }
        });

        return unsubscribe

    }, []);

    function logout() {
        auth.logout();
        notify.success('logged out successfully');
        navigate('/login');

    }

    return (

        <div className="Vacations">
            <header>
                <aside>
                    {user && <span>Hello {user!.firstName} {user!.lastName} | </span>}
                    <NavLink to="/" onClick={logout}>Logout</NavLink>
                </aside>
                <section>
                    <NavLink to={`/vacations-admin/add`}>add vacation</NavLink>
                    <NavLink to={`/vacations-report`}>reports of vacations and followers</NavLink>
                </section>
            </header>
            <main>
                <VacationsList />
            </main>
        </div>
    );
}

export default Vacations;
