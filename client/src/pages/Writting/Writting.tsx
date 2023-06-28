import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from 'rich-markdown-editor';
import { addPost } from 'src/action/post';
import MainLayout from 'src/layouts/MainLayout';

export default function Writting() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const history = useHistory();

    const onChange = (getContent) => {
        setContent(getContent());
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const savePost = async () => {
        if (title == null) {
            alert("title can't be empty");
            return false;
        }
        if (content == null) {
            alert("content can't be empty");
            return false;
        }

        const data = await addPost({ title, content });
        if (data.success) {
            alert('done! post has been published');
            return true;
        } else {
            alert(data.message);
            return false;
        }
    };

    const publish = async (e) => {
        e.preventDefault();
        (await savePost()) && history.push('/');
    };

    return (
        <MainLayout>
            <div className="inline fr">
                <a href="#" onClick={publish}>
                    Publish
                </a>
                <a href="/">Cancel</a>
            </div>
            <input onChange={onChangeTitle} placeholder="Your title" />
            <Editor autoFocus onChange={onChange} onSave={savePost} />
        </MainLayout>
    );
}
