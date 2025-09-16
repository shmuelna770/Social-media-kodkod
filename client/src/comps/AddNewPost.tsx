import { useEffect, useState, type FormEvent } from "react";
import makeRequest from "../utils/makeRequest";

const AddNewPost = () => {
    const [userId, setUserId] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [file, setFile] = useState<File | undefined>();
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)

    function handleOnChange(e: FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement & {
            files: FileList
        }
        setFile(target.files[0])
    }

    useEffect(() => {
        const id = localStorage.getItem("id")
        if (id) setUserId(id)
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) return;
        const formData = new FormData();
        formData.set('file', file)
        formData.set('description', description)

        try {
            console.log(userId)
            setLoading(true)
            const res = await makeRequest(`/posts/${userId}`, 'POST', formData, true)
            setLoading(false)
            setMessage(res)
        } catch (err: any) {
            setMessage(err.message)
        };
    }

    return (
        <>
            <h1>Add New Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        required
                        placeholder="description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <label htmlFor="file">
                    Image
                    <input
                        id="file"
                        accept="image/*"
                        required
                        type="file"
                        onChange={handleOnChange}
                    />
                </label>

                <button type="submit">add new post</button>
                {loading && <p className="loading">Loading...</p>}
                {message && !loading && <p className="failed">{message}</p>}
            </form>
        </>
    );
};

export default AddNewPost;
