import React from "react";
import ReactDom from "react-dom";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core/";

import { Channel, User, Message } from "./slack-types";

let channels: Channel[];
let users: User[];
let logs: Map<Channel, Message[]>;
let counts: Map<User, Map<Channel, number>>;

async function loadSlackExports() {
    users = await fetchJson("/data/users.json");
    channels = await fetchJson("/data/channels.json");
    logs = new Map(await Promise.all(channels.map(c => fetchChannelLog(c))));
}

async function fetchJson(url) {
    let response = await fetch(url);
    return response.json();
}

async function fetchChannelLog(c: Channel) : Promise<[Channel, Message[]]>{
    const index: string[] = await fetchJson(`/data/${c.name}/index.json`);
    const allJson = await Promise.all(index.map<Promise<Message[]>>(name => fetchJson(`/data/${c.name}/${name}`)));
    return [c, allJson.reduce((arr, v) => arr.concat(v), [])];
}

function count() {
    counts = new Map();
    users.forEach(u => {
        const m = channels.map(c => [c, countMessagesOfUser(u, c)] as [Channel, number]);
        counts.set(u, new Map(m));
    });
}

function countMessagesOfUser(u: User, c: Channel) {
    return logs.get(c).filter(m => m.user === u.id).length;
}

const App = () =>
    <>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>name</TableCell>
                    <TableCell>氏名</TableCell>
                    {channels.map(c => (
                        <TableCell>{c.name}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map(u => (
                    <TableRow key={u.id}>
                        <TableCell>{u.name}</TableCell>
                        <TableCell>{u.real_name}</TableCell>
                        {channels.map(c => (
                            <TableCell>{counts.get(u).get(c)}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>;

loadSlackExports().then(() => {
    count();
    ReactDom.render(<App />, document.getElementById("root"));
});