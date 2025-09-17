import { useState, useEffect } from "react";
import { Link } from "react-router";
import authMakeRequest from "../utils/authMakeRequest";
import logo from '../../public/logo.png';
import "../style/SearchPage.css";
type User = {
    id: number;
    created_at: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    profileImg: string;
};

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const allUsers: User[] = await authMakeRequest("/user", "GET");
                setUsers(allUsers);
                setFilteredUsers(allUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        if (query.trim() === "") {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(
                (user) =>
                    user.userName.toLowerCase().includes(query.toLowerCase()) ||
                    user.firstName.toLowerCase().includes(query.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [query, users]);

    return (
        <div className="search-page">
            <div className="search-page">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <ul className="user-list">
                    {filteredUsers.map((user) => (
                        <li key={user.id}>
                            <Link to={`/feed/profile-page/${user.id}`} className="user-link"
>
                                <img
                                    src={user.profileImg || logo}
                                    alt={user.userName}
                                    className="profile-img"
                                />
                                <div className="user-text">
                                    <span className="username">{user.userName}</span>
                                    <br />
                                    <span className="fullname">{user.firstName} {user.lastName}</span>
                                </div>
                            </Link>


                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}
