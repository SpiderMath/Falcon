import Command from '../../typings/command';
import { default as axios } from 'axios'

const GraveCommand: Command = {
    name: 'grave',
    description: 'Grave yourself :)',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const user = message.mentions.users.first()?.displayAvatarURL() || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL() || message.author.displayAvatarURL()

        message.channel.send(`https://vacefron.nl/api/grave?user=${user}`)
    },
}

export default GraveCommand;