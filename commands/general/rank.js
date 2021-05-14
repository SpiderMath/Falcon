const Discord = require('discord.js')
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const canvacord = require("canvacord")
const GuildUser = require("../../models/GuildUser")

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'rank',
            aliases: [],
            group: 'general',
            memberName: 'rank',
            description: 'Check your xp and rank here',
            details: oneLine`
                Check your xp and rank here
            `,
            examples: ['!rank'],
        })
    }

    /**
     * @param {commando.CommandoMessage} message
    */
    async run(message) {
        try {
            const target = message.mentions.users.first() || message.author

            console.log(target)

            const username = target.username || message.author.username

            GuildUser.findOne({ where: { userID: target.id, guildID: message.guild.id } }).then((response) => {
                const rankCache = response.dataValues.rankCache

                const level = response.dataValues.level
                const requiredXP = 100 * level

                const RankCard = new canvacord.Rank()
                    .setUsername(username)
                    .setRank(1)
                    .setLevel(level)
                    .setCurrentXP(rankCache)
                    .setRequiredXP(requiredXP)
                    .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
                    .setProgressBar("#3683ff", "COLOR")
                    .setStatus(target.presence.status)
                    .setDiscriminator(target.discriminator);

                RankCard.build()
                    .then(data => {
                        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                        message.channel.send(attachment);
                    });
            })
        } catch (err) {
            console.error(err)
        }

    }
}