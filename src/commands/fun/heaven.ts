import Command from '../../typings/command';
import { default as axios } from 'axios'

const HeavenCommand: Command = {
    name: 'heaven',
    description: 'Feel the Heaven',
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

        message.channel.send(`https://vacefron.nl/api/heaven?user=${user}`)
    },
}

export default HeavenCommand;