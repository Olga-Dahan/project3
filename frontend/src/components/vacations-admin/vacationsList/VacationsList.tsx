import Vacation from "../../../models/Vacation_admin";
import { useNavigate } from "react-router-dom";
import auth from "../../../services/Auth";
import vacationsService from "../../../services/Vacations_admin";
import useTitle from "../../../utils/useTitle";
import VacationCard from "../vacationCard/VacationCard";
import "./VacationsList.css";
import { useEffect, useState } from "react";
import notify from "../../../services/Notify";
import Spinner from "../../common/spinner/Spinner";
import { vacationsStore } from "../../../redux/VacationsState";
import appConfig from "../../../utils/AppConfig";
import Pagination from '@mui/material/Pagination';

function VacationsList(): JSX.Element {

    useTitle('Vacations');
    const navigate = useNavigate();


    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);


    useEffect(() => {

        const offset = (page - 1) * appConfig.limit_pages;

        vacationsService.getAll()
            .then(vacationsFromServer => {
                setVacations(vacationsFromServer.slice(offset, offset + appConfig.limit_pages));
                setPageCount(Math.ceil(vacationsFromServer.length / appConfig.limit_pages));
            })
            .catch(error => {
                if (error.response.data === "jwt expired") {
                    notify.error('Log in again!');
                    auth.logout();
                    navigate('/login');
                    return
                }
                else
                    notify.error(error)
            });


        const unsubscribe = vacationsStore.subscribe(() => {
            setVacations([...vacationsStore.getState().vacations])
        })

        return unsubscribe;

    }, []);

    async function deleteCard(vacationId: number) {
        if (!vacationId) return;
        if (window.confirm('Are you sure you want to delete this vacation?')) {
            try {
                await vacationsService.deleteVacation(vacationId);
                notify.success('this vacation has been deleted');
                setPage(1);
                const vacations = await vacationsService.getAll();
                setVacations(vacations.slice(0, appConfig.limit_pages));
                setPageCount(Math.ceil(vacations.length / appConfig.limit_pages));

            } catch (err) {
                notify.error(err)
            }
        }
    }


    const handleChange = async (event: any, value: number) => {
        setPage(value);

        const vacations = await vacationsService.getAll();
        const offset = (value - 1) * appConfig.limit_pages;

        setVacations(vacations.slice(offset, offset + appConfig.limit_pages));
    };


    return (

        <div className="VacationsList">
            <main>
                {vacations.length === 0 && <Spinner />}
                {vacations.map(v => <VacationCard key={v.id} vacation={v} deleteFunction={deleteCard} />)}
            </main>
            <footer>
                <Pagination count={pageCount} page={page} defaultPage={1} variant="outlined" color="primary" size="large" onChange={handleChange} />
            </footer>
        </div>
    );
}

export default VacationsList;
