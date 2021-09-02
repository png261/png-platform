import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'src/api/auth';
import MainLayout from 'src/layouts/MainLayout';

export default function Account() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    return (
        <MainLayout>
            <h1>user: {user.username}</h1>
            <q>be your self</q>
            <br />
            <br />
            <p>Joined: {user.createdAt}</p>
            <p>total posts: 200</p>
            <h2>user's posts:</h2>
        </MainLayout>
    );
}
