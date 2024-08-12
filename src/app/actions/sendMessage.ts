'use server'
import { LinkedIn, NetworkHelper } from "@anon/actions";
import { Client, executeRuntimeScript, setupAnonBrowserWithContext } from "@anon/sdk-typescript";
const client = new Client({
    environment: process.env.NEXT_PUBLIC_ANON_ENV as any,
    apiKey: process.env.ANON_API_KEY as any,
});

const account: any = {
    app: 'linkedin',
    userId: process.env.ANON_APP_USER_ID,
};

const NETWORK_TIMEOUT_MS = 5000
const networkHelper = new NetworkHelper(NETWORK_TIMEOUT_MS)
const action = LinkedIn.sendMessage(
    networkHelper,
    '伍松',
    `I'm testing Anon.com and automatically generated this post in < 5 minutes.
     Find out more about using Anon to automate your agent automations at Anon.com.`
);
export default async function SendMessageAction() {
    try {
        const { browserContext } = await setupAnonBrowserWithContext(
            client,
            account,
            { type: "local", input: { headless: true } },
        );

        const res = await executeRuntimeScript({
            client,
            account,
            target: { browserContext },
            initialUrl: "https://www.linkedin.com",
            cleanupOptions: { closePage: true, closeBrowserContext: true },
            run: action,
        });
        console.log({ res })
        return res;
    } catch (err) {
        console.log({ err })
        return err;
    }
}