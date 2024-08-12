'use client'

import AnonLink from "@anon/sdk-web-link-typescript";
import { useState } from "react";
import SendMessage from "./components/sendMessage";
import login from "./actions/login";

export default function Home() {
  const [sessionStatus, setSessionStatus] = useState('');
  const [loading, setLoading] = useState(false)
  const onSuccess = () => {
    login().then((res: any) => {
      setSessionStatus(res.status)
    }).finally(() => {
      setLoading(false)
    });
  };
  const onExit = (error: any) => {
    anonLinkInstance.destroy();
  };

  const config = {
    app: "linkedin",
    environment: (process.env.NEXT_PUBLIC_ANON_ENV as any) || "sandbox",
    clientId: process.env.NEXT_PUBLIC_ANON_SDKCLIENT_ID!,
    appUserIdToken: process.env.NEXT_PUBLIC_ANON_APP_USER_ID_TOKEN!,
    company: process.env.NEXT_PUBLIC_ANON_COMPANY_NAME!,
    companyLogo: process.env.NEXT_PUBLIC_ANON_COMPANY_LOGO!,
    chromeExtensionId: process.env.NEXT_PUBLIC_ANON_CHROME_EXTENSION_ID!,
  };

  const anonLinkInstance = AnonLink.init({
    config,
    onSuccess, // Callback function to handle success events.
    onExit, // Callback function to handle exit or failure events.
  });

  const open = () => {
    anonLinkInstance.open();
    setLoading(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        sessionStatus === 'active' ? <div>
          <div>Linked In Logined</div>
          <SendMessage />
        </div> : <button onClick={open}>Login Linked In</button>
      }
    </main>
  );
}
