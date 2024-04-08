import { useForm } from "react-hook-form";
import "./Signup.css";
import SignupModel from "../../../models/SignupModel";
import notify from "../../../services/Notify";
import auth from "../../../services/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import { authStore } from "../../../redux/AuthState";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";


function Signup(): JSX.Element {

    type User = {
        firstName: string,
        lastName: string,
        roleId: number
    };

    enum Roles {
        ADMIN = 1,
        USER = 2
    }

    const { register, handleSubmit, formState } = useForm<SignupModel>();
    const navigate = useNavigate();

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            notify.error('You are already logged in! If you want to sign up with another email, please log out first.')
            const user = jwtDecode<{ user: User }>(token).user;
            if (user.roleId === Roles.USER)
                navigate('/vacations');
            if (user.roleId === Roles.ADMIN)
                navigate('/vacations-admin');
        }

        const unsubscribe = authStore.subscribe(() => {
            const token = authStore.getState().token;
            if (token) {
                const user = jwtDecode<{ user: User }>(token).user;
            } 
        });

        return unsubscribe;
    })
    
    async function submitUserData(signupModel: SignupModel): Promise<void> {
        try {
            await auth.signup(signupModel);
            notify.success('you have been successfully signed up');
            const token = authStore.getState().token;
            const user = jwtDecode<{ user: User }>(token).user;
            if (user.roleId === Roles.USER)
                navigate('/vacations');
            if (user.roleId === Roles.ADMIN)
                navigate('/vacations-admin');
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Signup">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit(submitUserData)}>

                <label>First name:</label>
                <input type="text" {...register('firstName', {
                    required: {
                        value: true,
                        message: 'firstName is a required field'
                    }
                })} />
                <span className="error">{formState.errors.firstName?.message}</span>
                <br></br>
                <br></br>

                <label>Last name:</label>
                <input type="text"  {...register('lastName', {
                    required: {
                        value: true,
                        message: 'lastName is a required field'
                    }
                })} />
                <span className="error">{formState.errors.lastName?.message}</span>
                <br></br>
                <br></br>

                <label>Email:</label>
                <input type="email" {...register('email', {
                    required: {
                        value: true,
                        message: 'email is a required field'
                    }
                })} />
                <span className="error">{formState.errors.email?.message}</span>
                <br></br>
                <br></br>

                <label>Password:</label>
                <input type="password" {...register('password', {
                    required: {
                        value: true,
                        message: 'password is a required field'
                    },
                    min: {
                        value: 4,
                        message: 'password must be a minimum of 4 letters'
                    }
                })} />
                <span className="error">{formState.errors.password?.message}</span>
                <br></br>
                <br></br>

                <button>Register</button>
            </form>
            <p>already a member?</p>
            <NavLink to="/login">login</NavLink>
        </div>
    );
}

export default Signup;
