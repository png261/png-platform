import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Editor from 'rich-markdown-editor';
import { addPost } from 'src/action/post';
import MainLayout from 'src/layouts/MainLayout';

export default function Writting() {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('Your tittle is here');

    const onChange = (getContent) => {
        setContent(getContent());
    };
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const savePost = () => {
        const post = {
            title,
            content,
        };
        dispatch(addPost(post));
    };

    const pushish = (e) => {
        e.preventDefault();
        savePost();
    };
    const clear = () => {};

    return (
        <MainLayout>
            <div className="inline fr">
                <a href="" onClick={pushish}>
                    Pushish
                </a>
                <a href="" onClick={clear}>
                    Delete
                </a>
            </div>
            <h1 contentEditable onChange={onChangeTitle}>
                Your title is here
            </h1>
            <Editor autoFocus onChange={onChange} onSave={savePost} />
        </MainLayout>
    );
}
