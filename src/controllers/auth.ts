import { RequestHandler } from "express";
import { authSignInSchema } from "../schemas/auth-signin";
import { createUser, getUserByEmail } from "../services/user";
import { genereteOTP, validateOTP } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";
import { authSignUpSchema } from "../schemas/auth-signup";
import { authUseOTPSchema } from "../schemas/auth-useOTP";
import { createJWT } from "../libs/jwt";

export const signin: RequestHandler = async (req, res) => {
    //validar o dado recebido 
    const data = authSignInSchema.safeParse(req.body);
    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }
    //verificar se o usuario existe
    const user = await getUserByEmail(data.data.email);
    if (!user) {
        res.json({ error: 'Usuário não existe' });
        return;
    }
    //gerar um código OTP para o usuario 
    const otp = await genereteOTP(user.id);
    //enviar um email para o usuario
    await sendEmail(
        user.email,
        'seu código de acesso é:' + otp.code,
        'Digite seu código: ' + otp.code
    );
    //devolve o id do código OTP 
    res.json({ otpid: otp.id });
};

export const signup: RequestHandler = async (req, res) => {
    //validar dados recebidos 
    const data = authSignUpSchema.safeParse(req.body);
    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }
    //verifica se o email já existe 
    const user = await getUserByEmail(data.data.email);
    if (user) {
        res.json({ error: 'Usuário já existe' });
        return
    }
    //criar usuário 
    const newUser = await createUser(data.data.name, data.data.email);

    //retornar os dados do usuário récem-criado 
    res.status(201).json({ user: newUser });

}

export const useOTP: RequestHandler = async (req, res) => {
    // validar os dados recebidos otp e id do otp
    const data = authUseOTPSchema.safeParse(req.body);
    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }
    // validar o OTP
    const user = await validateOTP(data.data.id, data.data.code);
    if (!user) {
        res.json({ error: "OTP inválido ou expirado" });
        return
    }
    // criar o JWT
    const token = createJWT(user.id);
    // usar o JWT
    res.json({ token, user })

}