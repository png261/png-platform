import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from 'src/action/auth';
import { PATH } from 'src/constants/paths';
import MainLayout from 'src/layouts/MainLayout';
import { Link } from 'react-router-dom';

export default function Home() {
    const dispatch = useDispatch();
    const [account, setAccount] = useState({ email: '', password: '' });
    const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccount((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(loginUser(account));
    };

    return (
        <MainLayout>
            <h1>Login</h1>
            <form>
                <input
                    name="email"
                    placeholder="email"
                    onChange={updateFormData}
                    value={account['email']}
                />
                <br />
                <br />
                <input
                    name="password"
                    placeholder="password"
                    onChange={updateFormData}
                    value={account['password']}
                />
                <br />
                <br />
                <button onClick={submit}>Login</button>
            </form>
            <br />
            <br />
            <small>
                you haven't account? <Link to={PATH.REGISTER}>Register</Link>
            </small>
        </MainLayout>
    );
}
