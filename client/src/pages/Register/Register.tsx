import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from 'src/action/auth';
import { PATH } from 'src/constants/paths';
import MainLayout from 'src/layouts/MainLayout';

export default function Home() {
    const dispatch = useDispatch();
    const [account, setAccount] = useState({
        email: '',
        username: '',
        password: '',
        password_confirm: '',
    });
    const updateAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccount((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(registerUser(account));
    };

    return (
        <MainLayout>
            <h1>Register</h1>
            <form>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={updateAccount}
                    value={account['email']}
                />
                <br />
                <br />
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={updateAccount}
                    value={account['username']}
                />
                <br />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={updateAccount}
                    value={account['password']}
                />
                <br />
                <br />
                <input
                    type="password"
                    name="password_confirm"
                    placeholder="confirm password"
                    onChange={updateAccount}
                    value={account['password_confirm']}
                />
                <br />
                <br />
                <button onClick={submit}>register</button>
            </form>
            <br />
            <br />
            <small>
                you have account? <Link to={PATH.LOGIN}>login</Link>
            </small>
        </MainLayout>
    );
}
