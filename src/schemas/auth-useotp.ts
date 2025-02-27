import { z } from "zod";

export const authUseOTPSchema = z.object({
    id: z.string({ message: "ID do otp obrigatório" }),
    code: z.string({ message: 'OTP obrigatório' }).length(6, 'código precisa de 6 numeros')
});