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
                    name="email"
                    placeholder="email"
                    onChange={updateAccount}
                    value={account['email']}
                />
                <br />
                <br />
                <input
                    name="username"
                    placeholder="username"
                    onChange={updateAccount}
                    value={account['username']}
                />
                <br />
                <br />
                <input
                    name="password"
                    placeholder="password"
                    onChange={updateAccount}
                    value={account['password']}
                />
                <br />
                <br />
                <button onClick={submit}>Login</button>
            </form>
            <br />
            <br />
            <small>
                you have account? <Link to={PATH.LOGIN}>Register</Link>
            </small>
        </MainLayout>
    );
}
