import { z } from "zod";

export const authSignInSchema = z.object({
    email: z.string({ message: 'Campo e-mail é obrigatório' }).email('E-mail invalido')
});     
