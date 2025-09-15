import bcrypt from "bcrypt";

export async function bcryptpassword(password) {
    const pass = await bcrypt.hash(password, 10);

    
    return pass;
}

export async function checkPass(pass1,paas2){
     const check = await bcrypt.compare(pass1,paas2)
     return check
}