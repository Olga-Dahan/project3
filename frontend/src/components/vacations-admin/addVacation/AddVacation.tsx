import { Control, useForm, useWatch } from "react-hook-form";
import "./AddVacation.css";
import Vacation from "../../../models/Vacation_admin";
import vacationsService from "../../../services/Vacations_admin";
import { NavLink, useNavigate } from "react-router-dom";
import notify from "../../../services/Notify";
import { useEffect } from "react";
import { authStore } from "../../../redux/AuthState";
import { jwtDecode } from "jwt-decode";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState, control } = useForm<Vacation>();

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


    function ImageWatched({ control }: { control: Control<Vacation> }) {
        const imageSrc = useWatch({
            control,
            name: 'image',
        })
        if (imageSrc) {
            const file = ((imageSrc as unknown as FileList)[0])
            if (file) {
                const newSrc = window.URL.createObjectURL(file)
                return <img src={newSrc} />
            }
        }
        return <img src={""} />
    }

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

        unsubscribe();
    }, []);
    

    async function submitVacationData(vacation: Vacation) {
            try {
                vacation.image = (vacation.image as unknown as FileList)[0];
                const addedVacation = await vacationsService.addVacation(vacation);

                notify.success(`added a new vacation with id ${addedVacation.id}`);

                navigate('/vacations-admin');


            } catch (err) {
                notify.error(err);
            }
        }

    return (
        <div className="AddVacation">
            <h2>Add Vacation</h2>
            <form onSubmit={handleSubmit(submitVacationData)}>

                <label>destination</label>
                <input type="text" {...register('destination', {
                    required: {
                        value: true,
                        message: 'destination is a required field'
                    }
                })} />
                <span className="error">{formState.errors.destination?.message}</span>
                <br></br>
                <br></br>

                <label>description</label>
                <textarea  {...register('description', {
                    required: {
                        value: true,
                        message: 'description is a required field'
                    }
                })} />
                <span className="error">{formState.errors.description?.message}</span>
                <span className="error">{formState.errors.description?.message}</span>
                <br></br>
                <br></br>

                <label>start on</label>
                <input type="date" {...register('startDate', {
                    required: {
                        value: true,
                        message: 'start date is a required field'
                    }
                })} />
                <span className="error">{formState.errors.startDate?.message}</span>
                <br></br>
                <br></br>

                <label>end on</label>
                <input type="date" {...register('endDate', {
                    required: {
                        value: true,
                        message: 'end date is a required field'
                    }
                })} />
                <span className="error">{formState.errors.endDate?.message}</span>
                <br></br>
                <br></br>

                <label>price</label>
                <input type="number" placeholder="$" {...register('price', {
                    required: {
                        value: true,
                        message: 'price is a required field'
                    },
                    min: {
                        value: 0,
                        message: `Price can't be negative!`
                    },
                    max: {
                        value: 10000,
                        message: `Price can't be greater than 10000 $!`
                    }
                })} />
                <span className="error">{formState.errors.price?.message}</span>
                <br></br>
                <br></br>

                <label>cover image</label>
                <input type="file" accept="image/*" {...register('image')} />

                <ImageWatched control={control} />
                <button>Add</button>
                <NavLink to={`/vacations-admin`}><button>Cancel</button></NavLink>

            </form>
        </div>
    );
}

export default AddVacation;
