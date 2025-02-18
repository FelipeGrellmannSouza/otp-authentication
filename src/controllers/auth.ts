import { RequestHandler } from "express";
import { authSignInSchema } from "../schemas/auth-signin";
import { getUserByEmail } from "../services/user";
import { genereteOTP } from "../services/otps";
import { sendEmail } from "../libs/mailtrap";

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