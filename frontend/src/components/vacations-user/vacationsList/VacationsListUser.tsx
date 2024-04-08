import { NavLink, useNavigate } from "react-router-dom";
import Vacation from "../../../models/Vacation";
import vacationsService from "../../../services/Vacations_user";
import useTitle from "../../../utils/useTitle";
import VacationCardUser from "../vacationCard/VacationCardUser";
import "./VacationsListUser.css";
import { useEffect, useState } from "react";
import notify from "../../../services/Notify";
import Spinner from "../../common/spinner/Spinner";
import appConfig from "../../../utils/AppConfig";
import Pagination from '@mui/material/Pagination';
import { jwtDecode } from "jwt-decode";
import { authStore } from "../../../redux/AuthState";
import auth from "../../../services/Auth";

function VacationsListUser(): JSX.Element {

    useTitle('Vacations');

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

    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);
    const [checked1, setChecked1] = useState<boolean>(false);
    const [checked2, setChecked2] = useState<boolean>(false);
    const [checked3, setChecked3] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");


    const navigate = useNavigate();

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            const user_response = jwtDecode<{ user: User }>(token).user;
            if (user_response.roleId === Roles.USER) {
                setUser(user_response);
            }
            else {
                notify.error('You are not user!');
                navigate('/vacations-admin');
                return
            }

        }
        else {
            setUser({ id: "", firstName: "", lastName: "", roleId: Roles.USER })
            auth.logout();
            notify.error('You are not logged in!');

            navigate('/login');
            return
        }


        const unsubscribe = authStore.subscribe(() => {
            console.log("unsubscribeAuth user")

            const token = authStore.getState().token;
            if (token) {
                const user = jwtDecode<{ user: User }>(token).user;
                setUser(user);

            } else {
                setUser({ id: "", firstName: "", lastName: "", roleId: Roles.USER })
            }
        });

        const user_response = jwtDecode<{ user: User }>(token).user;
        const offset = (page - 1) * appConfig.limit_pages;


        vacationsService.getAll(user_response!.id, checked1, checked2, checked3)
            .then(vacationsFromServer => {
                setVacations(vacationsFromServer.slice(offset, offset + appConfig.limit_pages));
                setPageCount(Math.ceil(vacationsFromServer.length / appConfig.limit_pages));
            })
            .catch(error => notify.error(error));

        unsubscribe()

    }, []);

    function logout() {
        auth.logout();
        notify.success('logged out successfully');
        navigate('/login');

    }

    async function followUnfollowVacation(vacationId: number) {
        try {
            await vacationsService.followUnfollow(user!.id, vacationId);
            let offset = (page - 1) * appConfig.limit_pages;
            const vacations = await vacationsService.getAll(user!.id, checked1, checked2, checked3);
            if (vacations.length === 0) {
                setMessage("There are no such vacations!");
                setPageCount(0); 
                setVacations([]);
                return;
            }
            if (page > Math.ceil(vacations.length / appConfig.limit_pages)) {
                setPage(page-1); 
                offset = ((page-1) - 1) * appConfig.limit_pages;
            }
            setPageCount(Math.ceil(vacations.length / appConfig.limit_pages));
            setVacations(vacations.slice(offset, offset + appConfig.limit_pages));

        } catch (err) {
            notify.error(err)
        }
    }



    const paginationChange = async (event: any, value: number) => {
        setPage(value);

        const vacations = await vacationsService.getAll(user!.id, checked1, checked2, checked3);
        const offset = (value - 1) * appConfig.limit_pages;

        setVacations(vacations.slice(offset, offset + appConfig.limit_pages));
    };

    const isFollowing = async () => {
        setMessage("");
        setChecked1(!checked1);
        setPage(1);
        const offset = (1 - 1) * appConfig.limit_pages;
        const vacations = await vacationsService.getAll(user!.id, !checked1, checked2, checked3);
        if (vacations.length === 0) {
            setMessage("There are no such vacations!");
            setPageCount(0); 
            setVacations([])
        }
        setPageCount(Math.ceil(vacations.length / appConfig.limit_pages));
        setVacations(vacations.slice(offset, offset + appConfig.limit_pages));
    };

    const didntStart = async () => {
        setMessage("");
        setChecked2(!checked2);
        setPage(1);
        const offset = (1 - 1) * appConfig.limit_pages;
        const vacations = await vacationsService.getAll(user!.id, checked1, !checked2, checked3);
        if (vacations.length === 0) {
            setMessage("There are no such vacations!");
            setPageCount(0); 
            setVacations([])
        }
        setPageCount(Math.ceil(vacations.length / appConfig.limit_pages));
        setVacations(vacations.slice(offset, offset + appConfig.limit_pages));
    };

    const onGoing = async () => {
        setMessage("");
        setChecked3(!checked3);
        setPage(1);
        const offset = (1 - 1) * appConfig.limit_pages;
        const vacations = await vacationsService.getAll(user!.id, checked1, checked2, !checked3);
        if (vacations.length === 0) {
            setMessage("There are no such vacations!");
            setPageCount(0); 
            setVacations([])
        }
        setPageCount(Math.ceil(vacations.length / appConfig.limit_pages));
        setVacations(vacations.slice(offset, offset + appConfig.limit_pages));
    };


    return (

        <div className="VacationsListUser">
            <header>
                {user && <span>Hello {user!.firstName} {user!.lastName} | </span>}
                <NavLink to="/" onClick={logout}>Logout</NavLink>
            </header>
            <main>
                <label>
                    <input type="checkbox" checked={checked1} onChange={isFollowing} />
                    Show vacations you are following
                </label>
                <br></br>

                <label>
                    <input type="checkbox" checked={checked2} onChange={didntStart} />
                    Show vacations that haven't started yet
                </label>
                <br></br>

                <label>
                    <input type="checkbox" checked={checked3} onChange={onGoing} />
                    Show ongoing vacations
                </label>
                <br></br>

                {vacations.length === 0 && <Spinner />}
                <span style={{ color: "red" }} >{message}</span>
                {vacations.map(v => <VacationCardUser key={v.id} vacation={v} followUnfollowFunction={followUnfollowVacation} />)}
            </main>
            <footer>
                <Pagination count={pageCount} page={page} defaultPage={1} variant="outlined" color="primary" size="large" onChange={paginationChange} />
            </footer>
        </div>
    );
}

export default VacationsListUser;
