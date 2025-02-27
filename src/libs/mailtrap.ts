import { MailtrapClient } from "mailtrap"

export const sendEmail = async (to: string, subject: string, body: string) => {
    const mailtrap = new MailtrapClient({
        accountId: Number(process.env.MAILTRAP_ACCOUNT_ID),
        token: process.env.MAILTRAP_TOKEN as string,
        testInboxId: 3463326,
    });

    try {
        await mailtrap.testing.send({
            from: { name: 'Sistema', email: 'Sistema@email.com' },
            to: [{ email: to }],
            subject,
            text: body
        });
    } catch (err) {
        return false;
    }
}