// services/usersService.js
import { getUsersData, getUserById, createUser ,getUserByUserName} from "../dal/usersDALl.js";
import { bcryptpassword, checkPass } from "../auth/bcrypt.js"
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
import jwt from "jsonwebtoken";



// משיכת כל המשתמשים
export async function getAllUsers() {
    return await getUsersData();
}

// משיכת משתמש לפי id
export async function getUser(id) {
    const user = await getUserById(id);
    return user || false;
}

// יצירת משתמש חדש 
export async function registerUser(newUser) {
    if (!newUser.userName || !newUser.password) return false;
    const hashedPassword = await bcryptpassword(newUser.password);
    newUser.password = hashedPassword;
    const created = await createUser(newUser);
    return created ? true : false;
}



// כניסת משתמש ויצירת טוקן
export async function loginUser(userName, password) {
    const user = await getUserByUserName(userName);
    if (!user) {
        return { success: false, reason: "user not found" };
    }
    const validPassword = await checkPass(password, user.password);
    if (!validPassword) {
        return { success: false, reason: "wrong password" };
    }
    const token = jwt.sign(
        { id: user.id, userName: user.userName },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return { success: true, user,token };
}


