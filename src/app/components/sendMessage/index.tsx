'use client'

import SendMessageAction from "@/app/actions/sendMessage"

export default function SendMessage() {
    const send = async () => {
        const res = await SendMessageAction();
        console.log(res)
    }
    return <div>
        <button onClick={send}>send default message</button>
    </div>
}