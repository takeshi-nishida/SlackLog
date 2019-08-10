export interface Channel {
    id: string;
    name: string;
    created: string;
}

export interface User {
    id: string;
    name: string;
    real_name: string;
    profile: {
        display_name: string;
        email: string;
    }
    is_bot: boolean;
}

export interface Message {
    user: string;
    type: "message";
    subtype?: "channel_join";
    ts: string;
    text: string;
}

export function tsToDate(ts: string) {
    return new Date(parseFloat(ts) * 1000);
}