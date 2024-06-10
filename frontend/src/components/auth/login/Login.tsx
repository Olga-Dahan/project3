import { NavLink, useNavigate } from "react-router-dom";
import LoginModel from "../../../models/LoginModel";
import notify from "../../../services/Notify";
import "./Login.css";
import { useForm } from "react-hook-form";
import auth from "../../../services/Auth";
import { useEffect } from "react";
import { authStore } from "../../../redux/AuthState";
import { jwtDecode } from "jwt-decode";

function Login(): JSX.Element {

    type User = {
        firstName: string,
        lastName: string,
        roleId: number
    };

    enum Roles {
        ADMIN = 1,
        USER = 2
    }

    const { register, handleSubmit, formState } = useForm<LoginModel>();
    const navigate = useNavigate();

    async function submitLoginData(loginModel: LoginModel): Promise<void> {
        try {
            await auth.login(loginModel);
            notify.success('you have been successfully logged in');
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

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            notify.error('You are already logged in, please don\'t login again')
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
                // setUser(user);
            } else {
                // setUser(undefined)
            }
        });

        return unsubscribe;
    })

    return (
        <div className="Login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(submitLoginData)}>
                <label>email</label>
                <input type="email" {...register('email', {
                    required: {
                        value: true,
                        message: 'email is a required field'
                    }
                })} />
                <span className="error">{formState.errors.email?.message}</span>
                <br></br>
                <br></br>

                <label>password</label>
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

                <button>Login</button>
            </form>
            <p>don't have account?</p>
            <NavLink to="/signup">register now</NavLink>
        </div>
    );
}

export default Login;
