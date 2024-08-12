'use server'
import { Client } from "@anon/sdk-typescript";
const client = new Client({
    environment: process.env.NEXT_PUBLIC_ANON_ENV as any,
    apiKey: process.env.ANON_API_KEY as any,
});

type AccountInfo = { ownerId: string, domain: string }
const accountInfo: AccountInfo = {
    ownerId: process.env.ANON_APP_USER_ID as string,
    domain: "linkedin"
};
export default async function login() {
    try {
        const getSessionInput = {
            account: accountInfo,
        };
        const status = await client.getSessionStatus(getSessionInput)
        return status;
    } catch (err) {
        return err;
    }
}