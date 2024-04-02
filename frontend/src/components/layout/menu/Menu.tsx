import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useEffect, useState } from "react";
import { authStore } from "../../../redux/AuthState";

function Menu(): JSX.Element {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setIsUserLoggedIn(authStore.getState().token !== '');
        const unsubscribe = authStore.subscribe(() => {
            setIsUserLoggedIn(authStore.getState().token !== '');
        })

        return unsubscribe;
    }, []);

    return (
        <div className="Menu">
            {/* <NavLink to="/home">Home</NavLink> */}
            {/* <NavLink to="/products">Products</NavLink> */}
            {/* {isUserLoggedIn && <NavLink to="/vacations">Vacations</NavLink>} */}
            {/* {isUserLoggedIn && isAdmin && <NavLink to="/vacations-admin">Vacations</NavLink>} */}

        </div>
    );
}

export default Menu;
