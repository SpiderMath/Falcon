import { RunFunction } from '../../interfaces/Command';

import NSFW from 'discord-nsfw'
import { TextChannel } from 'discord.js';
const nsfw = new NSFW();

export const name = 'solo'
export const category = 'nsfw'
export const description = 'NSFW Solo'

export const run: RunFunction = async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw) return message.channel.send("**You must be in a NSFW Channel to use these commands. 🔞**")
    message.channel.send(await nsfw.solo())
}