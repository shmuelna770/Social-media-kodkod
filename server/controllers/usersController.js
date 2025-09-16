import { getAllUsers, getUser, registerUser , loginUser} from "../services/usersService.js";

// קבלת כל המשתמשים
export async function getUsersController(req, res) {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

// קבלת משתמש לפי id
export async function getUserController(req, res) {
    const id = req.params.id;
    try {
        const user = await getUser(id);
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
}

// יצירת משתמש חדש
export async function createUserController(req, res) {
    const newUser = req.body;
    if (!newUser.userName || !newUser.password) {
        return res.status(400).json({ msg: "userName and password required" });
    }
    try {
        const success = await registerUser(newUser);
        if (!success) return res.status(400).json({ msg: "Failed to create user" });
        res.status(201).json({ msg: "User created" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
}


export async function loginUserController(req, res) {
    const { userName, password } = req.body;
    console.log(req.body);
    
    if (!userName || !password)

        return res.status(400).json({ msg: "Username and password required" });
    try {
        const result = await loginUser(userName, password);        
        if (!result.success) {
            if (result.reason === "user_not_found") {
                return res.status(404).json({ msg: "User not found" });
            }
            if (result.reason === "wrong_password") {
                return res.status(401).json({ msg: "Incorrect password" });
            }
        }
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000 // 1 יום
        });
        
        res.status(200).json({ msg: "Login successful", user: result });

    } catch (error) {
        res.status(500).json({ error: "Failed to login" });
    }
}


