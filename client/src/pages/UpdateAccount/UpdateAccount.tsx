import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'src/api/auth';
import MainLayout from 'src/layouts/MainLayout';

export default function UpdateAccount() {
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const [account, setAccount] = useState({
        newUsername: user.username,
        newPassword: '',
    });

    const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccount((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const action = await updateUser(account);
            dispatch(action);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainLayout>
            <h1>Account {user.email}</h1>
            <form>
                <input
                    name="email"
                    onChange={updateData}
                    value={user.email}
                    disabled={true}
                />
                <br />
                <br />
                <input
                    name="newUsername"
                    placeholder="email"
                    onChange={updateData}
                    value={account['newUsername']}
                />
                <br />
                <br />
                <input
                    name="newPassword"
                    placeholder="new password"
                    onChange={updateData}
                    value={account['newPassword']}
                />
                <br />
                <br />
                <button onClick={submit}>Update</button>
            </form>
        </MainLayout>
    );
}
