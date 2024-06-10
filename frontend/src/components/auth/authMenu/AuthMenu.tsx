import { useEffect } from "react";
import "./AuthMenu.css";
import { authStore } from "../../../redux/AuthState";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AuthMenu(): JSX.Element {

    type User = {
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
            const user = jwtDecode<{ user: User }>(token).user;
            if (user.roleId === Roles.USER)
                navigate('/vacations');
            if (user.roleId === Roles.ADMIN)
                navigate('/vacations-admin');
        }
        if (!token) {
            navigate('/login');
        }

        const unsubscribe = authStore.subscribe(() => {
            const token = authStore.getState().token;
            if (token) {
                const user = jwtDecode<{ user: User }>(token).user;
            } else {
                // setUser(undefined)
            }
        });

        return unsubscribe;
    }, [])



    return (
        <div className="AuthMenu">

        </div>
    );
}

export default AuthMenu;
