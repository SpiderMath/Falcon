import Event from "../constants/event";
import consola from 'consola'
import { Sync } from '../database/sync'
require("dotenv").config();
import MuteUser from '../models/MuteUser'

const ReadyEvent: Event = {
    name: "ready",
    async run(client) {
        try {
            Sync()
            consola.info("Connected to Database")
        } catch (err) {
            consola.error("Error Connecting to the database. Log the error to find it out")
        }

        client.logger.info("client", `[READY] Logged in as ${client.user?.tag}`);

        const Activities = [
            `Serving ${client.prefix}help`,
            `In ${client.guilds.cache.size} Servers!`,
            `Serving ${client.users.cache.size} users!`,
        ]

        client.user?.setStatus("idle")
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * (Activities.length - 1) + 1);
            const newActivity = Activities[randomIndex];

            client.user?.setActivity(newActivity, { type: "WATCHING" });
        }, 10000);

        client.guilds.cache.map((ev) => {
            ev.members.cache.map((member) => {
                // @ts-ignore
                if (member.roles.cache.has(ev?.roles.cache.find(r => r.name.toLowerCase() === 'muted')?.id)) {
                    // @ts-ignore
                    MuteUser.findOne({ where: { userID: member.id, guildID: member.guild.id } }).then((response, error) => {

                    })
                    // @ts-ignore
                    ev.channels.cache.get("827571278063599617")?.send(`**${member.displayName} is currently Muted**`)
                }
            })
        })
    },
};

export default ReadyEvent;
