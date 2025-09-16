import { useEffect, useState, type FormEvent } from "react";
import makeRequest from "../utils/makeRequest";

const AddNewPost = () => {
    const [userId, setUserId] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>('');
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        const id = localStorage.getItem("id")
        if (id) setUserId(id)
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = {
            imageUrl,
            description
        }

        try {
            console.log(userId)
            setLoading(true)
            const res = await makeRequest(`/posts/${userId}`, 'POST', body)
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
                        required
                        type="text"
                        onChange={(e) => setImageUrl(e.target.value)}
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
